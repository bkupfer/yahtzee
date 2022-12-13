import type {Play} from "@/models/plays";
import {
    BigMichi, Bowser,
    CountPlay, FakeYahtzee, FourTowers,
    FullHouse,
    HighCard,
    HighStraight,
    LowStraight, OceanBlue,
    Pair,
    Poker, Satan, Skip, SmallMichi, SumChoice,
    ThreeOfAKind, TripleOilMonkey,
    TwoPairs,
    Yahtzee
} from "@/models/plays";
import type {DiceHand} from "@/models/hand";


export const HAND_PATTERNS = {
    upper: ['bowser', 'big_bowser', 'skip', 'high_card', 'pairs', 'two_pairs', 'three_of_a_kind', 'full_house', 'low_straight', 'high_straight', 'poker', 'yahtzee', 'satan'],
    lower: ['aces', 'twos', 'threes', 'fours', 'fives', 'sixes', 'sum_choice', 'small_michi', 'big_michi', 'four_towers', 'triple_oil_monkey', 'ocean_blue', 'fake_yahtzee'],
} as const;

export type UpperPatterns = typeof HAND_PATTERNS.upper[number];
export type LowerPatterns = typeof HAND_PATTERNS.lower[number];

export type Patterns = UpperPatterns | LowerPatterns;

function isUpperPattern(pattern: Patterns): boolean {
    // todo: there has to be a better way of doing this
    const upper: string[] = ['bowser', 'big_bowser', 'skip', 'high_card', 'pairs', 'two_pairs', 'three_of_a_kind', 'full_house', 'low_straight', 'high_straight', 'poker', 'yahtzee', 'satan'];
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
    skip: Play = new Skip();
    high_card: Play = new HighCard();
    pairs: Play = new Pair();
    two_pairs: Play = new TwoPairs();
    three_of_a_kind: Play = new ThreeOfAKind();
    full_house: Play = new FullHouse();
    low_straight: Play = new LowStraight();
    high_straight: Play = new HighStraight();
    poker: Play = new Poker();
    yahtzee: Play = new Yahtzee();
    satan: Play = new Satan();
    bowser: Play = new Bowser(1);
    big_bowser: Play = new Bowser(3);

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
        return 150 <= this.flatScore() ? 50 : 0;
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
        total_points += this.satan.points;
        total_points += this.bowser.points;
        total_points += this.big_bowser.points;
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
    sum_choice: Play = new SumChoice();
    small_michi: Play = new SmallMichi();
    big_michi: Play = new BigMichi();
    four_towers: Play = new FourTowers();
    triple_oil_monkey: Play = new TripleOilMonkey();
    ocean_blue: Play = new OceanBlue();
    fake_yahtzee: Play = new FakeYahtzee();

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
        return 150 <= this.flatScore() ? 50 : 0;
    }

    flatScore(): number {
        let total_points = 0;
        total_points += this.aces.points;
        total_points += this.twos.points;
        total_points += this.threes.points;
        total_points += this.fours.points;
        total_points += this.fives.points;
        total_points += this.sixes.points;
        total_points += this.sum_choice.points;
        total_points += this.small_michi.points;
        total_points += this.big_michi.points;
        total_points += this.four_towers.points;
        total_points += this.triple_oil_monkey.points;
        total_points += this.ocean_blue.points;
        total_points += this.fake_yahtzee.points;
        return total_points;
    }
}
