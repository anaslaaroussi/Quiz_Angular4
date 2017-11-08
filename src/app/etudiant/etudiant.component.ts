import { Component, OnInit } from '@angular/core';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Subscription} from "rxjs/Subscription";
import {QuizService} from "../services/quiz.service";





@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
test : boolean = false;

  timeout : number ;
id: number = 1;
quizId :number;
data : any;
  subscription: Subscription;
idQuestion : number = 0
  response : Array<any> = [];
globalNote : number = 0;
  constructor(private quizService : QuizService) { }

  ngOnInit() {
  }


  countDown(timeout,idQuestion: number,idQuiz:number, reponse : any){
    let timer = TimerObservable.create(0, 1000);



      this.subscription = timer.subscribe(t => {


          this.timeout = timeout - t;
          if(this.timeout < 1){
            this.subscription.unsubscribe()
            this.timeout = timeout

            console.log('Le temps est fini')
            // document.getElementById(`input${this.id}`).setAttribute('disabled','this.disable')
            // this.id++;

            // this.countDown(timeout,idQuestion,idQuiz,reponse);
            this.nextQuestion(idQuestion,idQuiz,reponse);

          }



      })




}



getQuizs(id){

     let test =   this.quizService.getData(id)
  if(test !== undefined){
    this.data =  test
console.log(typeof(this.data))
     }




      // this.data = JSON.stringify(data);
      // console.log(this.data)

}


  nextQuestion(idQuestion: number,idQuiz:number, reponse : any){


      let reponses = this.quizService.getData(idQuiz)[1];

      this.response.push(reponse);
      if(reponse == reponses[idQuestion] ){ this.globalNote += 2
        this.test = true
        console.log('goo')

      }



      else {
        console.log('reponse incorrect');
        this.test = false
      }

    console.log(`Votre reponse : ${reponse}     !! La reponse correct ${reponses[idQuestion]}`)




    this.idQuestion = idQuestion + 1;

  }


  CalculNote(){

  }


}

