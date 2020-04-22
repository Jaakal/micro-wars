export default class Scoreboard {
  constructor() {
    this._gameID = 'AW0l8QnPfE7JDizD3qMm';
    this._scoreArray = [];
    this._scoreBoardArray = [];

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

      this._scoreArray = data.result.sort(this._comparator);
      this._scoreBoardArray = this._scoreArray.slice(0, 10);
    } catch (error) {
      console.error(error);
    }
  }

  getScoreboard() {
    return this._scoreBoardArray;
  }

  _updateScoreboard(score) {
    this._scoreArray.push(score);
    this._scoreArray.sort(this._comparator);
    this._scoreBoardArray = this._scoreArray.slice(0, 10);
  }

  async setScore(user, score) {
    try {
      await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this._gameID}/scores/`, {
        method: 'post',
        body: JSON.stringify({
          user: user,
          score: score
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });

      this._updateScoreboard({user: user, score: score});
    } catch (error) {
      console.error(error);
    }
  }
}