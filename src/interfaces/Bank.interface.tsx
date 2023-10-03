export type Bank = {
    id: number;
    image: string;
    name: string;
  };
  
  export type DataServiceContextType = {
    banks: Bank[];
    selectedBank: Bank | null;
    addBank: (newBank: Bank) => void;
    selectBank: (bank: Bank | null) => void;
  };
  