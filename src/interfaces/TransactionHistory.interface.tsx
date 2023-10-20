export interface TransactionHistory {
        dbid: number;
        descripcion: string;
        monto_actual: number;
        origen: string;
        tipo_documento: string;
        documento: string;
        monto_transaccion: number;
        nuevo_monto: number;
        tipo_operacion: string;
        fecha: Date;
        cuenta: number;
        banco:number;
        moneda: string;
        tasa_cambio: number;
      }      