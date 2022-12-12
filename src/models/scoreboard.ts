import type {Play} from "@/models/plays";
import {
    CountPlay,
    FullHouse,
    HighCard,
    HighStraight,
    LowStraight,
    Pair,
    Poker, SumChoice,
    ThreeOfAKind,
    TwoPairs,
    Yahtzee
} from "@/models/plays";
import type {DiceHand} from "@/models/hand";


export const HAND_PATTERNS = {
    upper: ['high_card', 'pairs', 'two_pairs', 'three_of_a_kind', 'full_house', 'low_straight', 'high_straight', 'poker', 'yahtzee', 'sum_choice'],
    lower: ['aces', 'twos', 'threes', 'fours', 'fives', 'sixes'],
} as const;

export type UpperPatterns = typeof HAND_PATTERNS.upper[number];
export type LowerPatterns = typeof HAND_PATTERNS.lower[number];

export type Patterns = UpperPatterns | LowerPatterns;

function isUpperPattern(pattern: Patterns): boolean {
    // todo: there has to be a better way of doing this
    const upper: string[] = ['high_card', 'pairs', 'two_pairs', 'three_of_a_kind', 'full_house', 'low_straight', 'high_straight', 'poker', 'yahtzee', 'sum_choice'];
    return upper.includes(pattern);
}


export class ScoreCard {
    upperSection: Section = new UpperSection();
    lowerSection: Section = new LowerSection();

    getPlay(pattern: Patterns): Play {
        if (isUpperPattern(pattern)) {
            return (<UpperSection>this.upperSection)[<UpperPatterns>pattern];
        }
        else {
            return (<LowerSection>this.lowerSection)[<LowerPatterns>pattern];
        }
    }

    nonZeroPlayAvailable(hand: DiceHand): boolean {
        return this.upperSection.existsValidPlay(hand) || this.lowerSection.existsValidPlay(hand);
    }

    totalScore(): number {
        return this.upperSection.totalScore() + this.lowerSection.totalScore();
    }
}


export abstract class Section {
    abstract bonus(): number;
    abstract flatScore(): number;
    abstract existsValidPlay(hand: DiceHand): boolean;

    totalScore(): number {
        return this.flatScore() + this.bonus();
    }
}

export class UpperSection extends Section {
    high_card: Play = new HighCard();
    pairs: Play = new Pair();
    two_pairs: Play = new TwoPairs();
    three_of_a_kind: Play = new ThreeOfAKind();
    full_house: Play = new FullHouse();
    low_straight: Play = new LowStraight();
    high_straight: Play = new HighStraight();
    poker: Play = new Poker();
    yahtzee: Play = new Yahtzee();
    sum_choice: Play = new SumChoice();

    existsValidPlay(hand: DiceHand): boolean {
        let validPlay: boolean = false;
        HAND_PATTERNS.upper.forEach((pattern: UpperPatterns) => {
            const play: Play = this[pattern];
            if (!play.played && play.score(hand) !== 0) {
                validPlay = true;
            }
        });
        return validPlay;
    }

    bonus(): number {
        return 63 <= this.flatScore() ? 50 : 0;
    }

    flatScore(): number {
        let total_points = 0;
        total_points += this.high_card.points;
        total_points += this.pairs.points;
        total_points += this.two_pairs.points;
        total_points += this.three_of_a_kind.points;
        total_points += this.full_house.points;
        total_points += this.low_straight.points;
        total_points += this.high_straight.points;
        total_points += this.poker.points;
        total_points += this.yahtzee.points;
        total_points += this.sum_choice.points;
        return total_points;
    }
}


export class LowerSection extends Section {
    aces: Play = new CountPlay(1);
    twos: Play = new CountPlay(2);
    threes: Play = new CountPlay(3);
    fours: Play = new CountPlay(4);
    fives: Play = new CountPlay(5);
    sixes: Play = new CountPlay(6);

    existsValidPlay(hand: DiceHand): boolean {
        let validPlay: boolean = false;
        HAND_PATTERNS.lower.forEach((pattern: LowerPatterns) => {
            const play: Play = this[pattern];
            if (!play.played && play.score(hand) !== 0) {
                validPlay = true;
            }
        });
        return validPlay;
    }

    bonus(): number {
        return 0;
    }

    flatScore(): number {
        let total_points = 0;
        total_points += this.aces.points;
        total_points += this.twos.points;
        total_points += this.threes.points;
        total_points += this.fours.points;
        total_points += this.fives.points;
        total_points += this.sixes.points;
        return total_points;
    }
}
