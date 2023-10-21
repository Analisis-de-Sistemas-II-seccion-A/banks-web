import axios, { AxiosResponse } from "axios";
import { Currency } from '../interfaces/Currency.interface';
import { environment } from "../environments/environment";
import { AccountType } from "../interfaces/AccountType.interface";
import { TransactionOrigin } from "../interfaces/TransactionOrigin.interface";
import { DocumentState } from "../interfaces/DocumentState.interface";
import { DocumentType } from "../interfaces/DocumentType.interface";

export default class CatalogService {

    static async getCurrencies(): Promise<Currency[]> {
        return await axios
            .get<Currency[]>(`${environment.apiUri}/currency`)
            .then((response: AxiosResponse<Currency[]>) => {
                return response.data;
            })
            .catch((error: any) => {
                throw new Error(`Error al obtener la lista de monedas: ${error.message}`);
            });
    }


    static async getAccountTypes(): Promise<AccountType[]> {
        return await axios
            .get<AccountType[]>(`${environment.apiUri}/account-type`)
            .then((response: AxiosResponse<AccountType[]>) => {
                return response.data;
            })
            .catch((error: any) => {
                throw new Error(`Error al obtener la lista de tipos de cuenta: ${error.message}`);
            });
    }

    static async getDocumentTypes(): Promise<DocumentType[]> {
        return await axios
            .get<DocumentType[]>(`${environment.apiUri}/document-type`)
            .then((response: AxiosResponse<DocumentType[]>) => {
                return response.data;
            })
            .catch((error: any) => {
                throw new Error(`Error al obtener la lista de tipos de documento: ${error.message}`);
            });
    }

    static async getDocumentStates(): Promise<DocumentState[]> {
        return await axios
            .get<DocumentState[]>(`${environment.apiUri}/document-state`)
            .then((response: AxiosResponse<DocumentState[]>) => {
                return response.data;
            })
            .catch((error: any) => {
                throw new Error(`Error al obtener la lista de estados de documento: ${error.message}`);
            });
    }

    static async getOrigins(): Promise<TransactionOrigin[]> {
        return await axios
            .get<TransactionOrigin[]>(`${environment.apiUri}/transaction-origin`)
            .then((response: AxiosResponse<TransactionOrigin[]>) => {
                return response.data;
            })
            .catch((error: any) => {
                throw new Error(`Error al obtener la lista de origenes: ${error.message}`);
            });
    }
}