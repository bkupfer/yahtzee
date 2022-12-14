<script setup lang="ts">
import {DiceHand, randomDice, randomHand} from "@/models/hand";
import {useGameStore} from "@/stores/yatzi";
import {ref} from "vue";
import ScoreSummary from "@/views/yatzi/TurnInputs/ScoreSummary.vue";
import PlaysMenu from "@/views/yatzi/TurnInputs/PlaysMenu.vue";
import {playerColor} from "@/models/player";
import {formatPattern} from "./helpers";

const gameStore = useGameStore();

const hand = ref<DiceHand>(new DiceHand([0, 0, 0, 0, 0]));
const randomInputs = ref<boolean>(true);
const reroll = ref<number[]>([]);
const rerollAttempts = ref<number>(0);
const totalNumberOfRounds = gameStore.totalNumberOfRounds();

function setHandToZero() {
  hand.value.dices = [0, 0, 0, 0, 0];
}

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

function passTheDice() {
  setHandToZero();
  reroll.value = [];
  rerollAttempts.value = 0;
  gameStore.passTheDice();
}
</script>

<template>
  <v-container>
    <v-row>
      <!-- Hand input -->
      <v-col cols="6">
        <h2>
          Turn {{ gameStore.round }} / {{ totalNumberOfRounds }} -
          <span :color="playerColor(gameStore.turn)" style="font-weight: bold">
            {{ formatPattern(gameStore.players[gameStore.turn].id) }}
          </span>
        </h2>
        {{ randomInputs ? "Random" : "Manual" }} play:
        <input type="checkbox" id="checkbox" v-model="randomInputs" />
        <div v-if="randomInputs">
          <v-btn v-on:click="randomizeHand()" :disabled="hand.played()" color="secondary" class="mr-1">Generate hand</v-btn>
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
        <score-summary />
      </v-col>

      <v-col cols="12">
        <plays-menu :hand="hand" @pass_the_dice="passTheDice()"/>
      </v-col>
    </v-row>

  </v-container>
</template>

<style scoped>

</style>