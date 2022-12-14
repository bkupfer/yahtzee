<script setup lang="ts">
import {DiceHand, randomDice, randomHand} from "@/models/hand";
import {ref} from "vue";
import {useGameStore} from "@/stores/yatzi";
import type {ScoreCard} from "@/models/scoreboard";
import {formatPattern} from "./helpers";
import type {Play} from "@/models/plays";
import {playerColor} from "@/models/player";
import type {Patterns} from "@/models/patterns";
import {HAND_PATTERNS} from "@/models/patterns";


const gameStore = useGameStore();
const randomInputs = ref<boolean>(true);
const hand = ref<DiceHand>(new DiceHand([0, 0, 0, 0, 0]));
const reroll = ref<number[]>([]);
const rerollAttempts = ref<number>(0);
const totalNumberOfRounds = gameStore.totalNumberOfRounds();

function randomizeHand() {
  reroll.value = [];
  hand.value = randomHand();
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
  hand.value.dices = [0, 0, 0, 0, 0];
}

function playHand(player: number, pattern: Patterns, hand: DiceHand): void {
  const scoreboard: ScoreCard = gameStore.scoreboard(player);
  const play: Play = scoreboard.getPlay(pattern);
  play.play(hand);
  setHandToZero();
  reroll.value = [];
  rerollAttempts.value = 0;
  gameStore.passTheDice();
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
  if (['all_odd', 'all_even'].includes(pattern)) {
    if (pattern === 'all_odd' && gameStore.round % 2 === 0) {
      return true;
    }
    if (pattern === 'all_even' && gameStore.round % 2 === 1) {
      return true;
    }
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
  <v-container>
    <v-row>
      <v-col cols="6">
        <h2>Turn {{ gameStore.round }} / {{ totalNumberOfRounds }} - <span :color="playerColor(gameStore.turn)" style="font-weight: bold">{{ formatPattern(gameStore.players[gameStore.turn].id) }}</span></h2>
        <span v-if="randomInputs">Random</span>
        <span v-else>Manual</span>
        play:
        <input type="checkbox" id="checkbox" v-model="randomInputs" />
        <div v-if="randomInputs">
          <v-btn v-on:click="randomizeHand()" color="secondary" class="mr-1">Generate hand</v-btn>
          <v-btn :disabled="reroll.length === 0 || rerollAttempts === 2" v-on:click="randomizeRerolls()" color="secondary">
            Throw reroll ({{ rerollAttempts }}/2)
          </v-btn>
          <br>
        </div>
        <div v-else>
          <span v-for="n in 5" :key="n">
            <input v-model="hand.dices[n - 1]" type="number" :placeholder="'dice ' + n" min="1" max="6">
          </span>
        </div>
        <v-btn-group class="my-2">
          <v-btn v-for="dice in 5" :key="dice"
                 @click="selectForReroll(dice - 1)"
                 :color="reroll.includes(dice - 1) ? 'secondary' : 'primary'"
                 class="mr-1"
          >
            {{ hand.dices[dice - 1] }}
          </v-btn>
        </v-btn-group>
      </v-col>

      <v-col cols="6">
          <h2>Total Score</h2>
        <v-row>
          <v-col v-for="player in gameStore.players" :key="player">
            <div style="text-align: left">
              <b :color="player.color">
                {{ formatPattern(player.id) }}
              </b>
              <br>
              <code style="font-size: 24px">
                {{ player.score.totalScore()}}
              </code>
            </div>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-row>
          <v-col cols="12">
            <h2 style="font-weight: bold">Play options</h2>
          </v-col>
          <v-col cols="12" v-for="section in ['upper', 'lower', 'special', 'evil']" :key="section" >
            <v-btn v-for="pattern in HAND_PATTERNS[section]" :key="pattern" min-width="50px" class="ma-1 rounded-b-shaped"
                   @click="playHand(gameStore.turn, pattern, hand);"
                   :disabled="disablePlayHand(gameStore.turn, pattern, hand)"
                   :color="playColor(gameStore.turn, pattern, hand)"
            >
              {{ formatPattern(pattern) }}
              <sub v-if="notYetPlayed(gameStore.turn, pattern)">{{ potentialPoints(gameStore.turn, pattern, hand) }}</sub>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

  </v-container>
</template>

<style scoped>

</style>