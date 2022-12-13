export class DiceHand {
    dices: Array<number>;

    constructor(rolls: Array<number>) {
        this.dices = rolls;
    }

    played(): boolean {
        return this.dices.every((dice: number) => dice !== 0);
    }

    sum(): number {
        return this.dices.reduce((sum, dice) => sum + dice, 0);
    }
}

export function randomDice(): number {
    return Math.floor(6 * (Math.random() * 10) / 10) + 1;
}

export function randomHand(): DiceHand {
    const rolls: Array<number> = [];
    for (let dice = 0; dice < 5; dice += 1) {
        rolls.push(randomDice());
    }
    return new DiceHand(rolls);
}
