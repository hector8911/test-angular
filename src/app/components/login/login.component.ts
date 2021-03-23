import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CookieService } from 'ngx-cookie-service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  service: DataService;
  router: Router;
  cookie: CookieService;
  user: string = "";
  pass: string = "";
  hide = true;
  error = "";

  constructor(service: DataService, router: Router, cookie: CookieService) {
    this.service = service;
    this.router = router;
    this.cookie = cookie;
  }

  ngOnInit(): void {
  }

  submitLogin() {
    this.service.login(this.user, this.pass).subscribe(data => {

      if(data.length == 1){
        this.cookie.set("user", data[0].nombreColaborador );
        this.cookie.set("rol", data[0].rol);
        this.router.navigate(['/home']);        
      }
      else
        this.error = "Usuario o contraseña incorrecta";
    });
  }

}
