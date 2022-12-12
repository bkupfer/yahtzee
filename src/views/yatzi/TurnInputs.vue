<script setup lang="ts">
import {DiceHand, randomDice, randomHand} from "@/models/hand";
import {ref} from "vue";
import {useGameStore} from "@/stores/yatzi";
import type {ScoreCard, UpperPatterns, LowerSection, Patterns} from "@/models/scoreboard";
import {HAND_PATTERNS} from "@/models/scoreboard";
import {formatPattern} from "./helpers";
import {Player} from "@/models/player";
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

function randomizeHand() {
  reroll.value = [];
  hand.value = randomHand();
}

function selectForReroll(dice: number) {
  reroll.value.push(dice);
}

function randomizeRerolls() {
  reroll.value.forEach((dice: number) => {
    hand.value.dices[dice] = randomDice();
  });
  reroll.value = [];
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


function disablePlayHand(player: number, pattern: Patterns, hand: DiceHand): boolean {
  if (hand.dices.every((dice: number) => dice === 0)) {
    return true;
  }
  const scoreboard: ScoreCard = gameStore.scoreboard(player);
  console.log('disable looks for pattern: ' + pattern);
  const play: Play = scoreboard.getPlay(pattern);
  console.log(play);

  if (play.played) {
    return true;
  } else {
    if (play.score(hand) !== 0) {
      return false;
    }
    if (!scoreboard.nonZeroPlayAvailable(hand)) {
      return false;
    }

    return true;
  }
}



</script>

<template>
  <div>
    <h2>Turn {{ round }} - {{ formatPattern(gameStore.players[turn].id) }}</h2>
    Random inputs:
    <input type="checkbox" id="checkbox" v-model="randomInputs" />

    <div v-if="randomInputs">
      Random play
      <v-btn v-on:click="randomizeHand()" color="secondary">Generate hand</v-btn>
      <v-btn v-show="reroll.length !== 0" v-on:click="randomizeRerolls()" color="secondary">Throw reroll</v-btn>
      <br>
    </div>
    <div v-else>
      Manual play <br>
      <span v-for="n in 5" :key="n">
        <input v-model="hand.dices[n - 1]" type="number" :placeholder="'dice ' + n" min="1" max="6">
      </span>
    </div>

    <div>
      <div class="my-2">
        <v-btn v-for="dice in 5" :key="dice"
               @click="selectForReroll(dice - 1)"
               :color="reroll.includes(dice - 1) ? 'secondary' : 'primary'">
          {{ hand.dices[dice - 1] }}
        </v-btn>
      </div>
    </div>

    <h2>Play options</h2>
    <v-btn-group>
      <v-btn v-for="pattern in HAND_PATTERNS.upper" :key="pattern"
             @click="playHand(turn, pattern, hand); $emit('pass-the-dice')"
             :disabled="disablePlayHand(turn, pattern, hand)"
      >
        {{ pattern }}
      </v-btn>
    </v-btn-group>
    <v-btn-group>
      <v-btn v-for="pattern in HAND_PATTERNS.lower" :key="pattern"
             @click="playHand(turn, pattern, hand); $emit('pass-the-dice')"
             :disabled="disablePlayHand(turn, pattern, hand)"
      >
        {{ pattern }}
      </v-btn>
    </v-btn-group>

  </div>
</template>

<style scoped>

</style>