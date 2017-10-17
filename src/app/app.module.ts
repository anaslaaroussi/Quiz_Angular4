import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfComponent } from './prof/prof.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { ConnexionComponent } from './connexion/connexion.component';
import {AngularFireModule} from "angularfire2";
import {FIREBASE_CONFIG} from "./models/FIREBASE_CONFIG";



const  appRoutes : Routes = [
  {path:'professeur',
  component: ProfComponent},
  {path:'etudiant',
  component: EtudiantComponent},
  {path:'',
  component:ConnexionComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ProfComponent,
    EtudiantComponent,
    ConnexionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(FIREBASE_CONFIG)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
