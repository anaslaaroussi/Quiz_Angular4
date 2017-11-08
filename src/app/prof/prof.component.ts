import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";

import {FormBuilder, NgForm} from '@angular/forms';
import {QuizService} from "../services/quiz.service";
@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css']
})
export class ProfComponent implements OnInit {
show : boolean = false;
disable : boolean = false ;

// quizs : AngularFireList<Quiz>
// id_question : number = 1;
constructor(private db: AngularFireDatabase,private fb: FormBuilder,private quizService : QuizService) {

}

  ngOnInit() {
    // this.quizService.getData()
  }

  addQuiz(){
this.show = !this.show;


  }


  submitQuiz(f : NgForm){
     console.log(JSON.stringify(f.value) )
     this.quizService.addQuiz(f.value)

  }



  onFocus(input){
        input.value = ''
  }

   disableInput(id){

    this.disable = !this.disable


    if(this.disable== true){
  let test1 = document.getElementById(`question${id}`).setAttribute('disabled','this.disable')
  let test2 = document.getElementById(`answer${id}`).setAttribute('disabled','this.disable')
}

if(this.disable == false){
  let test1 = document.getElementById(`question${id}`).removeAttribute('disabled')
  let test2 = document.getElementById(`answer${id}`).removeAttribute('disabled')

}

  }






}
