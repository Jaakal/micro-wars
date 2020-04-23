import Game from '../objects/game';

let game;

beforeAll(() => {
  game = new Game();
});

test('Expect musicOn to be true before the start of the game', () => {
  expect(game.globals.model.musicOn).toBe(true);
});

test('Expect soundOn to be true before the start of the game', () => {
  expect(game.globals.model.soundOn).toBe(true);
});

test('Expect bgMusicPlaying to be false before the start of the game', () => {
  expect(game.globals.model.bgMusicPlaying).toBe(false);
});

test('Expect planetsArray to be undefined before the start of the game', () => {
  expect(game.globals.model.getPlanetsArray).toBe(undefined);
});