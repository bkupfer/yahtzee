
const randomDiceRoll = (): number[] => {
    return [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()];
}

export function formatPattern(pattern: string): string {
    const readable = pattern.replace(/_/g, ' ');
    return readable[0].toUpperCase() + readable.substring(1).toLowerCase();
}
