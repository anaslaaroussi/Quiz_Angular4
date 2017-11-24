import { Component, OnInit } from '@angular/core';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Subscription} from "rxjs/Subscription";
import {QuizService} from "../services/quiz.service";
import * as _ from "lodash";



@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {

  dataSend : Array<any> = []
quizByCategorie : Array<any> = []
compteur : Array<number> = []  ;
test : boolean = false;
timeout : number ;

quizId :number;
data : any;
subscription: Subscription;
idQuestion : number = 0
  response : Array<any> = [];
globalNote : number = 0;
res : any;

showQuestions : boolean = true
  categorie : any = ['MATH1','MATH2'];
  constructor(private quizService : QuizService) {


  }

  ngOnInit() {
  }


  countDown(timeout,idQuestion: number){
    let timer = TimerObservable.create(0, 1000);

      this.subscription = timer.subscribe(t => {


          this.timeout = timeout - t;
          if(this.timeout < 1){
            this.subscription.unsubscribe()
            this.timeout = timeout

            console.log('Le temps est fini')


            this.countDown(timeout,this.idQuestion)
            this.nextQuestion(this.idQuestion,this.quizId,this.res)



          }



        if( this.idQuestion >= 10 )     {
          this.showQuestions = false;
          this.subscription.unsubscribe()
          console.log(`Temps fini les reponse sont : ${this.response}`)
          console.log("done done done ")
        }

      })
      console.log(this.timeout);
  }


getQuizs(id: number){

    this.data= [];
    this.quizId = id
     // let test = this.quizService.getData(id)
  if(this.dataSend !== undefined){
    this.data =  this.dataSend[id]

  }
}


  nextQuestion(idQuestion: number,idQuiz:number, reponse : any){


    this.subscription.unsubscribe();
    this.countDown(5,idQuestion)



    let reponses = this.dataSend[idQuiz][1];

    console.log('les reponses : ' + reponses)
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
console.log(this.idQuestion)

  }


selectQuizByCategorie(selectedElem: string) {
 this.compteur = [];
 this.dataSend = []
  let val = this.quizService.getDataCategorie(selectedElem);



  val.valueChanges().subscribe((res)=>  {

    this.quizByCategorie = _.filter(res,(res)=>{  return res.categorie == selectedElem})
console.log(this.quizByCategorie)

    if(this.quizByCategorie !== []){

  for(let  i = 1 ; i <= this.quizByCategorie.length; i++ ){

    let q = <any>this.quizByCategorie[i-1]

    let dataQuestions = [q.question1,q.question2,q.question3,q.question4,q.question5,q.question6,q.question7,q.question8,q.question9,q.question10]
    let dataAnswers = [q.answer1,q.answer2,q.answer3,q.answer4,q.answer5,q.answer6,q.answer7,q.answer8,q.answer9,q.answer10];
    let dataCategorie = q.categorie;

    this.dataSend.push([dataQuestions,dataAnswers,dataCategorie])

    this.compteur.push(i);

  }


}})}

}









