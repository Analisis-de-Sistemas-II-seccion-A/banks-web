export interface Transaction {
    TRA_TRANSACCION?: number;
    TRA_NUMERO_DOCUMENTO?: number;
    TRA_DESCRIPCION: string;
    TTR_TIPO_TRANSACCION: number;
    OTR_ORIGEN_TRANSACCION: number;
    TDO_TIPO_DOCUMENTO?: number;
    TRA_MONTO: number;
    TRA_FECHA: string;
    CNT_CUENTA: number;
    CON_CONCILIACION?: number;
    ed_estado_documento?:number;
    tra_monto_actual_cuenta?: number;
}