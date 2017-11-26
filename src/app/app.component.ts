import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  isLoggedIn:boolean;
  constructor(public authService: AuthService,
              private Router: Router,

  ) {

    this.authService.logEvent.subscribe(
      (res) => {
        this.isLoggedIn = true;
      }
    )
  }


  logout() {
    this.authService.logout()
      this.Router.navigate(["/"]);
    this.isLoggedIn = false
  }



}
