import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProfComponent } from './prof/prof.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { ConnexionComponent } from './connexion/connexion.component';



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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
