"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.FourStars = exports.Bomb = exports.Reaper = exports.LowestCard = exports.Twins = exports.Casino = exports.HeavenlyGrace = exports.SumChoice = exports.OceanBlue = exports.FakeYahtzee = exports.FourTowers = exports.PowerMichi = exports.SmallMichi = exports.Trader = exports.Bowser = exports.Satan = exports.Yahtzee = exports.Poker = exports.TripleOilMonkey = exports.HighStraight = exports.LowStraight = exports.FullHouse = exports.ThreeOfAKind = exports.TwoPairs = exports.Pair = exports.HighCard = exports.Skip = exports.CountPlay = void 0;
var AbsPlay = /** @class */ (function () {
    function AbsPlay() {
        this.played = false;
        this.points = 0;
    }
    AbsPlay.prototype.play = function (hand) {
        this.points = this.score(hand);
        this.played = true;
    };
    return AbsPlay;
}());
var CountPlay = /** @class */ (function (_super) {
    __extends(CountPlay, _super);
    function CountPlay(only) {
        var _this = _super.call(this) || this;
        _this.kind = only;
        return _this;
    }
    CountPlay.prototype.score = function (hand) {
        var score = 0;
        for (var _i = 0, _a = hand.dices; _i < _a.length; _i++) {
            var dice = _a[_i];
            if (dice === this.kind) {
                score += this.kind;
            }
        }
        return score;
    };
    return CountPlay;
}(AbsPlay));
exports.CountPlay = CountPlay;
var Skip = /** @class */ (function (_super) {
    __extends(Skip, _super);
    function Skip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Skip.prototype.score = function (hand) {
        if (hand.played()) {
            return -1;
        }
        return 0;
    };
    return Skip;
}(AbsPlay));
exports.Skip = Skip;
var HighCard = /** @class */ (function (_super) {
    __extends(HighCard, _super);
    function HighCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HighCard.prototype.score = function (hand) {
        return Math.max.apply(Math, hand.dices);
    };
    return HighCard;
}(AbsPlay));
exports.HighCard = HighCard;
function countDices(hand) {
    var count = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    for (var _i = 0, _a = hand.dices; _i < _a.length; _i++) {
        var dice = _a[_i];
        count[dice] += 1;
    }
    return count;
}
var Pair = /** @class */ (function (_super) {
    __extends(Pair, _super);
    function Pair() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pair.prototype.score = function (hand) {
        var count = countDices(hand);
        for (var i = 6; 1 <= i; i--) {
            if (2 <= count[i]) {
                return 12;
            }
        }
        return 0;
    };
    return Pair;
}(AbsPlay));
exports.Pair = Pair;
var TwoPairs = /** @class */ (function (_super) {
    __extends(TwoPairs, _super);
    function TwoPairs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TwoPairs.prototype.score = function (hand) {
        var count = countDices(hand);
        var firstPair = false;
        var secondPair = false;
        for (var i = 6; 1 <= i; i--) {
            if (2 <= count[i]) {
                if (!firstPair) {
                    firstPair = true;
                }
                else {
                    secondPair = true;
                    break;
                }
            }
        }
        if (firstPair && secondPair) {
            return 16;
        }
        return 0;
    };
    return TwoPairs;
}(AbsPlay));
exports.TwoPairs = TwoPairs;
var ThreeOfAKind = /** @class */ (function (_super) {
    __extends(ThreeOfAKind, _super);
    function ThreeOfAKind() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ThreeOfAKind.prototype.score = function (hand) {
        var count = countDices(hand);
        for (var i = 6; 1 <= i; i--) {
            if (3 <= count[i]) {
                return 18;
            }
        }
        return 0;
    };
    return ThreeOfAKind;
}(AbsPlay));
exports.ThreeOfAKind = ThreeOfAKind;
var FullHouse = /** @class */ (function (_super) {
    __extends(FullHouse, _super);
    function FullHouse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FullHouse.prototype.score = function (hand) {
        var count = countDices(hand);
        var pair = false;
        var triple = false;
        for (var i = 6; 1 <= i; i--) {
            if (count[i] === 2) {
                pair = true;
            }
            if (count[i] === 3) {
                triple = true;
            }
        }
        if (pair && triple) {
            return 28;
        }
        return 0;
    };
    return FullHouse;
}(AbsPlay));
exports.FullHouse = FullHouse;
var LowStraight = /** @class */ (function (_super) {
    __extends(LowStraight, _super);
    function LowStraight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LowStraight.prototype.score = function (hand) {
        for (var i = 1; i <= 5; i++) {
            if (!hand.dices.includes(i)) {
                return 0;
            }
        }
        return 15;
    };
    return LowStraight;
}(AbsPlay));
exports.LowStraight = LowStraight;
var HighStraight = /** @class */ (function (_super) {
    __extends(HighStraight, _super);
    function HighStraight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HighStraight.prototype.score = function (hand) {
        for (var i = 2; i <= 6; i++) {
            if (!hand.dices.includes(i)) {
                return 0;
            }
        }
        return 20;
    };
    return HighStraight;
}(AbsPlay));
exports.HighStraight = HighStraight;
var TripleOilMonkey = /** @class */ (function (_super) {
    __extends(TripleOilMonkey, _super);
    function TripleOilMonkey() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TripleOilMonkey.prototype.score = function (hand) {
        var count = countDices(hand);
        var tripleOil = true;
        var oilBonus = 0;
        for (var i = 1; i <= 6; i++) {
            if (i === 3) {
                if (count[i] !== 3) {
                    tripleOil = false;
                }
            }
            else {
                if (2 <= count[i]) {
                    tripleOil = false;
                }
                else {
                    oilBonus += i * count[i];
                }
            }
        }
        return tripleOil ? 18 + 2 * oilBonus : 0;
    };
    return TripleOilMonkey;
}(AbsPlay));
exports.TripleOilMonkey = TripleOilMonkey;
var Poker = /** @class */ (function (_super) {
    __extends(Poker, _super);
    function Poker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Poker.prototype.score = function (hand) {
        var count = countDices(hand);
        for (var i = 6; 1 <= i; i--) {
            if (4 <= count[i]) {
                return 24;
            }
        }
        return 0;
    };
    return Poker;
}(AbsPlay));
exports.Poker = Poker;
var Yahtzee = /** @class */ (function (_super) {
    __extends(Yahtzee, _super);
    function Yahtzee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Yahtzee.prototype.score = function (hand) {
        var count = countDices(hand);
        for (var i = 6; 1 <= i; i--) {
            if (5 <= count[i]) {
                return 50;
            }
        }
        return 0;
    };
    return Yahtzee;
}(AbsPlay));
exports.Yahtzee = Yahtzee;
var Satan = /** @class */ (function (_super) {
    __extends(Satan, _super);
    function Satan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Satan.prototype.score = function (hand) {
        var count = countDices(hand);
        if (3 <= count[6]) {
            var bonus = 40 + (count[6] - 3) * 10;
            if (count[6] === 5) {
                bonus += 5;
            }
            return bonus;
        }
        return 0;
    };
    return Satan;
}(AbsPlay));
exports.Satan = Satan;
var Bowser = /** @class */ (function (_super) {
    __extends(Bowser, _super);
    function Bowser(damage) {
        var _this = _super.call(this) || this;
        _this.damage = 1;
        _this.damage = damage;
        return _this;
    }
    Bowser.prototype.score = function (hand) {
        var sum = hand.dices.reduce(function (d, s) { return d + s; }, 0);
        return -this.damage * sum;
    };
    return Bowser;
}(AbsPlay));
exports.Bowser = Bowser;
var Trader = /** @class */ (function (_super) {
    __extends(Trader, _super);
    function Trader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Trader.prototype.score = function (hand) {
        return hand.dices.reduce(function (agg, dice) {
            if (3 <= dice) {
                return agg - dice;
            }
            return agg + dice;
        }, 0);
    };
    return Trader;
}(AbsPlay));
exports.Trader = Trader;
var SmallMichi = /** @class */ (function (_super) {
    __extends(SmallMichi, _super);
    function SmallMichi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmallMichi.prototype.score = function (hand) {
        var count = countDices(hand);
        if (count[2] + count[3] + count[4] + count[5] === 5) {
            return 15;
        }
        return 0;
    };
    return SmallMichi;
}(AbsPlay));
exports.SmallMichi = SmallMichi;
var PowerMichi = /** @class */ (function (_super) {
    __extends(PowerMichi, _super);
    function PowerMichi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PowerMichi.prototype.score = function (hand) {
        var count = countDices(hand);
        if (count[1] + count[6] === 5) {
            return 25;
        }
        return 0;
    };
    return PowerMichi;
}(AbsPlay));
exports.PowerMichi = PowerMichi;
var FourTowers = /** @class */ (function (_super) {
    __extends(FourTowers, _super);
    function FourTowers() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FourTowers.prototype.score = function (hand) {
        var count = countDices(hand);
        if (count[1] === 1) {
            for (var n = 2; n <= 6; n++) {
                if (count[n] === 4) {
                    return 38;
                }
            }
        }
        return 0;
    };
    return FourTowers;
}(AbsPlay));
exports.FourTowers = FourTowers;
var FakeYahtzee = /** @class */ (function (_super) {
    __extends(FakeYahtzee, _super);
    function FakeYahtzee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FakeYahtzee.prototype.score = function (hand) {
        var count = countDices(hand);
        for (var i = 1; i <= 6; i++) {
            if (count[i] + count[1] === 5) {
                return 35;
            }
        }
        return 0;
    };
    return FakeYahtzee;
}(AbsPlay));
exports.FakeYahtzee = FakeYahtzee;
var OceanBlue = /** @class */ (function (_super) {
    __extends(OceanBlue, _super);
    function OceanBlue() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OceanBlue.prototype.score = function (hand) {
        var count = countDices(hand);
        if (count[3] === 1) {
            var all_zero = true;
            for (var i = 4; i <= 6; i++) {
                if (count[i] !== 0) {
                    all_zero = false;
                }
            }
            if (all_zero) {
                return 20;
            }
        }
        return 0;
    };
    return OceanBlue;
}(AbsPlay));
exports.OceanBlue = OceanBlue;
var SumChoice = /** @class */ (function (_super) {
    __extends(SumChoice, _super);
    function SumChoice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SumChoice.prototype.score = function (hand) {
        return hand.dices.reduce(function (value, aggregator) { return value + aggregator; });
    };
    return SumChoice;
}(AbsPlay));
exports.SumChoice = SumChoice;
var HeavenlyGrace = /** @class */ (function (_super) {
    __extends(HeavenlyGrace, _super);
    function HeavenlyGrace() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeavenlyGrace.prototype.score = function (hand) {
        var count = countDices(hand);
        if (count[1] + count[5] + count[6] === 5) {
            return 15;
        }
        return 0;
    };
    return HeavenlyGrace;
}(AbsPlay));
exports.HeavenlyGrace = HeavenlyGrace;
var Casino = /** @class */ (function (_super) {
    __extends(Casino, _super);
    function Casino() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Casino.prototype.score = function (hand) {
        var count = countDices(hand);
        var zeroesCount = 0;
        for (var i = 1; i <= 6; i++) {
            if (count[i] === 0) {
                zeroesCount += 1;
            }
        }
        return zeroesCount === 1 ? 10 : 0;
    };
    return Casino;
}(AbsPlay));
exports.Casino = Casino;
var Twins = /** @class */ (function (_super) {
    __extends(Twins, _super);
    function Twins() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Twins.prototype.score = function (hand) {
        var count = countDices(hand);
        for (var twin = 1; twin <= 6; twin++) {
            if (2 <= count[twin]) {
                var nextTwin = twin + 1;
                if (nextTwin === 7) {
                    nextTwin = 1;
                }
                if (2 <= count[nextTwin]) {
                    return 18;
                }
            }
        }
        return 0;
    };
    return Twins;
}(AbsPlay));
exports.Twins = Twins;
var LowestCard = /** @class */ (function (_super) {
    __extends(LowestCard, _super);
    function LowestCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LowestCard.prototype.score = function (hand) {
        return -Math.min.apply(Math, hand.dices);
    };
    return LowestCard;
}(AbsPlay));
exports.LowestCard = LowestCard;
var Reaper = /** @class */ (function (_super) {
    __extends(Reaper, _super);
    function Reaper() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.punishment = -40;
        return _this;
    }
    Reaper.prototype.score = function (hand) {
        if (hand.played()) {
            var count = countDices(hand);
            if (count[2] === 2) {
                return 2;
            }
            return this.punishment;
        }
        return 0;
    };
    return Reaper;
}(AbsPlay));
exports.Reaper = Reaper;
var Bomb = /** @class */ (function (_super) {
    __extends(Bomb, _super);
    function Bomb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bomb.prototype.score = function (hand) {
        if (hand.played()) {
            var count = countDices(hand);
            if (count[1] !== 0) {
                return 0;
            }
            return -20;
        }
        return 0;
    };
    return Bomb;
}(AbsPlay));
exports.Bomb = Bomb;
var FourStars = /** @class */ (function (_super) {
    __extends(FourStars, _super);
    function FourStars() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FourStars.prototype.score = function (hand) {
        var count = countDices(hand);
        if (count[1] === 4) {
            return 40;
        }
        return 0;
    };
    return FourStars;
}(AbsPlay));
exports.FourStars = FourStars;
