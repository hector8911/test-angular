import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//service
import { DataService } from './services/data.service';
import { LoginComponent } from './components/login/login.component';
import { ViajesComponent } from './components/viajes/viajes.component';
import { HomeComponent } from './components/home/home.component';
import { ReportComponent } from './components/report/report.component';
import { FormComponent } from './components/form/form.component';
import { ColaboradorComponent } from './components/colaborador/colaborador.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//material
import {  MatButtonModule } from '@angular/material/button';
import {  MatIconModule } from '@angular/material/icon';
import {  MatCardModule } from '@angular/material/card';
import {  MatToolbarModule } from '@angular/material/toolbar';
import {  MatInputModule } from '@angular/material/input';
import {  MatGridListModule } from '@angular/material/grid-list';
import {  MatCheckboxModule } from '@angular/material/checkbox';
import {  MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViajesComponent,
    HomeComponent,
    ReportComponent,
    FormComponent,
    ColaboradorComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //service,
    HttpClientModule,
    //para doble anidacion
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    //material
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatGridListModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSelectModule
  ],
  providers: [DataService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
