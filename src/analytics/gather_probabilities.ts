import type {Play} from "../models/plays";
import {FakeYahtzee, FourStars, FourTowers, Satan, TripleOilMonkey, Yahtzee} from "../models/plays";
import {randomHand} from "../models/hand";
import {HAND_PATTERNS, SECTION_PATTERN} from "../models/patterns";
import type {SectionPatterns} from "../models/patterns";
import {ScoreCard} from "../models/scoreboard";



class Stats {
    iterations: number = 0;
    hit: number = 0;
    aggregatedScore: number = 0;

    register(score: number) {
        this.iterations += 1;
        if (score) {
            this.hit += 1;
            this.aggregatedScore += score;
        }
    }

    hitProbability(): number {
        return 100 * this.hit / this.iterations;
    }
    avgScore(): number {
        return this.aggregatedScore / this.iterations;
    }

    report(name: string): void {
        console.log("- " + name + ":");
        console.log('\thit rate: ' + this.hitProbability() + ' %');
        console.log('\tcurrent avg score: ', this.avgScore());
    }

}

function analyze(name: string, play: Play): Stats {
    const ITERATIONS: number = 5+000000;
    const stats = new Stats();
    for (let i = 0; i < ITERATIONS; i ++) {
        const randHand = randomHand();
        const score = play.score(randHand);
        stats.register(score);
    }
    stats.report(name);
    return stats;
}

console.log('-- analytics --');
for (const section of SECTION_PATTERN) {
    console.log('== SECTION', section);
    for (const pattern of HAND_PATTERNS[<SectionPatterns>section]) {
        const scoreboard = new ScoreCard();
        analyze(pattern, scoreboard.getPlay(pattern));
    }
}
