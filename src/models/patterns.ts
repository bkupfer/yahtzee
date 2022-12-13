export const HAND_PATTERNS = {
    upper: [
        'pairs', 'two_pairs', 'three_of_a_kind', 'full_house', 'low_straight', 'high_straight', 'poker', 'yahtzee',
    ],
    lower: [
        'aces', 'twos', 'threes', 'fours', 'fives', 'sixes', 'sum_choice',
    ],
    special: [
        'bowser', 'big_bowser', 'skip', 'high_card', 'pichanga', 'twins', 'small_michi', 'heavenly_grace', 'ocean_blue',
        'power_michi', 'triple_oil_monkey', 'fake_yahtzee', 'four_towers', 'satan',
    ],
} as const;

export type UpperPatterns = typeof HAND_PATTERNS.upper[number];
export type LowerPatterns = typeof HAND_PATTERNS.lower[number];
export type SpecialPatterns = typeof HAND_PATTERNS.special[number];

export type Patterns = UpperPatterns | LowerPatterns | SpecialPatterns;

export class PatternGuard {
    static isUpperPattern(pattern: Patterns): boolean {
        return ((<Readonly<Array<string>>>HAND_PATTERNS.upper).includes(pattern));
    }
    static isLowerPattern(pattern: Patterns): boolean {
        return ((<Readonly<Array<string>>>HAND_PATTERNS.lower).includes(pattern));
    }
    static isSpecialPattern(pattern: Patterns): boolean {
        return ((<Readonly<Array<string>>>HAND_PATTERNS.special).includes(pattern));
    }
}