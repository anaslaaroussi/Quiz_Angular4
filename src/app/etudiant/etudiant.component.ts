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
logs;
log;
// userAccount: any;

showQuestions : boolean = true
  categorie : any = ['MATH1','MATH2'];
  constructor(private quizService : QuizService,
              private afAuth: AngularFireAuth,
              private db: AngularFireDatabase

  ) {

    this.afAuth.authState
      .subscribe(
      (res) => {

        if (res) {
          console.log(res.uid)
          this.userUID = res.uid;
          this.db.list('users/'+res.uid+'/Logs').valueChanges().subscribe(

            res => { this.logs = res
              this.log = this.logs[this.logs.length-1].log
              console.log(res)

            }
          );

        }


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


     this.db.object('users/'+this.userUID+'/'+this.dateNow)
       .set( {
              quiztitle : this.dataSend[0][3]

       })

console.log(this.dataSend)

  }
}


  nextQuestion(idQuestion: number,idQuiz:number, reponse : any){
// extraire la reponse du bouton radio already checked

    let res  = '';
    let tru = document.forms[1].true.checked
    let fals = document.forms[1].false.checked
    if(tru) {
      res = 'true'
    }

    if(fals){
      res = 'false'

    }

    // fin extraction => res est la reponse donne par le user dans check box





    let object = {}

    object[idQuestion] = res

    this.db.list('users/'+this.userUID+'/'+this.dateNow+"/responses")
   .push(object)

    object = {}

    this.subscription.unsubscribe();
    this.countDown(5,idQuestion)



    let reponses = this.dataSend[idQuiz][1];

    console.log('les reponses : ' + reponses)
      this.response.push(res);

      if(res == reponses[idQuestion] ){ this.globalNote += 2
        this.test = true;


        console.log('goo')

      }
      else {
        console.log('reponse incorrect');
        this.test = false
      }

    console.log(`Votre reponse : ${res}     !! La reponse correct ${reponses[idQuestion]}`)

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
    let dataTitle = q.quizTitle
    this.dataSend.push([dataQuestions,dataAnswers,dataCategorie,dataTitle])

    this.compteur.push(i);

  }
console.log(this.dataSend)

}})}


//sass



}









