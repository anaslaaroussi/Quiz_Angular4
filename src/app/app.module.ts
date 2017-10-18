import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfComponent } from './prof/prof.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { ConnexionComponent } from './connexion/connexion.component';
import {AngularFireModule} from "angularfire2";


import {FIREBASE_CONFIG} from "./models/FIREBASE_CONFIG";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {FormsModule,ReactiveFormsModule} from "@angular/forms";



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
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
