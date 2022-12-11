import {ScoreCard} from "@/models/scoreboard";


export class Player {
    id: string;
    score: ScoreCard = new ScoreCard();

    constructor(name: string) {
        this.id = name;
    }
}

