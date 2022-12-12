import type {DiceHand} from "@/models/hand";


export interface Play {
  played: boolean; // open - played/discarded
  points: number;

  play(hand: DiceHand): void;
  score(hand: DiceHand): number;
}

abstract class AbsPlay implements Play {
    played: boolean = false;
    points: number = 0;

    play(hand: DiceHand): void {
        this.points = this.score(hand);
        this.played = true;
    }
    abstract score(hand: DiceHand): number;
}

export class CountPlay extends AbsPlay {
    kind: number;

    constructor(only: number) {
        super();
        this.kind = only;
    }

    score(hand: DiceHand): number {
        let score = 0;
        for (const dice of hand.dices) {
            if (dice === this.kind) {
                score += this.kind;
            }
        }
        return score;
    }
}

export class HighCard extends AbsPlay {
    score(hand: DiceHand): number {
        return Math.max(...hand.dices);
    }
}

function countDices(hand: DiceHand): {[dice: number]: number} {
    const count: {[dice: number]: number} = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0};
    for (const dice of hand.dices) {
        count[dice] += 1;
    }
    return count;
}

export class Pair extends AbsPlay {
    score(hand: DiceHand): number {
        const count = countDices(hand);
        for (let i = 6; 1 <= i; i --) {
            if (2 <= count[i]) {
                return 12;
            }
        }
        return 0;
    }
}

export class TwoPairs extends AbsPlay {
    score(hand: DiceHand): number {
        const count = countDices(hand);
        let firstPair = false;
        let secondPair = false;
        for (let i = 6; 1 <= i; i --) {
            if (2 <= count[i]) {
                if (!firstPair) {
                    firstPair = true;
                }
                else {
                    secondPair = true;
                    break;
                }
            }
        }
        if (firstPair && secondPair) {
            return 22;
        }
        return 0;
    }
}

export class ThreeOfAKind extends AbsPlay {
    score(hand: DiceHand): number {
        const count = countDices(hand);
        for (let i = 6; 1 <= i; i --) {
            if (3 <= count[i]) {
                return 18;
            }
        }
        return 0;
    }
}

export class FullHouse extends AbsPlay {
    score(hand: DiceHand): number {
        const count = countDices(hand);
        let pair = false;
        let triple = false;
        for (let i = 6; 1 <= i; i --) {
            if (count[i] === 2) {
                pair = true;
            }
            if (count[i] === 3) {
                triple = true;
            }
        }
        if (pair && triple) {
            return 28;
        }
        return 0;
    }
}

export class LowStraight extends AbsPlay {
    score(hand: DiceHand): number {
        for (let i = 1; i <= 5; i ++) {
            if (!hand.dices.includes(i)) {
                return 0;
            }
        }
        return 15;
    }
}

export class HighStraight extends AbsPlay {
    score(hand: DiceHand): number {
        for (let i = 2; i <= 6; i ++) {
            if (!hand.dices.includes(i)) {
                return 0;
            }
        }
        return 20;
    }
}


export class TripleOilMonkey extends AbsPlay {
    score(hand: DiceHand): number {
        const count = countDices(hand);
        let tripleOil = true;
        let oilBonus = 0;
        for (let i = 1; i <= 6; i ++) {
            if (i === 3) {
                if (count[i] !== 3) {
                    tripleOil = false;
                }
            }
            else {
                if (count[i] !== 0 && count[i] === 1) {
                    tripleOil = false;
                }
                oilBonus += i;
            }
        }
        return tripleOil ? 18 + oilBonus : 0;
    }
}

export class Poker extends AbsPlay {
    score(hand: DiceHand): number {
        const count = countDices(hand);
        for (let i = 6; 1 <= i; i --) {
            if (4 <= count[i]) {
                return 24;
            }
        }
        return 0;
    }
}

export class Yahtzee extends AbsPlay {
    score(hand: DiceHand): number {
        const count = countDices(hand);
        for (let i = 6; 1 <= i; i --) {
            if (5 <= count[i]) {
                return 50;
            }
        }
        return 0;
    }
}

export class SumChoice extends AbsPlay {
    score(hand: DiceHand): number {
        return hand.dices.reduce((value, aggregator) => value + aggregator);
    }
}
