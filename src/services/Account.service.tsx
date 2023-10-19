import axios, { AxiosResponse } from "axios";
import { Account } from "../interfaces/Account.interface";
import { environment } from "../environments/environment";

export default class AccountService {

    static async getAccountByid(account: number): Promise<Account> {
        return await axios
        .get<Account>(`${environment.apiUri}/accounts/${account}`)
        .then((response: AxiosResponse<Account>) => {
          return response.data;
        })
        .catch((error: any) => {
          throw new Error(`Error al obtener la lista de cuentas: ${error.message}`);
        });
    }
}