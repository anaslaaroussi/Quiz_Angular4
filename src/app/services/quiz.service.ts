import {Injectable} from "@angular/core";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {Quiz} from "../models/quiz";

@Injectable()
export class QuizService{
  datatest2 : Array<any> = []
  quizList :  any ;
  data =<any>{};
  dataSend : any ;
  dataQuestions : any ;
  dataAnswers : any ;
  dataCategorie : any;
  datatest : any[] ;

  constructor(private firebase : AngularFireDatabase){}



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
    answer10:quiz.answer10
  //ssss

  })
  }




  getDataCategorie(categorie: string){

    let quizRef = this.firebase.list('quizs')

    return quizRef







  }






}
