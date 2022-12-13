import { ScoreCard } from "@/models/scoreboard";


export class Player {
    id: string;
    score: ScoreCard = new ScoreCard();
    color: string;

    constructor(name: string, colorIdx: number) {
        this.id = name;
        this.color = playerColor(colorIdx);
    }
}

const PLAYER_COLORS: string[] = [
    '#FFA71A',
    '#1391f8',
    '#27f82b',
    '#9549fd',
    '#f32a2a',
    '#f1d70a',
    '#0718bb',
    '#ca35ef',
];

export function playerColor(player: number): string {
    return PLAYER_COLORS[player];
}