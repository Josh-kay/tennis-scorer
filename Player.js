module.exports = class Player {

    constructor(name) {
        this.name = name;
        this.gameScore = 0;
        this.matchScore = 0;
        this.setScore = 0;
    }

    getName() {
        return this.name;
    }

    getGameScore() {
        return this.gameScore;
    }

    getSetScore() {
        return this.setScore;
    }

    addGamePoint() {
        this.gameScore += 1;
    }

    resetGameScore() {
        this.gameScore = 0;
    }

    addMatchScore() {
        this.gameScore = 0;
    }

    addSetScore() {
        this.setScore += 1;
    }

    setWon() {
        this.resetGameScore();
        this.addSetScore();
    }

    setLost() {
        this.resetGameScore();
    }

};