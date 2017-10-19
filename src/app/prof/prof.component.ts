import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Quiz} from "../models/quiz";

import {Observable} from "rxjs/Observable";
import { FormBuilder,FormGroup,Validators }  from '@angular/forms';
@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css']
})
export class ProfComponent implements OnInit {
show : boolean = false;
  quiz = [{questions: []}] as Quiz[];

// quizs : {} Quiz[];
 // quizs : Quiz = new Quiz()
  quizs = [{questions: []}] as Quiz[]

  databaseRef$ :   Observable<Quiz[]>;
// make referecence to our database


// num : number = 1;
rForm : FormGroup;
post : any

id_question : number = 1;
constructor(private db: AngularFireDatabase,private fb: FormBuilder) {


this.rForm = fb.group({

  $key : ['',Validators.required],
  category : ['',Validators.required],
  questions: this.fb.group({
    id : [,Validators.required],
    question : ['',Validators.required],
    answer : ['',Validators.required]
  })


})

// this.quiz = JSON.stringify(this.quiz)


 // this.databaseRef$ = this.db.list<Quiz>('/quiz').valueChanges()

  // try{
  //   this.databaseRef$.subscribe(data=>{
  //
  //     this.quizs = data
  //   })
  //
  // }
  // catch (e){console.log(e)}

}

  ngOnInit() {
  }

  addQuiz(){
this.show = !this.show;


  }


  async submitQuiz(){


  }

      async nextQuestion(quiz , id : number){

    // console.log(this.rForm )
    // console.log(JSON.stringify(this.rForm.value)  )

      console.log(quiz)

      if(this.id_question == 1){
          quiz.questions.id = this.id_question
         this.quiz.push(quiz);
        this.id_question ++
        return
      }
     if(this.id_question <10 && this.id_question !== 1 ){

       //  let my = new Promise(()=>{
       //     this.id_question ++
       // }).then( ()=> quiz.questions.id = this.id_question)
       //    .then(()=>{
       //    this.quiz.push(quiz.questions)
       //    })




let length = this.quiz[0].questions.length
       quiz.questions.id = this.id_question;
      await this.quiz[0].questions.push(quiz.questions)
       this.id_question++
console.log(JSON.stringify(this.quiz[0].questions) )





    }
    else{
      console.log('Nombre de question depasse')
    }

  }
}
