import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentUser = {};
  isLoggedIn:boolean;
  constructor(public authService: AuthService,
              private Router: Router,
              private db : AngularFireDatabase

  ) {

    this.authService.logEvent
      .subscribe(
      (res) => {
        this.isLoggedIn = true;

        console.log(res)


        this.db.object('users/'+res.uid).valueChanges()
          .subscribe( res => {

              this.currentUser = res
            }
            , error => { console.log(error)}

                    )

      },
        error => { console.log(error)}
    )
  }


  logout() {
    this.authService.logout()
      this.Router.navigate(["/"]);
    this.isLoggedIn = false
  }



}
