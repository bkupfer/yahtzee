<script setup lang="ts">
import {DiceHand, randomDice, randomHand} from "@/models/hand";
import {ref} from "vue";
import {useGameStore} from "@/stores/yatzi";
import type {ScoreCard} from "@/models/scoreboard";
import {HAND_PATTERNS} from "@/models/scoreboard";
import {formatPattern} from "./helpers";


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

function scoreboard(turn: number): ScoreCard {
  return gameStore.scoreboard(turn);
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
      <code>{{ reroll }}</code>
      <code>{{ hand }}</code>
    </div>



    <h2>Play options</h2>
    <v-btn-group>
      <v-btn v-for="pattern in HAND_PATTERNS.upper" :key="pattern"
             @click="scoreboard(turn).upperSection[pattern].play(hand); $emit('pass-the-dice')"
             :disabled="scoreboard(turn).upperSection[pattern].played || 0 === scoreboard(turn).upperSection[pattern].score(hand)">
        {{ pattern }}
      </v-btn>
    </v-btn-group>
    <v-btn-group>
      <v-btn v-for="pattern in HAND_PATTERNS.lower" :key="pattern"
             @click="scoreboard(turn).lowerSection[pattern].play(hand); $emit('pass-the-dice')"
             :disabled="scoreboard(turn).lowerSection[pattern].played || 0 === scoreboard(turn).lowerSection[pattern].score(hand)">
        {{ pattern }}
      </v-btn>
    </v-btn-group>

  </div>
</template>

<style scoped>

</style>