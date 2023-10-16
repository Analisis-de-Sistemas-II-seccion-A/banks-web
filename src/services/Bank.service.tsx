import { Bank } from "../interfaces/Bank.interface";

const callbacks: ((bank: Bank | null) => void)[] = [];

export default class BankService {
    static selectedBank(): Bank {
        return JSON.parse(localStorage.getItem("selectedBank") as string);
    }

    static async selectBank(bank: Bank) {
        localStorage.setItem("selectedBank", JSON.stringify(bank));
        callbacks.forEach((callback) => callback(JSON.parse(localStorage.getItem("selectedBank") || '') as Bank));
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