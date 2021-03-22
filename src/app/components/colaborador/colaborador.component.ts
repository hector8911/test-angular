import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Colaborador } from 'src/app/models/colaboradorModel';
import { ColaboradorXsucursal } from 'src/app/models/colaboradorXsucursalModel';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.css']
})
export class ColaboradorComponent implements OnInit {

  service: DataService;
  colaboradores: Array<Colaborador> = [];
  sucursalesXcolaborador: Array<ColaboradorXsucursal> = [];

  
  colaboradorDdl = "0";
  displayedColumns: string[] = ['option', 'nombreSucursal', 'distancia'];
  dataSource : Array<ColaboradorXsucursal> = [];


  
  constructor(service: DataService) {
    this.service = service;
   }

  ngOnInit(): void {
    this.service.listColaboradores().subscribe(data => {
      this.colaboradores = data;
      this.colaboradorDdl = this.colaboradores[0].id;
      this.showSucursales(this.colaboradorDdl);
    });
  }
  
  showSucursales(idColaborador:string){
    this.service.listSucursalesXcolaboradr(idColaborador).subscribe(data => {
      this.dataSource = data;
    });
  }

}
