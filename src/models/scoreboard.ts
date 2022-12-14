import type { DiceHand } from "../models/hand";
import type { EvilPatterns, LowerPatterns, Patterns, SpecialPatterns, UpperPatterns } from "../models/patterns";
import { HAND_PATTERNS, PatternGuard } from "../models/patterns";
import type { Play } from "../models/plays";
import {
    AllEven,
    AllOdd,
    Bomb,
    Bowser,
    Casino,
    CountPlay, DirtyStraight,
    FakeYahtzee,
    FourStars,
    FourTowers,
    FullHouse,
    HeavenlyGrace,
    HighCard,
    HighStraight,
    LowestCard,
    LowStraight,
    OceanBlue,
    Pair,
    Poker,
    PowerMichi,
    Reaper,
    Satan,
    Skip,
    SmallMichi,
    SumChoice,
    ThreeOfAKind,
    Trader,
    TripleOilMonkey,
    Twins,
    TwoPairs,
    Yahtzee
} from "../models/plays";


export class ScoreCard {
    upperSection: Section = new UpperSection();
    lowerSection: Section = new LowerSection();
    specialSection: Section = new SpecialSection();
    evilSection: Section = new EvilSection();

    getPlay(pattern: Patterns): Play {
        if (PatternGuard.isUpperPattern(pattern)) {
            return (<UpperSection>this.upperSection)[<UpperPatterns>pattern];
        }
        else if (PatternGuard.isLowerPattern(pattern)) {
            return (<LowerSection>this.lowerSection)[<LowerPatterns>pattern];
        }
        else if (PatternGuard.isSpecialPattern(pattern)) {
            return (<SpecialSection>this.specialSection)[<SpecialPatterns>pattern];
        }
        else {
            return (<EvilSection>this.evilSection)[<EvilPatterns>pattern];
        }
    }

    nonZeroPlayAvailable(hand: DiceHand): boolean {
        return this.upperSection.existsValidPlay(hand)
            || this.lowerSection.existsValidPlay(hand)
            || this.specialSection.existsValidPlay(hand)
            || this.evilSection.existsValidPlay(hand);
    }

    totalScore(): number {
        return this.upperSection.totalScore()
            + this.lowerSection.totalScore()
            + this.specialSection.totalScore()
            + this.evilSection.totalScore();
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
    pairs: Play = new Pair();
    two_pairs: Play = new TwoPairs();
    triple: Play = new ThreeOfAKind();
    full_house: Play = new FullHouse();
    dirty: Play = new DirtyStraight();
    poker: Play = new Poker();
    low_straight: Play = new LowStraight();
    high_straight: Play = new HighStraight();
    yahtzee: Play = new Yahtzee();

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
        return 100 <= this.flatScore() ? 50 : 0;
    }

    flatScore(): number {
        let totalPoints = 0;
        HAND_PATTERNS.upper.forEach((pattern: UpperPatterns) => {
            const play: Play = this[pattern];
            totalPoints += play.points;
        });
        return totalPoints;
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
        return 63 <= this.flatScore() ? 50 : 0;
    }

    flatScore(): number {
        let totalPoints = 0;
        HAND_PATTERNS.lower.forEach((pattern: LowerPatterns) => {
            const play: Play = this[pattern];
            totalPoints += play.points;
        });
        return totalPoints;
    }
}

export class SpecialSection extends Section {
    high_card: Play = new HighCard();
    small_michi: Play = new SmallMichi();
    casino: Play = new Casino();
    all_odd: Play = new AllOdd();
    all_even: Play = new AllEven();
    power_michi: Play = new PowerMichi();
    four_towers: Play = new FourTowers();
    triple_oil_monkey: Play = new TripleOilMonkey();
    ocean_blue: Play = new OceanBlue();
    heavenly_grace: Play = new HeavenlyGrace();
    twins: Play = new Twins();
    fake_yahtzee: Play = new FakeYahtzee();
    four_stars: Play = new FourStars();
    satan: Play = new Satan();


    bonus(): number {
        return 250 <= this.flatScore() ? 50 : 0;
    }

    existsValidPlay(hand: DiceHand): boolean {
        let validPlay: boolean = false;
        HAND_PATTERNS.special.forEach((pattern: SpecialPatterns) => {
            const play: Play = this[pattern];
            if (!play.played && play.score(hand) !== 0) {
                validPlay = true;
            }
        });
        return validPlay;
    }

    flatScore(): number {
        let totalPoints = 0;
        HAND_PATTERNS.special.forEach((pattern: SpecialPatterns) => {
           const play: Play = this[pattern];
           totalPoints += play.points;
        });
        return totalPoints;
    }
}

export class EvilSection extends Section {
    skip: Play = new Skip();
    lowest_card: Play = new LowestCard();
    koopa: Play = new Bowser(1);
    bowser: Play = new Bowser(2);
    trader: Play = new Trader();
    big_bowser: Play = new Bowser(3);
    reaper: Play = new Reaper();
    bomb: Play = new Bomb();

    bonus(): number {
       let bowserBonus: number = 0;
       bowserBonus += this.koopa.points;
       bowserBonus += this.bowser.points;
       bowserBonus += this.big_bowser.points;
       if (bowserBonus <= -50) {
           return -50;
       }
       return 0;
    }

    existsValidPlay(hand: DiceHand): boolean {
        let validPlay: boolean = false;
        HAND_PATTERNS.evil.forEach((pattern: EvilPatterns) => {
            const play: Play = this[pattern];
            if (!play.played && play.score(hand) !== 0) {
                validPlay = true;
            }
        });
        return validPlay;
    }

    flatScore(): number {
        let totalPoints = 0;
        HAND_PATTERNS.evil.forEach((pattern: EvilPatterns) => {
            const play: Play = this[pattern];
            totalPoints += play.points;
        });
        return totalPoints;
    }
}