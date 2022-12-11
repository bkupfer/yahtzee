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


export const HAND_PATTERNS: {[section: string]: string[]} = {
    upper: ['high_card', 'pairs', 'two_pairs', 'three_of_a_kind', 'full_house', 'low_straight', 'high_straight', 'poker', 'yahtzee', 'sum_choice'],
    lower: ['aces', 'twos', 'threes', 'fours', 'fives', 'sixes'],
};


export class ScoreCard {
    upperSection: Section = new UpperSection();
    lowerSection: Section = new LowerSection();

    totalScore(): number {
        return this.upperSection.totalScore() + this.lowerSection.totalScore();
    }
}


abstract class Section {
    abstract bonus(): number;
    abstract flatScore(): number;

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

    bonus(): number {
        return 63 <= this.flatScore() ? 35 : 0;
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

    bonus(): number {
        return 50 <= this.flatScore() ? 50 : 0;
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
