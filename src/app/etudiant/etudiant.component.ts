import { Component, OnInit } from '@angular/core';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Subscription} from "rxjs/Subscription";
import {QuizService} from "../services/quiz.service";
import * as _ from "lodash";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";



@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
dateNow : any ;
  quiz: any;
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
userUID: string;
// userAccount: any;

showQuestions : boolean = true
  categorie : any = ['MATH1','MATH2'];
  constructor(private quizService : QuizService,
              private afAuth: AngularFireAuth,
              private db: AngularFireDatabase

  ) {
    this.afAuth.authState.subscribe(
      (res) => { console.log(res.uid)
            this.userUID = res.uid;



      }
    )

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
          console.log(`Temps fini les reponse sont : ${this.response}`);
          console.log("done done done ");
        }

      })
      console.log(this.timeout);
  }


getQuizs(id: number){
    this.dateNow = Date.now()
    this.data= [];
    this.quizId = id
     // let test = this.quizService.getData(id)
  if(this.dataSend !== undefined){
    this.data =  this.dataSend[id]

    console.log(this.data[3])
     this.db.object('users/'+this.userUID+'/'+this.dateNow)
       .set( {
              quiztitle : this.data[3]
       })



  }
}


  nextQuestion(idQuestion: number,idQuiz:number, reponse : any){

    let object = {}
    object[idQuestion] = reponse

    this.db.list('users/'+this.userUID+'/'+this.dateNow+"/responses")
   .push(object)

    object = {}

    this.subscription.unsubscribe();
    this.countDown(5,idQuestion)



    let reponses = this.dataSend[idQuiz][1];

    console.log('les reponses : ' + reponses)
      this.response.push(reponse);

      if(reponse == reponses[idQuestion] ){ this.globalNote += 2
        this.test = true;


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
  this.quiz = this.quizService.getDataCategorie(selectedElem);



  this.quiz.valueChanges().subscribe((res)=>  {

    this.quizByCategorie = _.filter(res,(res)=>{  return res.categorie == selectedElem})
console.log(this.quizByCategorie)

    if(this.quizByCategorie !== []){

  for(let  i = 1 ; i <= this.quizByCategorie.length; i++ ){

    let q = <any>this.quizByCategorie[i-1]

    let dataQuestions = [q.question1,q.question2,q.question3,q.question4,q.question5,q.question6,q.question7,q.question8,q.question9,q.question10]
    let dataAnswers = [q.answer1,q.answer2,q.answer3,q.answer4,q.answer5,q.answer6,q.answer7,q.answer8,q.answer9,q.answer10];
    let dataCategorie = q.categorie;
    let dataTitle = q.title
    this.dataSend.push([dataQuestions,dataAnswers,dataCategorie,dataTitle])

    this.compteur.push(i);

  }


}})}

}









