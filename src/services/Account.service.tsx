import axios, { AxiosResponse } from "axios";
import { Account } from "../interfaces/Account.interface";
import { environment } from "../environments/environment";

const callbacks: ((account: Account | null) => void)[] = [];

export default class AccountService {

  static selectedAccount(): Account {
    return JSON.parse(localStorage.getItem("accountToUpdate") as string);
  }

  static async selectAccount(account: Account) {
    localStorage.setItem("accountToUpdate", JSON.stringify(account));
    callbacks.forEach((callback) => callback(JSON.parse(localStorage.getItem("accountToUpdate") || '') as Account));
  }

  static async deleteSelectedAccount() {
    localStorage.removeItem("accountToUpdate");
    callbacks.forEach((callback) => callback(null));
  }

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

  static async deleteAccount(account: number): Promise<{ deleted: boolean }> {
    return await axios
      .delete<{ deleted: boolean }>(`${environment.apiUri}/accounts/${account}`)
      .then((response: AxiosResponse<{ deleted: boolean }>) => {
        return response.data;
      })
      .catch((error: any) => {
        throw new Error(`Error al eliminar la cuenta: ${error.message}`);
      });
  }

  static async updateAccount(account: Account): Promise<Account> {
    return await axios
      .put<Account>(`${environment.apiUri}/accounts/${account.CNT_CUENTA}`, account)
      .then((response: AxiosResponse<Account>) => {
        return response.data;
      })
      .catch((error: any) => {
        throw new Error(`Error al actualizar la cuenta: ${error.message}`);
      });
  }

  static async createAccount(account: Account): Promise<Account> {
    return await axios
      .post<Account>(`${environment.apiUri}/accounts`, account)
      .then((response: AxiosResponse<Account>) => {
        return response.data;
      })
      .catch((error: any) => {
        throw new Error(`Error al crear la cuenta: ${error.message}`);
      });
  }
}