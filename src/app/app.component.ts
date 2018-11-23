import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {log} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {
  private questionsCollection: AngularFirestoreCollection<Question>;
  questions: Observable<Question[]>;
  answers: Choice[];
  results: boolean;
  score: number;
  party: string;
  code: string;
  constructor(db: AngularFirestore) {
    this.questionsCollection = db.collection<Question>('questions');
    this.questions = this.questionsCollection.valueChanges();
    this.answers = [];
    this.results = false;
    this.score = 0;
    this.code = '';
  }

  submit() {
    const codeArray = [];
    log(this.answers[0].points);
    for(var i = 0; i < this.answers.length; i++) {
      this.score += this.answers[i].points;
      codeArray[codeArray.length] = this.answers[i].id;
    }
    this.code = codeArray.toString();
    for(var i = 0; i < codeArray.length; i++) {
      this.code = this.code.replace(',', '');
    }
    if(this.score > 0) {
      this.party = 'Conservative';
    } else if(this.score == 0) {
      this.party = 'Moderate';
    } else if(this.score < 0) {
      this.party = 'Liberal';
    }
    this.results = true;
  }
}

export interface Question {
  question: string;
  choices: Choice[];
}

export interface Choice {
  id: String;
  name: string;
  points: number;
  interest: String[];
}
