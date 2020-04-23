import '../../css/enter-score.scss';

import 'regenerator-runtime/runtime';

/* eslint-disable import/no-unresolved */
import $ from 'jquery';
/* eslint-enable import/no-unresolved */

export default class Score {
  constructor(scene) {
    this.scene = scene;
    // this._gameID = 'AW0l8QnPfE7JDizD3qMm';
    this._gameID = 'hac2oEribPuaA1LIjtBj';
    this._score = 0;
    this._scoresArray = [];
    this._scoreBoardArray = [];

    this._populateScoreArray();
  }

  getANewAPIKey() {
    fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/`, {
      method: 'post',
      body: JSON.stringify({
        name: "Your game name"
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => console.log(result));
  }

  _comparator(user1, user2) {
    if (user1.score < user2.score){
      return 1;
    } else if (user1.score > user2.score){
      return -1;
    }
    
    return 0;
  }

  async _populateScoreArray() {
    let response;
    let data;

    try {
      response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this._gameID}/scores/`);
      data = await response.json();

      this._scoresArray = data.result.sort(this._comparator);
      this._scoreBoardArray = this._scoresArray.slice(0, 10);
    } catch (error) {
      console.error(error);
    }
  }

  getScoreboard() {
    return this._scoreBoardArray;
  }

  _updateScoreboard(score) {
    this._scoresArray.push(score);
    this._scoresArray.sort(this._comparator);
    this._scoreBoardArray = this._scoresArray.slice(0, 10);
  }

  async setScore(user) {
    if (this._score !== 0 && user.length > 0) {
      try {
        await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this._gameID}/scores/`, {
          method: 'post',
          body: JSON.stringify({
            user: user,
            score: this._score
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        });
  
        this._updateScoreboard({user: user, score: this._score});
      } catch (error) {
        console.error(error);
      }
    }
  }

  addToScore(score) {
    this._score += score;
  }

  getScore() {
    return this._score;
  }

  setScoreToZero() {
    this._score = 0;
  }
}