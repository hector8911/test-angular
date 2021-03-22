import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';


// service
import { DataService } from '../../services/data.service';
import { Sucursal } from '../../models/sucursalModel';
import { Colaborador } from 'src/app/models/colaboradorModel';
import { Viajes, DetalleViajes } from 'src/app/models/viajes';
import { Router } from '@angular/router';


@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})

export class ViajesComponent implements OnInit {
  createFormGroup() {
    return new FormGroup({
      Viajes: new FormGroup({
        idSucursal: new FormControl('', Validators.required),
        idTransportista: new FormControl('', Validators.required),
        tarifa: new FormControl(),
        fecha: new FormControl()
      }),
      requestType: new FormControl(),
      text: new FormControl()
    });
  }
  groupDetalle() {
    return new FormGroup({
      detalle: new FormGroup({
        idViaje: new FormControl(),
        idColaborador: new FormControl(),
        distancia: new FormControl(),
      }),
      requestType: new FormControl(),
      text: new FormControl()
    });
  }

  router: Router;

  error: string = "";
  Form: FormGroup;
  FormDetalle: FormGroup;
  //ddl
  sucursales: Array<Sucursal> = [];
  transportistas: Array<Colaborador> = [];
  colaboradores: Array<Colaborador> = [];
  xAdd: any = [];
  service: DataService;
  idcreate: any;

  valtarifa: string = "";
  detalle: Array<DetalleViajes> = [];

  dataSource : Array<Colaborador> = [];
  displayedColumns: string[] = ['option','nombreColaborador'];

  constructor(service: DataService, router: Router) {
    this.router = router;
    this.service = service;
    this.Form = this.createFormGroup();
    this.FormDetalle = this.groupDetalle();
  }

  ngOnInit(): void {
    this.service.getSucursales().subscribe(data => {
      this.sucursales = data;
    });
  }

  getData(idSucursal: string) {
    this.xAdd = [];
    this.service.getColaboradores(idSucursal).subscribe(data => {
      this.dataSource = data;
    });

    this.service.getTransportistas(idSucursal).subscribe(data => {
      this.transportistas = data;
    });
  }
  getTarifa(tarifa: string) {
    this.valtarifa = tarifa;
  }

  add(event: MatCheckboxChange) {
    let values = event.source;

    if (!values.checked) {
      for (let x = 0; x < this.xAdd.length; x++) {
        if (this.xAdd[x][0] == values.id) {
          this.xAdd.splice(x, 1);
        }
      }
    }
    else {
      this.xAdd.push([values.id, values.value]);
    }
  }

  save() {
    if (this.xAdd.length == 0) {
      this.error = "No se han seleccionado ningun colaborador";
    }
    else {
      this.Form.get("Viajes.tarifa")?.setValue(this.valtarifa);
      this.error = "";
      /*save */

      this.service.save(this.Form.get("Viajes")?.value).subscribe(data => {
        this.idcreate = data;
        let idViaje = this.idcreate[0].idViaje;

        //detalle
        this.xAdd.forEach((dato: any) => {
          this.FormDetalle.get("detalle.idViaje")?.setValue(idViaje);
          this.FormDetalle.get("detalle.idColaborador")?.setValue(dato[0]);
          this.FormDetalle.get("detalle.distancia")?.setValue(dato[1]);

          this.service.saveDetail(this.FormDetalle.get("detalle")?.value).subscribe();
        });

        this.router.navigate(['/reporte']);        

      });
    }
  }

}
