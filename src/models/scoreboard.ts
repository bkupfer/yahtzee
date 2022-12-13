import type {Play} from "@/models/plays";
import {
    Bowser,
    CountPlay, FakeYahtzee, FourTowers,
    FullHouse, HeavenlyGrace,
    HighCard,
    HighStraight,
    LowStraight, OceanBlue,
    Pair, Pichanga,
    Poker, PowerMichi, Satan, Skip, SmallMichi, SumChoice,
    ThreeOfAKind, TripleOilMonkey, Twins,
    TwoPairs,
    Yahtzee
} from "@/models/plays";
import type {DiceHand} from "@/models/hand";
import type {LowerPatterns, Patterns, SpecialPatterns, UpperPatterns} from "@/models/patterns";
import {HAND_PATTERNS, PatternGuard} from "@/models/patterns";


export class ScoreCard {
    upperSection: Section = new UpperSection();
    lowerSection: Section = new LowerSection();
    specialSection: Section = new SpecialSection();

    getPlay(pattern: Patterns): Play {
        if (PatternGuard.isUpperPattern(pattern)) {
            return (<UpperSection>this.upperSection)[<UpperPatterns>pattern];
        }
        else if (PatternGuard.isLowerPattern(pattern)) {
            return (<LowerSection>this.lowerSection)[<LowerPatterns>pattern];
        }
        else { // (PatternGuard.isSpecialPattern(pattern)) {
            return (<SpecialSection>this.specialSection)[<SpecialPatterns>pattern];
        }
    }

    nonZeroPlayAvailable(hand: DiceHand): boolean {
        return this.upperSection.existsValidPlay(hand)
            || this.lowerSection.existsValidPlay(hand)
            || this.specialSection.existsValidPlay(hand);
    }

    totalScore(): number {
        return this.upperSection.totalScore() + this.lowerSection.totalScore() + this.specialSection.totalScore();
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
    three_of_a_kind: Play = new ThreeOfAKind();
    full_house: Play = new FullHouse();
    low_straight: Play = new LowStraight();
    high_straight: Play = new HighStraight();
    poker: Play = new Poker();
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
        return 50 <= this.flatScore() ? 50 : 0;
    }

    flatScore(): number {
        let total_points = 0;
        total_points += this.pairs.points;
        total_points += this.two_pairs.points;
        total_points += this.three_of_a_kind.points;
        total_points += this.full_house.points;
        total_points += this.low_straight.points;
        total_points += this.high_straight.points;
        total_points += this.poker.points;
        total_points += this.yahtzee.points;
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
        total_points += this.sum_choice.points;

        return total_points;
    }
}

export class SpecialSection extends Section {
    bowser: Play = new Bowser(1);
    big_bowser: Play = new Bowser(3);
    skip: Play = new Skip();
    high_card: Play = new HighCard();
    small_michi: Play = new SmallMichi();
    pichanga: Play = new Pichanga();
    power_michi: Play = new PowerMichi();
    four_towers: Play = new FourTowers();
    triple_oil_monkey: Play = new TripleOilMonkey();
    ocean_blue: Play = new OceanBlue();
    heavenly_grace: Play = new HeavenlyGrace();
    twins: Play = new Twins();
    fake_yahtzee: Play = new FakeYahtzee();
    satan: Play = new Satan();


    bonus(): number {
        return 100 <= this.flatScore() ? 50 : 0;
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
        let total_points = 0;
        total_points += this.bowser.points;
        total_points += this.big_bowser.points;
        total_points += this.high_card.points;
        total_points += this.pichanga.points;
        total_points += this.small_michi.points;
        total_points += this.power_michi.points;
        total_points += this.heavenly_grace.points;
        total_points += this.twins.points;
        total_points += this.four_towers.points;
        total_points += this.triple_oil_monkey.points;
        total_points += this.ocean_blue.points;
        total_points += this.fake_yahtzee.points;
        total_points += this.satan.points;
        return total_points;
    }

}
