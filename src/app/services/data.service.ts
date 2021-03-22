import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//model
import { Sucursal } from '../models/sucursalModel';
import { Colaborador } from '../models/colaboradorModel';
import { Viajes, DetalleViajes } from '../models/viajes';
import { Reporte } from '../models/reporteModel';
import { ColaboradorXsucursal } from '../models/colaboradorXsucursalModel';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_URL = "http://localhost:8080/api/";

  constructor(private http: HttpClient) { 
    console.log("exito servicio");
  }

  getSucursales(){
    return this.http.get<Sucursal[]>(`${this.API_URL}/sucursal`);
  }
  getColaboradores(idSucursal:string){
    return this.http.get<Colaborador[]>(`${this.API_URL}/colaborador/${idSucursal}`);
  }

  getTransportistas(idSucursal:string){
    return this.http.get<Colaborador[]>(`${this.API_URL}/transportista/${idSucursal}`);
  }
  listTransportistas(){
    return this.http.get<Colaborador[]>(`${this.API_URL}/transportistas`);
  }

  listColaboradores(){
    return this.http.get<Colaborador[]>(`${this.API_URL}/colaboradores`);
  }
  listSucursalesXcolaboradr(idColaborador:string){
    return this.http.get<ColaboradorXsucursal[]>(`${this.API_URL}/sucursalesxcolaborador/${idColaborador}`);
  }

  getUpdate(idColaborador:string, idSucursal:string){
    return this.http.get<ColaboradorXsucursal>(`${this.API_URL}/colaboradorXsucursal/${idColaborador}/${idSucursal}`);
  }

  save(viaje:Viajes){
    return this.http.post(`${this.API_URL}/viajes/create`, viaje);
  }
  saveDetail(viajeDetalle:DetalleViajes){
    return this.http.post(`${this.API_URL}/viajes/createDetail`, viajeDetalle);
  }
 
  getReport(params:any){
    return this.http.post<Reporte[]>(`${this.API_URL}/viajes/report`, params);
  }
  
  login(us:string, pass:string){
    return this.http.get<Colaborador[]>(`${this.API_URL}/login/${us}/${pass}`);
  }

  updateColaboradorXsucursal(cxs:ColaboradorXsucursal, idSucursal:number){
    return this.http.put(`${this.API_URL}/colaboradorxsucursal/update/${idSucursal}`, cxs);
  }
}
