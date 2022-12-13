"use strict";
exports.__esModule = true;
exports.randomHand = exports.randomDice = exports.DiceHand = void 0;
var DiceHand = /** @class */ (function () {
    function DiceHand(rolls) {
        this.dices = rolls;
    }
    DiceHand.prototype.played = function () {
        return this.dices.every(function (dice) { return dice !== 0; });
    };
    return DiceHand;
}());
exports.DiceHand = DiceHand;
function randomDice() {
    return Math.floor(6 * (Math.random() * 10) / 10) + 1;
}
exports.randomDice = randomDice;
function randomHand() {
    var rolls = [];
    for (var dice = 0; dice < 5; dice += 1) {
        rolls.push(randomDice());
    }
    return new DiceHand(rolls);
}
exports.randomHand = randomHand;
