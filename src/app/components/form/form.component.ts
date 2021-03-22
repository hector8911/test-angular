import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColaboradorXsucursal } from 'src/app/models/colaboradorXsucursalModel';
import { Sucursal } from 'src/app/models/sucursalModel';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  active: ActivatedRoute;
  service: DataService;
  datos: ColaboradorXsucursal;
  sucursales: Array<Sucursal> = [];
  sucursalAnterior: any;
  error = "";
  router: Router;



  constructor(active: ActivatedRoute, service: DataService,router: Router) {
    this.active = active;
    this.service = service;
    this.router = router;
    this.datos = {
      idColaborador: 0,
      nombreSucursal: "",
      nombreColaborador: "",
      idSucursal: 0,
      distancia: 0
    }
   }

  ngOnInit(): void {
    let params = this.active.snapshot.params;
    if (params.idSucursal && params.idColaborador) {
      this.service.getUpdate(params.idColaborador, params.idSucursal ).subscribe(data => {
        this.datos = data;
        this.sucursalAnterior = data.idSucursal;
      });
      this.service.getSucursales().subscribe(data => {
        this.sucursales = data;
      });
    }    
  }

  save(){
    this.service.updateColaboradorXsucursal(this.datos, this.sucursalAnterior).subscribe(data => {
      let x = JSON.stringify(data).substring(11,12);
      if(x === "0")
        this.error = "El colaborador ya tiene asignada la sucursal";
      else
       {
        
        this.router.navigate(['/colaboradores']);
       } 

    });
  }

}
