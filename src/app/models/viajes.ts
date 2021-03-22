export interface Viajes{
    'id':number;
    'idSucursal': number;
    'idTransportista': number;
    'tarifa': number;
    'fecha': Date;
}

export interface DetalleViajes{
    'idViaje':number;
    'idColaborador': number;
    'distancia': number;
}