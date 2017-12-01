import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {AngularFireDatabase} from "angularfire2/database";
import {ToastrService} from "toastr-ng2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn:boolean;
  constructor(public authService: AuthService,
              private Router: Router,
              private db : AngularFireDatabase,
              private toastrService: ToastrService

  ) {

    this.authService.logEvent
      .subscribe(
      (uid) => {
        this.isLoggedIn = true;
          this.toastrService.success("YOU ARE LOGGED IN ","SUCCESS")
        console.log(uid)

      },
        error => { console.log(error)}
    )
  }


  logout() {
    let self = this
    this.authService.logout()
      this.Router.navigate(["/"]).then(
        function () {
          self.toastrService.success("YOU ARE LOGGED OUT ","SIGNED OUT")
        }
      );
    this.isLoggedIn = false
  }



}
