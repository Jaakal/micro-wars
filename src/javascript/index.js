import '../css/reset.css';
import '../css/style.scss';

import 'phaser';
import 'regenerator-runtime/runtime';

import config from './config/config';
import Scoreboard from './objects/scoreboard';
import Model from './model';
import PreloaderScene from './scenes/preloader';
import MainMenu from './scenes/main-menu';
import Options from './scenes/options';
import Leaderboard from './scenes/leaderboard';
import LevelOne from './scenes/level-one';
import GameOver from './scenes/game-over';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    const model = new Model();
    const scoreboard = new Scoreboard();
    this.globals = { model, scoreboard, bgMusic: null };
    this.scene.add('PreloaderScene', PreloaderScene);
    this.scene.add('MainMenu', MainMenu);
    this.scene.add('Options', Options);
    this.scene.add('Leaderboard', Leaderboard);
    this.scene.add('LevelOne', LevelOne);
    this.scene.add('GameOver', GameOver);
    this.scene.start('Preloader');
  }
}

window.game = new Game();
