import { Component, OnInit } from '@angular/core';
import {QuizService} from "../services/quiz.service";

@Component({
  selector: 'app-prof-quizs',
  templateUrl: './prof-quizs.component.html',
  styleUrls: ['./prof-quizs.component.css']
})
export class ProfQuizsComponent implements OnInit {

  constructor(private quizService:QuizService) { }

  ngOnInit() {

  }


  showmyquizs(){

  }




}
