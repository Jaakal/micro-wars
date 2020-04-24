import '../../css/enter-score.scss';

import 'regenerator-runtime/runtime';

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

  async submitScore(user) {
    if (this._score !== 0 && user.length > 0) {
      try {
        await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this._gameID}/scores/`, {
          method: 'post',
          body: JSON.stringify({
            user,
            score: this._score,
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        this._updateScoreboard({ user, score: this._score });
      } catch (error) {
        // console.error(error);
      }
    }
  }

  getScore() {
    return this._score;
  }

  addToScore(score) {
    this._score += score;
  }

  setScoreToZero() {
    this._score = 0;
  }

  getScoreboard() {
    return this._scoreBoardArray;
  }

  async _populateScoreArray() {
    let response;
    let data;

    try {
      response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this._gameID}/scores/`);
      data = await response.json();

      this._scoresArray = data.result.sort(this.comparator);
      this._scoreBoardArray = this._scoresArray.slice(0, 10);
    } catch (error) {
      // console.error(error);
    }
  }

  _updateScoreboard(score) {
    this._scoresArray.push(score);
    this._scoresArray.sort(this.comparator);
    this._scoreBoardArray = this._scoresArray.slice(0, 10);
  }

  /* eslint-disable class-methods-use-this */
  comparator(user1, user2) {
    if (user1.score < user2.score) {
      return 1;
    }

    if (user1.score > user2.score) {
      return -1;
    }

    return 0;
  }
  /* eslint-enable class-methods-use-this */
}
