import {Injectable} from "@angular/core";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Quiz} from "../models/quiz";

@Injectable()
export class QuizService{

  quizList :  any ;
  data =<any>{};
  dataSend : any ;
  dataQuestions : any ;
  dataAnswers : any ;
  constructor(private firebase : AngularFireDatabase){}

getData(id:number){
// this.quizList = this.firebase.list('quizs')
try{
  let quizRef = this.firebase.list('quizs')
  quizRef.valueChanges().map( res => res[id])
    .subscribe(res=> {this.data = res;
    let q = this.data;
    this.dataQuestions = [q.question1,q.question2,q.question3,q.question4,q.question5,q.question6,q.question7,q.question8,q.question9,q.question10]
    this.dataAnswers = [q.answer1,q.answer2,q.answer3,q.answer4,q.answer5,q.answer6,q.answer7,q.answer8,q.answer9,q.answer10];

    this.dataSend = [this.dataQuestions,this.dataAnswers]

    });

}
catch(e){console.log(e)}

return this.dataSend;
  }

  addQuiz(quiz: Quiz){
  console.log(this.quizList + '   '+ typeof(this.quizList))
    this.quizList = this.firebase.list('quizs')
    this.quizList.push({
    categorie : quiz.categorie,
    question1:quiz.question1,
    question2:quiz.question2,
    question3:quiz.question3,
    question4:quiz.question4,
    question5:quiz.question5,
    question6:quiz.question6,
    question7:quiz.question7,
    question8:quiz.question8,
    question9:quiz.question9,
    question10:quiz.question10,
    answer1:quiz.answer1,
    answer2:quiz.answer2,
    answer3:quiz.answer3,
    answer4:quiz.answer4,
    answer5:quiz.answer5,
    answer6:quiz.answer6,
    answer7:quiz.answer7,
    answer8:quiz.answer8,
    answer9:quiz.answer9,
    answer10:quiz.answer10,


  })
  }




}
