export default class Model {
  constructor() {
    this._soundOn = true;
    this._musicOn = true;
    this._bgMusicPlaying = false;
    this._planetsArrayStatic = undefined;
    this._planetsArrayActive = undefined;
  }

  set musicOn(value) {
    this._musicOn = value;
  }

  get musicOn() {
    return this._musicOn;
  }

  set soundOn(value) {
    this._soundOn = value;
  }

  get soundOn() {
    return this._soundOn;
  }

  set bgMusicPlaying(value) {
    this._bgMusicPlaying = value;
  }

  get bgMusicPlaying() {
    return this._bgMusicPlaying;
  }

  set planetsArray(planetsArray) {
    this._planetsArrayStatic = planetsArray;
    this._planetsArrayActive = planetsArray.slice();
  }

  get planetsArray() {
    if (this._planetsArrayStatic === undefined) {
      return undefined;
    } else if (this._planetsArrayActive.length === 0) {
      this._planetsArrayActive = this._planetsArrayStatic.slice();
    }

    const planetIndex = Phaser.Math.Between(0, this._planetsArrayActive.length - 1);
    const planetString = this._planetsArrayActive[planetIndex];
    this._planetsArrayActive.splice(planetIndex, 1);

    return planetString;
  }

  playSound(sound) {
    if (this._soundOn) {
      sound.play();
    }
  }
}