import type {Play} from "../models/plays";
import {randomHand} from "../models/hand";
import type {SectionPatterns} from "../models/patterns";
import {HAND_PATTERNS, SECTION_PATTERN} from "../models/patterns";
import {ScoreCard} from "../models/scoreboard";

// @ts-ignore
import * as fs from 'fs';


const ITERATIONS: number = 1000000;
const RETHROWS: number = 3;

class Stats {
    play: string;
    iterations: number = 0;
    hit: number = 0;
    aggregatedScore: number = 0;

    constructor(name: string) {
        this.play = name;
    }

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
        return this.aggregatedScore / this.hit;
    }

    report(): void {
        console.log("- " + this.play + ":");
        console.log('\thit probability: ', this.hitProbability(), ' %');
        console.log('\tavg score: ', Math.round(this.avgScore()));
    }

    to_csv(): string {
        return this.play + "," + this.hitProbability() + "," + this.avgScore() + ",\n";
    }

}

function analyze(name: string, play: Play): Stats {
    const stats = new Stats(name);
    for (let i = 0; i < ITERATIONS; i ++) {
        let bestScore = -ITERATIONS;
        for (let throws = 0; throws < RETHROWS; throws += 1) {
            const randHand = randomHand();
            const score = play.score(randHand);
            if (bestScore < score) {
                bestScore = score;
            }
        }
        stats.register(bestScore);
    }
    return stats;
}

function gatherPlaysAnalytics(verbose: boolean): {[section: string]: Stats[]} {
    if (verbose) {
        console.log('-- Analytics --');
        console.log(':: # iterations: ' + ITERATIONS);
        console.log(':: # rethrows:   ' + RETHROWS);
    }
    const sectionStats: {[section: string]: Stats[]} = {};
    for (const section of SECTION_PATTERN) {
        const stats: Stats[] = [];
        for (const pattern of HAND_PATTERNS[<SectionPatterns>section]) {
            const scoreboard = new ScoreCard();
            const analysis = analyze(pattern, scoreboard.getPlay(pattern));
            stats.push(analysis);
        }
        stats.sort((a: Stats, b: Stats): number => {
            return b.hitProbability() - a.hitProbability();
        });
        if (verbose) {
            console.log('== SECTION ==', section);
            stats.forEach((stat) => {
                stat.report();
            });
        }
        sectionStats[section] = stats;
    }
    return sectionStats;
}

function exportStatsCsv(filename: string, stats: {[section: string]: Stats[]}, verbose: boolean): void {
    const headers = 'play_name,probability,average_score,\n';
    fs.open(filename, "w", (err: any, fd: any)=>{
        if (!err) {
            fs.write(fd, headers, () => (err: any, bytes: number) => {
                if (verbose) {
                    if (!err) {
                        console.log(bytes + ' bytes written');
                    } else {
                        console.log(err.message);
                    }
                }
            });
            for (const section of SECTION_PATTERN) {
                for (const stat of stats[section]) {
                    const text: string = stat.to_csv();
                    fs.write(fd, text, (err: any, bytes: number) => {
                        if (verbose) {
                            if (!err) {
                                console.log(bytes + ' bytes written');
                            } else {
                                console.log(err.message);
                            }
                        }
                    });
                }
            }
        } else {
            if (verbose) {
                console.log(err.message);
            }
        }
    });

}

const stats = gatherPlaysAnalytics(true);
const fileName = './src/analytics/results/yahtzee_stats.csv';
exportStatsCsv(fileName, stats, false);
