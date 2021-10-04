const Player = require('./Player');

let player;
const PLAYER_NAME = 'PLAYER_NAME';

beforeEach(() => {
    player = new Player('PLAYER_NAME');
});

test('expect player name to be set', () => {
    expect(player.getName()).toEqual(PLAYER_NAME);
});

test('expect 0 game score', () => {
    expect(player.getGameScore()).toEqual(0);
});

test('expect 1 game score', () => {
    player.addGamePoint();
    expect(player.getGameScore()).toEqual(1);
});

test('expect 0 game score after rest', () => {
    player.addGamePoint();
    player.resetGameScore();
    expect(player.getGameScore()).toEqual(0);
});

test('expect 0 set score', () => {
    expect(player.getSetScore()).toEqual(0);
});

test('expect 1 set score', () => {
    player.addSetScore();
    expect(player.getSetScore()).toEqual(1);
});

// setWon
// setLost
