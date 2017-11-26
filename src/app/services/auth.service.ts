import { Injectable } from '@angular/core';
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";

@Injectable()
export class AuthService {

  logEvent: Subject<any> = new Subject<any>()

  constructor(private afAuth: AngularFireAuth,
              public db : AngularFireDatabase,
              public router: Router
    ) {


  }






  login(email,password) {
    var that = this
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then( function (res) {

        that.db.object('users/'+res.uid).valueChanges()
          .subscribe(res => {

            that.logEvent.next();
            let res2 = <any>res
            if (res2.type == "teacher") {
              that.router.navigate(["/professeur"])

            }
            else if (res2.type == "student") {
              that.router.navigate(["/etudiant"])

            }

          })

      })
      .catch(function (err) {
        console.log(err.message)
      })
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => { console.log("logged out ! ")})
  }
}
