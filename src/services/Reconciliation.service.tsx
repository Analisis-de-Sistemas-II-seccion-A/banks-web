import axios, { AxiosResponse } from 'axios';
import { Reconciliation } from '../interfaces/Reconciliation.interface';
import { environment } from '../environments/environment';

const callbacks: ((reconciliation: Reconciliation | null) => void)[] = [];

export default class ReconciliationService {
    static getReconciliation(): Reconciliation {
        return JSON.parse(localStorage.getItem("reconciliation") as string);
    }

    static async setReconciliation(reconciliation: Reconciliation) {
        localStorage.setItem("reconciliation", JSON.stringify(reconciliation));
        callbacks.forEach((callback) => callback(JSON.parse(localStorage.getItem("reconciliation") || '') as Reconciliation));
    }

    static async deleteReconciliation() {
        localStorage.removeItem("reconciliation");
        callbacks.forEach((callback) => callback(null));
    }

    static async getReconciliations(): Promise<Reconciliation[]> {
        return await axios
        .get<Reconciliation[]>(`${environment.apiUri}/conciliation`)
        .then((response: AxiosResponse<Reconciliation[]>) => {
          return response.data;
        })
        .catch((error: any) => {
          throw new Error(`Error al obtener la lista de conciliaciones: ${error.message}`);
        });
    }

    static async insertReconciliation(reconciliation: Reconciliation): Promise<Reconciliation> {
        return await axios
        .post<Reconciliation>(`${environment.apiUri}/conciliation`, reconciliation)
        .then((response: AxiosResponse<Reconciliation>) => {
          return response.data;
        })
        .catch((error: any) => {
          throw new Error(`Error al insertar la conciliación: ${error.message}`);
        });
    }
}