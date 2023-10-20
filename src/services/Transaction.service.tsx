import axios, { AxiosResponse } from "axios";
import { environment } from "../environments/environment";
import { TransactionHistory } from "../interfaces/TransactionHistory.interface";

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
}