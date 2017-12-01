import { Component, OnInit } from '@angular/core';
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {Subscription} from "rxjs/Subscription";
import {QuizService} from "../services/quiz.service";
import * as _ from "lodash";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {ToastrService} from "toastr-ng2";



@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})

export class EtudiantComponent implements OnInit {
incorrect : any = []
  examsVisible: boolean = false
  failedMessage : String;
activeFailedMessage : boolean = false
  hideButtonCount: boolean = true;
  showinputnextquestion : boolean = false ;
  showExams : boolean = false;
  exams : any = [];
arrayOfResponse : any = [];
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
idQuestion : number = 0;
response : Array<any> = [];
globalNote : number = 0;
res : any;
userUID: string;
logs;
log;
userName
// userAccount: any;

showQuestions : boolean = true
  categorie : any = ['MATH1','MATH2'];
  constructor(private quizService : QuizService,
              private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private toastrService: ToastrService

  ) {
this.arrayOfResponse = []
    this.afAuth.authState
      .subscribe(
      (res) => {

        if (res) {
          console.log(res.uid)
          this.userUID = res.uid;
          this.db.list('users/'+res.uid+'/Logs').valueChanges().subscribe(

            res => {
              this.logs = res
              this.log = this.logs[this.logs.length-1].log
              console.log(res)

            }
          );

        }


        this.db.object('users/'+res.uid).valueChanges()
          .subscribe( (res) => { console.log(res)
            let res1 = <any>res;
            this.userName = res1.username
          } )

      }


    )

    setTimeout(

      () => { this.showMyexams();}
      ,2000)

  }

  ngOnInit() {
  }

startExam(timeout,idQuestion){
  this.toastrService.info("EXAM STARTED"," YOU HAVE 10 MINUTS")
    this.examsVisible = true;
    this.countDown(timeout,idQuestion);
}



  countDown(timeout,idQuestion: number){

    this.hideButtonCount = false;
    this.showinputnextquestion = true
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



if(this.incorrect.length > 2 ){
            this.toastrService.error('I will see you in the rattrapage examination :)','You have failed')
            this.activeFailedMessage = true
            this.showQuestions = false;
            this.subscription.unsubscribe();

            for(let i = 0 ; i< 10;i++){

              if(this.arrayOfResponse[i] == undefined){

                this.arrayOfResponse[i] = ''
              }


            }

  this.db.object('users/'+this.userUID+'/exams/'+this.dateNow)
    .set({quizTitle : this.dataSend[0][3],
      res1: this.arrayOfResponse[0],
      res2: this.arrayOfResponse[1],
      res3: this.arrayOfResponse[2],
      res4: this.arrayOfResponse[3],
      res5: this.arrayOfResponse[4],
      res6: this.arrayOfResponse[5],
      res7: this.arrayOfResponse[6],
      res8: this.arrayOfResponse[7],
      res9: this.arrayOfResponse[8],
      res10: this.arrayOfResponse[9],
      quest1: this.dataSend[0][0][0],
      quest2: this.dataSend[0][0][1],
      quest3: this.dataSend[0][0][2],
      quest4: this.dataSend[0][0][3],
      quest5: this.dataSend[0][0][4],
      quest6: this.dataSend[0][0][5],
      quest7: this.dataSend[0][0][6],
      quest8: this.dataSend[0][0][7],
      quest9: this.dataSend[0][0][8],
      quest10: this.dataSend[0][0][9],
      datePass : this.dateNow






    })



}

        if( this.idQuestion >= 10 )     {
          this.showQuestions = false;
          this.subscription.unsubscribe()


          this.db.object('users/'+this.userUID+'/exams/'+this.dateNow)
            .set({quizTitle : this.dataSend[0][3],
              res1: this.arrayOfResponse[0],
              res2: this.arrayOfResponse[1],
              res3: this.arrayOfResponse[2],
              res4: this.arrayOfResponse[3],
              res5: this.arrayOfResponse[4],
              res6: this.arrayOfResponse[5],
              res7: this.arrayOfResponse[6],
              res8: this.arrayOfResponse[7],
              res9: this.arrayOfResponse[8],
              res10: this.arrayOfResponse[9],
              quest1: this.dataSend[0][0][0],
              quest2: this.dataSend[0][0][1],
              quest3: this.dataSend[0][0][2],
              quest4: this.dataSend[0][0][3],
              quest5: this.dataSend[0][0][4],
              quest6: this.dataSend[0][0][5],
              quest7: this.dataSend[0][0][6],
              quest8: this.dataSend[0][0][7],
              quest9: this.dataSend[0][0][8],
              quest10: this.dataSend[0][0][9],
              datePass : this.dateNow

            })
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


     this.db.object('users/'+this.userUID+'/exams/'+this.dateNow)
       .set( {
              quizitle : this.dataSend[0][3]

       })

console.log(this.dataSend)

  }
}


  nextQuestion(idQuestion: number,idQuiz:number, reponse : any){
// extraire la reponse du bouton radio already checked

    let res  = '';
    let tru = document.forms[2].true.checked
    let fals = document.forms[2].false.checked
    if(tru) {
      res = 'true'
    }


    if(fals){
      res = 'false'

    }

    // fin extraction => res est la reponse donne par le user dans check box

// test



    // fin test



    let object = {}

    let question = this.dataSend[idQuiz][0][this.idQuestion]


    object[idQuestion] =   res

    this.arrayOfResponse.push(res)
    object = {}
    this.subscription.unsubscribe();
    this.countDown(5,idQuestion)



    let reponses = this.dataSend[idQuiz][1];

      this.response.push(res);

      if(res == reponses[idQuestion] ){ this.globalNote += 2
        this.test = true;



        // console.log('goo')

      }
      else {
        // console.log('reponse incorrect');
        this.test = false
        this.incorrect.push(false)

      }

    // console.log(`Votre reponse : ${res}     !! La reponse correct ${reponses[idQuestion]}`)

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




showMyexams(){
  this.showExams = true;
  this.db.object('users/'+this.userUID+'/exams/').valueChanges().subscribe((res)=>


  {
    let temp = [];
    let exams = []
    exams.push(res)
    for (let i in exams[0]){

      temp.push(exams[0][i])
    }

    this.exams = temp

    console.log(temp)
  }
    )

}



}









