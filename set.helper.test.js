const SetHelper = require('./SetHelper');

test('player set won to be true 6-0', () => {
    expect(SetHelper.hasPlayerWonSet(false, 6,0)).toEqual(true);
});

test('player set won to be false 5-5', () => {
    expect(SetHelper.hasPlayerWonSet(false, 5, 5)).toEqual(false);
});

test('player set won to be true 7-6 tiebreaker', () => {
    expect(SetHelper.hasPlayerWonSet(true, 7, 6)).toEqual(true);
});

test('player set won to be false 7-6 not tiebreaker', () => {
    expect(SetHelper.hasPlayerWonSet(false, 7,6)).toEqual(false);
});
