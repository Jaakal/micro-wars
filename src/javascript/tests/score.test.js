import 'jest';

import Game from '../objects/game';

let game;

beforeAll(() => {
  game = new Game();
});

test('Expect score to be zero before the start of the game', () => {
  expect(game.globals.score.getScore()).toBe(0);
});

test('Expect scoreboard to be zero before the start of the game', () => {
  expect(game.globals.score.getScoreboard()).toStrictEqual([]);
});
