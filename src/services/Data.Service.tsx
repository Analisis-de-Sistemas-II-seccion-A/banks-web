import { Bank } from '../interfaces/Bank.interface';

const banks: Bank[] = [];
let selectedBank: Bank | null = null;
const callbacks: ((bank: Bank | null) => void)[] = [];

const addBank = (newBank: Bank) => {
  banks.push(newBank);
};

const selectBank = (bank: Bank | null) => {
  selectedBank = bank;
  // Llama a todos los callbacks registrados cuando cambia selectedBank
  callbacks.forEach((callback) => callback(selectedBank));
};

// Registra un callback para ser llamado cuando cambie selectedBank
const subscribeToSelectedBank = (callback: (bank: Bank | null) => void) => {
  callbacks.push(callback);

  // Devuelve una función para cancelar la suscripción
  return () => {
    const index = callbacks.indexOf(callback);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  };
};

export default {
  banks,
  selectedBank,
  addBank,
  selectBank,
  subscribeToSelectedBank,
};
