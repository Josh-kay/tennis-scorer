const Player = require('./Player.js');
const { hasPlayerWonSet } = require('./SetHelper.js');
const TIE_BREAK_SETS = 6;
const MIN_SET_WINS_TIE_BREAK = 7;
const MIN_SET_WINS_STANDARD = 6;
const MIN_SET_DIFFERENCE_STANDARD = 1;

module.exports = class Match {

    constructor(playerOneName, playerTwoName) {
        this.playerOne = new Player(playerOneName);
        this.playerTwo = new Player(playerTwoName);
    }

    testStartTieBreaker(setA, setB) {
        this.isTieBreaker = this.isTieBreaker || (setA === TIE_BREAK_SETS && setB === TIE_BREAK_SETS);
    }

    getPlayers(playerName) {
        if (playerName === this.playerOne.getName()) {
            return {
                winningPlayer: this.playerOne,
                losingPlayer: this.playerTwo
            };
        }
        return {
            winningPlayer: this.playerTwo,
            losingPlayer: this.playerOne
        };
    }

    isMatchComplete(setA, setB) {
        return ((!this.isTieBreaker && (setA >= MIN_SET_WINS_STANDARD && setA > setB + MIN_SET_DIFFERENCE_STANDARD)) ||
                (this.isTieBreaker && (setA >= MIN_SET_WINS_TIE_BREAK && setA > setB)));
    }

    testMatchComplete(setA, setB, winner) {
        if (this.isMatchComplete(setA, setB)) {
            this.matchWonBy = winner.getName();
        }
    }

    testSetComplete(winningPlayer, losingPlayer) {
        if (hasPlayerWonSet(this.isTieBreaker, winningPlayer.getGameScore(), losingPlayer.getGameScore())) {
            winningPlayer.setWon();
            losingPlayer.setLost();
        }
    }

    addPlayerGamePoint(player) {
        player.addGamePoint();
    }

    pointWonBy(playerName) {
        if (this.matchWonBy) {
            return;
        }
        const { winningPlayer, losingPlayer } = this.getPlayers(playerName);
        this.addPlayerGamePoint(winningPlayer);
        this.testSetComplete(winningPlayer, losingPlayer);
        this.testStartTieBreaker(winningPlayer.getSetScore(), losingPlayer.getSetScore());
        this.testMatchComplete(winningPlayer.getSetScore(), losingPlayer.getSetScore(), winningPlayer);
    }

    getSetScore() {
        const playerOneScore = this.playerOne.getSetScore();
        const playerTwoScore = this.playerTwo.getSetScore();
        return `${playerOneScore}-${playerTwoScore}`;
    }

    getGameScoreReadable(score) {
        if (this.isTieBreaker) {
            return score;
        }
        switch (score) {
            case 0:
                return '0';
            case 1:
                return '15';
            case 2:
                return '30';
            case 3:
                return '40';
            default:
                return '0';
        }
    }

    getGameScore() {
        const playerOneSetScore = this.playerOne.getGameScore();
        const playerTwoSetScore = this.playerTwo.getGameScore();
        if (playerOneSetScore >= 3 && playerTwoSetScore >= 3) {

            if (playerOneSetScore === playerTwoSetScore) {
                return 'Deuce';
            }

            if (playerOneSetScore > playerTwoSetScore) {
                return `Advantage ${this.playerOne.getName()}`;
            }

            if (playerTwoSetScore > playerOneSetScore) {
                return `Advantage ${this.playerTwo.getName()}`;
            }
        }
        const playerOneReadableScore = this.getGameScoreReadable(playerOneSetScore);
        const playerTwoReadableScore = this.getGameScoreReadable(playerTwoSetScore);
        return `${playerOneReadableScore}-${playerTwoReadableScore}`;
    }

    score() {
        if (this.matchWonBy) {
            return `Match Won By ${this.matchWonBy}, ${this.getSetScore()}`;
        }
        return `${this.getSetScore()}, ${this.getGameScore()}`;
    }
};