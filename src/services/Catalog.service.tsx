import axios, { AxiosResponse } from "axios";
import { Currency } from '../interfaces/Currency.interface';
import { environment } from "../environments/environment";
import { AccountType } from "../interfaces/AccountType.interface";

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


}