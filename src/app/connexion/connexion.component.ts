import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  constructor(private authService: AuthService
  ) { }

  ngOnInit() {
  }






  login(email: string,password: string) {
    this.authService.login(email,password)

    // console.log(email)
  }

}
