import axios, { AxiosResponse } from "axios";
import { Bank } from "../interfaces/Bank.interface";
import { environment } from "../environments/environment";
import { Account } from "../interfaces/Account.interface";

const callbacks: ((bank: Bank | null) => void)[] = [];

export default class BankService {
    static selectedBank(): Bank {
        return JSON.parse(localStorage.getItem("selectedBank") as string);
    }

    static async selectBank(bank: Bank) {
        localStorage.setItem("selectedBank", JSON.stringify(bank));
        callbacks.forEach((callback) => callback(JSON.parse(localStorage.getItem("selectedBank") || '') as Bank));
    }

    static async getBanks(): Promise<Bank[]> {
        return await axios
        .get<Bank[]>(`${environment.apiUri}/banks`)
        .then((response: AxiosResponse<Bank[]>) => {
          return response.data;
        })
        .catch((error: any) => {
          throw new Error(`Error al obtener la lista de bancos: ${error.message}`);
        });
    }
    
    static async getAccounts(bank: number): Promise<Account[]> {
        return axios
        .get<Account[]>(`${environment.apiUri}/banks/${bank}/accounts`)
        .then((response: AxiosResponse<Account[]>) => {
          return response.data;
        })
        .catch((error: any) => {
          throw new Error(`Error al obtener la lista de cuentas: ${error.message}`);
        });
    }
}

export const subscribeToSelectedBank = (callback: (bank: Bank | null) => void) => {
    callbacks.push(callback);

    return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1) {
            callbacks.splice(index, 1);
        }
    };
};