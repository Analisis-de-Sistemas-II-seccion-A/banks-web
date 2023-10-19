import axios, { AxiosResponse } from "axios";
import { environment } from "../environments/environment";
import { TransactionHistory } from "../interfaces/TransactionHistory.interface";

export default class TransactionService {
    static async getTransactionHistoryByDate(initDate: string, endDate: string): Promise<TransactionHistory[]> {
        return await axios
        .get<TransactionHistory[]>(`${environment.apiUri}/transaction-history/${initDate}/${endDate}`)
        .then((response: AxiosResponse<TransactionHistory[]>) => {
            return response.data;
        })
        .catch((error: any) => {
            throw new Error(`Error al obtener la lista de monedas: ${error.message}`);
        });
    }
}