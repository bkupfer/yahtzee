<script setup lang="ts">
import {DiceHand, randomDice, randomHand} from "@/models/hand";
import {ref} from "vue";
import {useGameStore} from "@/stores/yatzi";
import type {ScoreCard, UpperPatterns, LowerSection, Patterns} from "@/models/scoreboard";
import {HAND_PATTERNS} from "@/models/scoreboard";
import {formatPattern} from "./helpers";
import type {Play} from "@/models/plays";


const props = defineProps({
  round: Number,
  turn: {
    type: Number,
    required: true,
  },
});

defineEmits(['pass-the-dice'])

const gameStore = useGameStore();
const randomInputs = ref<boolean>(true);
const hand = ref<DiceHand>(new DiceHand([0, 0, 0, 0, 0]));
const reroll = ref<number[]>([]);
const rerollAttempts = ref<number>(0);

function randomizeHand() {
  reroll.value = [];
  hand.value = randomHand();
  rerollAttempts.value = 0;
}

function selectForReroll(dice: number) {
  if (rerollAttempts.value < 2) {
    reroll.value.push(dice);
  }
}

function randomizeRerolls() {
  reroll.value.forEach((dice: number) => {
    hand.value.dices[dice] = randomDice();
  });
  reroll.value = [];
  rerollAttempts.value += 1;
}

function setHandToZero() {
  hand.value = new DiceHand([0, 0, 0, 0, 0]);
}

function playHand(player: number, pattern: Patterns, hand: DiceHand): void {
  const scoreboard: ScoreCard = gameStore.scoreboard(player);
  const play: Play = scoreboard.getPlay(pattern);
  play.play(hand);
  setHandToZero();
}

function playColor(player: number, pattern: Patterns, hand: DiceHand): string {
  const scoreboard: ScoreCard = gameStore.scoreboard(player);
  const play: Play = scoreboard.getPlay(pattern);
  if (play.played) {
    return 'success'
  }
  if (hand.dices.every((dice: number) => dice === 0)) {
    return 'default';
  }
  if (play.score(hand) !== 0) {
    return 'default';
  }
  if (!scoreboard.nonZeroPlayAvailable(hand)) {
    return 'error';
  }
  return 'default';
}

function potentialPoints(player: number, pattern: Patterns, hand: DiceHand): number {
  const scoreboard: ScoreCard = gameStore.scoreboard(player);
  const play: Play = scoreboard.getPlay(pattern);
  return play.score(hand);
}

function notYetPlayed(player: number, pattern: Patterns): boolean {
  const scoreboard: ScoreCard = gameStore.scoreboard(player);
  const play: Play = scoreboard.getPlay(pattern);
  return !play.played;
}

function disablePlayHand(player: number, pattern: Patterns, hand: DiceHand): boolean {
  const scoreboard: ScoreCard = gameStore.scoreboard(player);
  const play: Play = scoreboard.getPlay(pattern);
  if (hand.dices.every((dice: number) => dice === 0)) {
    return true;
  }
  if (play.played) {
    return true;
  }
  if (play.score(hand) !== 0) {
    return false;
  }
  if (!scoreboard.nonZeroPlayAvailable(hand)) {
    return false;
  }
  return true;
}
</script>

<template>
  <v-row>
    <v-col cols="12">

      <v-col cols="12">
        <h2>Turn {{ round }} - {{ formatPattern(gameStore.players[turn].id) }}</h2>
        <span v-if="randomInputs">Random</span>
        <span v-else="randomInputs">Manual</span>
        play:
        <input type="checkbox" id="checkbox" v-model="randomInputs" />
      </v-col>
      <v-col cols="12">
        <div v-if="randomInputs">
          <v-btn v-on:click="randomizeHand()" color="secondary">Generate hand</v-btn>
          <v-btn v-show="reroll.length !== 0 && rerollAttempts < 3" v-on:click="randomizeRerolls()" color="secondary">
            Throw reroll ({{ rerollAttempts + 1 }})
          </v-btn>
          <br>
        </div>
        <div v-else>
          <span v-for="n in 5" :key="n">
            <input v-model="hand.dices[n - 1]" type="number" :placeholder="'dice ' + n" min="1" max="6">
          </span>
        </div>
      </v-col>

      <v-col cols="6">
        <div class="my-2">
          <v-btn v-for="dice in 5" :key="dice"
                 @click="selectForReroll(dice - 1)"
                 :color="reroll.includes(dice - 1) ? 'secondary' : 'primary'"
                 class="ml-1"
          >
            {{ hand.dices[dice - 1] }}
          </v-btn>
        </div>
      </v-col>

      <v-col cols="12">
        <h2>Play options</h2>
        <v-btn-group v-for="section in ['upper', 'lower']" :key="section" >
          <v-btn v-for="pattern in HAND_PATTERNS[section]" :key="pattern" min-width="50px" class="ma-1 rounded-b-shaped"
                 @click="playHand(turn, pattern, hand); $emit('pass-the-dice')"
                 :disabled="disablePlayHand(turn, pattern, hand)"
                 :color="playColor(turn, pattern, hand)"
          >
            {{ formatPattern(pattern) }}
            <sub v-if="notYetPlayed(turn, pattern)">{{ potentialPoints(turn, pattern, hand) }}</sub>
          </v-btn>
        </v-btn-group>
      </v-col>
    </v-col>

  </v-row>
</template>

<style scoped>

</style>