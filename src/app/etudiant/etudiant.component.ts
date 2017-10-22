import { Component, OnInit } from '@angular/core';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Subscription} from "rxjs/Subscription";





@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
timeout : number ;
id: number = 1;

  subscription: Subscription;

  constructor() { }

  ngOnInit() {
  }


  countDown(timeout){
//    this.test = timeout
//     this.test --;
//     let time = timeout*1000
//     let element = document.getElementById('count');
//     element.innerHTML = `Il vous reste ${timeout} sec`;
//
//     if(timeout > 0){
//       let timer= setTimeout('this.countDown(this.test)',1000)
//     }
// console.log('sa')
    let timer = TimerObservable.create(0, 1000);



      this.subscription = timer.subscribe(t => {


          this.timeout = timeout - t;
          if(this.timeout < 1){
            this.subscription.unsubscribe()
            console.log('Le temps est fini')
            document.getElementById(`input${this.id}`).setAttribute('disabled','this.disable')
            this.id++;
          }



      })




}}

