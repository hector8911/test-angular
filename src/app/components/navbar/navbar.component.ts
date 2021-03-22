import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  cookie: CookieService;
  router: Router;
  user:string = "";
  rol:string = "";
  constructor(cookie: CookieService, router: Router,) { 
    this.cookie = cookie;
    this.router = router;
  }

  ngOnInit(): void {
    if (this.cookie.get("user") != "") {
      this.user = this.cookie.get("user");
      this.rol = this.cookie.get("rol");
    }
    else
      this.router.navigate(['/']);        
  }

  logout(){
    this.cookie.deleteAll();
    this.router.navigate(['/']); 
  }

}
