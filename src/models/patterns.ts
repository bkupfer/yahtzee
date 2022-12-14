export const SECTION_PATTERN = ['upper', 'lower', 'special', 'evil'] as const;
export type SectionPatterns = typeof SECTION_PATTERN[number];

export const HAND_PATTERNS = {
    upper: [
        'pairs', 'two_pairs', 'triple', 'dirty', 'full_house' , 'poker', 'low_straight',
        'high_straight',  'yahtzee',
    ],
    lower: [
        'aces', 'twos', 'threes', 'fours', 'fives', 'sixes', 'sum_choice',
    ],
    special: [
        'high_card', 'small_michi', 'twins', 'casino', 'all_odd', 'all_even', 'heavenly_grace',
        'triple_oil_monkey', 'fake_yahtzee', 'ocean_blue', 'power_michi',
        'four_towers', 'four_stars', 'satan',
    ],
    evil: [
        'skip',
        'lowest_card',
        'trader',
        'koopa',
        'firebat',
        'bomb',
        'bowser',
        'reaper',
        'big_bowser',
    ],
} as const;

export type UpperPatterns = typeof HAND_PATTERNS.upper[number];
export type LowerPatterns = typeof HAND_PATTERNS.lower[number];
export type SpecialPatterns = typeof HAND_PATTERNS.special[number];
export type EvilPatterns = typeof HAND_PATTERNS.evil[number];

export type Patterns = UpperPatterns | LowerPatterns | SpecialPatterns | EvilPatterns;

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
    static isEvilPattern(pattern: Patterns): boolean {
        return ((<Readonly<Array<string>>>HAND_PATTERNS.evil).includes(pattern));
    }
}
