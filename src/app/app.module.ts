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
import {QuizService} from "./services/quiz.service";
import { ProfQuizsComponent } from './prof-quizs/prof-quizs.component';
import {Observable} from "rxjs/Observable";



const  appRoutes : Routes = [
  {path:'professeur',  component: ProfComponent},
  {path:'etudiant', component: EtudiantComponent},
  {path:'', component:ConnexionComponent},
  {path:'myquizs',component:ProfQuizsComponent}

  ]

@NgModule({
  declarations: [
    AppComponent,
    ProfComponent,
    EtudiantComponent,
    ConnexionComponent,
    ProfQuizsComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }
