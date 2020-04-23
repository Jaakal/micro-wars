import '../../css/enter-score.scss';

import 'regenerator-runtime/runtime';

/* eslint-disable import/no-unresolved */
import $ from 'jquery';
/* eslint-enable import/no-unresolved */

export default class Score {
  constructor(scene) {
    this.scene = scene;
    this._gameID = 'AW0l8QnPfE7JDizD3qMm';
    this._score = 0;
    this._scoresArray = [];
    this._scoreBoardArray = [];
    this._submitScore = false;

    this._populateScoreArray();
  }

  _comparator(user1, user2) {
    if (user1.score < user2.score){
      return 1;
    }
    
    if (user1.score > user2.score){
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

      console.log(data);

      this._scoresArray = data.result.sort(this._comparator);
      this._scoreBoardArray = this._scoresArray.slice(0, 10);
    } catch (error) {
      console.error(error);
    }

    $('.enter-score').submit((event) => {
      event.preventDefault();
    
      this._setScore($('.enter-score').serializeArray()[0].value);
      $('.enter-score').removeClass('display-enter-score');
    });
  }

  getScoreboard() {
    return this._scoreBoardArray;
  }

  _updateScoreboard(score) {
    this._scoresArray.push(score);
    this._scoresArray.sort(this._comparator);
    this._scoreBoardArray = this._scoresArray.slice(0, 10);

    this._submitScore = true;
  }

  set submitScore(value) {
    this._submitScore = value;
  }

  get submitScore() {
    return this._submitScore;
  }

  async _setScore(user) {
    if (this._score !== 0 && user.length > 0) {
      try {
        const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this._gameID}/scores/`, {
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
        this._submitScore = true;
      }
    } else {
      this._submitScore = true;
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

  displayEnterScore() {
    $('.score').html(`Your score: ${this._score}`);
    $('#player-name').val('');
    $('.enter-score').addClass('display-enter-score');
  }

  hideEnterScore() { $('.enter-score').removeClass('display-enter-score') }
}