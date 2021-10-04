const Match = require('./Match');

const PLAYER_ONE = 'p1';
const PLAYER_TWO = 'p2';
let match;

function winMatchesByName(match, name, gameCount) {
    for (let i = 0; i < gameCount; i++) {
        match.pointWonBy(name);
    }
}

beforeEach(() => {
    match = new Match(PLAYER_ONE, PLAYER_TWO);
});

test('expect empty score', () => {
    expect(match.score()).toEqual('0-0, 0-0');
});

test('expect 15-15 game score', () => {
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_TWO);
    expect(match.score()).toEqual('0-0, 15-15');
});

test('expect 40-15 game score', () => {
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_TWO);
    expect(match.score()).toEqual('0-0, 40-15');
});

test('expect 30-30 game score', () => {
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_TWO);
    match.pointWonBy(PLAYER_TWO);
    expect(match.score()).toEqual('0-0, 30-30');
});

test('expect Deuce game score', () => {
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_TWO);
    match.pointWonBy(PLAYER_TWO);
    match.pointWonBy(PLAYER_TWO);
    expect(match.score()).toEqual('0-0, Deuce');
});

test('expect Deuce game score after extended games', () => {
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_TWO);
    match.pointWonBy(PLAYER_TWO);
    match.pointWonBy(PLAYER_TWO);
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_TWO);
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_TWO);
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_TWO);
    expect(match.score()).toEqual('0-0, Deuce');
});

test('expect Advantage Player one game score', () => {
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_TWO);
    match.pointWonBy(PLAYER_TWO);
    match.pointWonBy(PLAYER_TWO);
    match.pointWonBy(PLAYER_ONE);
    expect(match.score()).toEqual(`0-0, Advantage ${PLAYER_ONE}`);
});

test('expect 1-0, 0-0 game score after set win through advantage', () => {
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_TWO);
    match.pointWonBy(PLAYER_TWO);
    match.pointWonBy(PLAYER_TWO);
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_ONE);
    expect(match.score()).toEqual('1-0, 0-0');
});

test('expect 1-0, 0-0 game score after set win', () => {
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_ONE);
    match.pointWonBy(PLAYER_ONE);
    expect(match.score()).toEqual('1-0, 0-0');
});

test('expect player 1 match win 6-4', () => {
    winMatchesByName(match, PLAYER_TWO, 4 * 4);
    winMatchesByName(match, PLAYER_ONE, 4 * 6);
    expect(match.score()).toEqual(`Match Won By ${PLAYER_ONE}, 6-4`);
});

test('expect Match won by player 2 after tie break, 7-6', () => {
    winMatchesByName(match, PLAYER_ONE, 4 * 5);
    winMatchesByName(match, PLAYER_TWO, 4 * 6);
    winMatchesByName(match, PLAYER_ONE, 4);


    winMatchesByName(match, PLAYER_ONE, 6);
    winMatchesByName(match, PLAYER_TWO, 6);
    winMatchesByName(match, PLAYER_ONE, 2);
    expect(match.score()).toEqual(`Match Won By ${PLAYER_ONE}, 7-6`);
});

test('expect Match won by player 2 after tie break, 6-7', () => {
    winMatchesByName(match, PLAYER_ONE, 4 * 5);
    winMatchesByName(match, PLAYER_TWO, 4 * 6);
    winMatchesByName(match, PLAYER_ONE, 4);

    winMatchesByName(match, PLAYER_TWO, 7);
    expect(match.score()).toEqual(`Match Won By ${PLAYER_TWO}, 6-7`);
});