<script setup lang="ts">
import { DiceHand } from "@/models/hand";
import type { Patterns } from "@/models/patterns";
import { HAND_PATTERNS } from "@/models/patterns";
import type { Play } from "@/models/plays";
import type { ScoreCard } from "@/models/scoreboard";
import { useGameStore } from "@/stores/yatzi";
import { formatPattern } from "../helpers";

const gameStore = useGameStore();

const emit = defineEmits(['pass_the_dice'])

const props = defineProps({
  hand: DiceHand,
})

function playHand(player: number, pattern: Patterns, hand: DiceHand): void {
  const scoreboard: ScoreCard = gameStore.scoreboard(player);
  const play: Play = scoreboard.getPlay(pattern);
  play.play(hand);
  emit('pass_the_dice');
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
  if (!scoreboard.nonZeroPlayAvailable(hand, gameStore.sections)) {
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
  // if (['all_odd', 'all_even'].includes(pattern)) {
  //   if (pattern === 'all_odd' && gameStore.round % 2 === 0) {
  //     return true;
  //   }
  //   if (pattern === 'all_even' && gameStore.round % 2 === 1) {
  //     return true;
  //   }
  // }
  if (play.score(hand) !== 0) {
    return false;
  }
  if (!scoreboard.nonZeroPlayAvailable(hand, gameStore.sections)) {
    return false;
  }
  return true;
}
</script>

<template>
  <v-row>
    <v-col cols="12">
      <h2 style="font-weight: bold">Play options</h2>
    </v-col>
    <v-col cols="12" v-for="section in gameStore.sections" :key="section" >
      <v-btn v-for="pattern in HAND_PATTERNS[section]" :key="pattern" min-width="50px" class="ma-1 rounded-b-shaped"
             @click="playHand(gameStore.turn, pattern, props.hand);"
             :disabled="disablePlayHand(gameStore.turn, pattern, props.hand)"
             :color="playColor(gameStore.turn, pattern, props.hand)"
      >
        {{ formatPattern(pattern) }}
        <sub v-if="notYetPlayed(gameStore.turn, pattern)">{{ potentialPoints(gameStore.turn, pattern, props.hand) }}</sub>
      </v-btn>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>