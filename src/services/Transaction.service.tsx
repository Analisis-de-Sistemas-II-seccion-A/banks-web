import axios, { AxiosResponse } from "axios";
import { environment } from "../environments/environment";
import { TransactionHistory } from "../interfaces/TransactionHistory.interface";
import { Transaction } from "../interfaces/Transaction.interface";

export default class TransactionService {
    static async getTransactionHistoryByDate(account: number, initDate: string, endDate: string): Promise<TransactionHistory[]> {
        return await axios
        .get<TransactionHistory[]>(`${environment.apiUri}/transaction-history/${account}/${initDate}/${endDate}`)
        .then((response: AxiosResponse<TransactionHistory[]>) => {
            return response.data;
        })
        .catch((error: any) => {
            throw new Error(`Error al obtener la lista de transacctions: ${error.message}`);
        });
    }

    static async getTransactionHistorySearch(account: number| null, bank: number | null, initDate: string | null | undefined, endDate: string| null | undefined): Promise<TransactionHistory[]> {
        const url = `${environment.apiUri}/transaction-history/search?${account ? `account=${account}` : ''}${bank ? `&bank=${bank}` : ''}${initDate ? `&initDate=${initDate}` : ''}${endDate ? `&endDate=${endDate}` : ''}`;
        return await axios
        .get<TransactionHistory[]>(url)
        .then((response: AxiosResponse<TransactionHistory[]>) => {
            return response.data;
        })
        .catch((error: any) => {
            throw new Error(`Error al obtener la lista de transacctions: ${error.message}`);
        });
    }

    static async getLastestTransations(accounts: number []): Promise<TransactionHistory[]> {
        return await axios
        .post<TransactionHistory[]>(`${environment.apiUri}/transaction-history/accounts`, accounts)
        .then((response: AxiosResponse<TransactionHistory[]>) => {
            return response.data;
        })
        .catch((error: any) => {
            throw new Error(`Error al obtener la lista de transacciones: ${error.message}`);
        });
    }

    static async insertTransaction(transaction: Transaction): Promise<Transaction> {
        return await axios
            .post<Transaction>(`${environment.apiUri}/transaction`, transaction)
            .then((response: AxiosResponse<Transaction>) => {
                return response.data;
            })
            .catch((error: any) => {
                throw new Error(`Error al insertar la transacción: ${error.message}`);
            });
    }
}