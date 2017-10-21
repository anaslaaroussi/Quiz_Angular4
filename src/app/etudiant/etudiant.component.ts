import { Component, OnInit } from '@angular/core';
import {count} from "rxjs/operator/count";

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
test : any
  constructor() { }

  ngOnInit() {
  }


  countDown(timeout){
   this.test = timeout
    this.test --;
    let time = timeout*1000
    let element = document.getElementById('count');
    element.innerHTML = `Il vous reste ${timeout} sec`;

    if(timeout > 0){
      let timer= setTimeout('this.countDown(this.test)',1000)
    }
console.log('sa')

  }



}
