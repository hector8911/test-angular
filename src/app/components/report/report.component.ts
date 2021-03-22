import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Reporte } from 'src/app/models/reporteModel';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Colaborador } from 'src/app/models/colaboradorModel';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  form() {
    return new FormGroup({
      params: new FormGroup({
        idTransportista: new FormControl(),
        fechai: new FormControl(),
        fechaf: new FormControl(),
      }),
      requestType: new FormControl(),
      text: new FormControl()
    });
  }

  reporte: Array<Reporte> = [];
  transportistas: Array<Colaborador> = [];
  service: DataService;
  Form: FormGroup;
  total: number = 0;
  dataSource : Array<Reporte> = [];
  
  displayedColumns: string[] = ['fecha', 'nombreColaborador', 'distancia', 'tarifa'];


  constructor(service: DataService) {
    this.service = service;
    this.Form = this.form();
   }

  ngOnInit(): void {
    this.service.listTransportistas().subscribe(data => {
      this.transportistas = data;
    });
  }
  actualizar(){
    this.service.getReport(this.Form.get("params")?.value).subscribe(data => {
      this.dataSource = data;
    });
  }

  getTotal() {
    this.total = 0;
    this.dataSource.forEach((dato: any) => {
      this.total += dato["tarifa"]*dato["distancia"];
    });
    return this.total;
  }

}
