const MIN_GAME_POINTS = 4;
const MIN_GAME_POINTS_DIFFERENCE = 1;
const MIN_TIEBREAK_POINTS = 7;

function hasPlayerWonTieBreaker(scoreA, scoreB) {
    return (scoreA >= MIN_TIEBREAK_POINTS && scoreA > scoreB);
}

function hasPlayerWonSet(isTieBreaker, scoreA, scoreB) {
    if (isTieBreaker) {
        return hasPlayerWonTieBreaker(scoreA, scoreB);
    }
    return (scoreA >= MIN_GAME_POINTS && scoreA > scoreB + MIN_GAME_POINTS_DIFFERENCE);
}

module.exports = {
    hasPlayerWonSet
};