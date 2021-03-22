import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ViajesComponent } from './components/viajes/viajes.component';
import { HomeComponent } from './components/home/home.component';
import { ReportComponent } from './components/report/report.component';
import { FormComponent } from './components/form/form.component';
import { ColaboradorComponent } from './components/colaborador/colaborador.component';

const routes: Routes = [
  {path: "", component:LoginComponent},
  {path: "viajes", component:ViajesComponent},
  {path: "home", component:HomeComponent},
  {path: "reporte", component:ReportComponent},
  {path: "colaboradores/:idColaborador/:idSucursal", component:FormComponent},
  {path: "colaboradores", component:ColaboradorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
