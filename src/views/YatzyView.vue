<script setup lang="ts">
import GameScoreboard from "@/views/yatzi/ScoreBoard.vue";
import TurnInputs from "@/views/yatzi/TurnInputs.vue";
import RegisterPlayers from "@/views/yatzi/RegisterPlayers.vue";
import {ref} from "vue";
import {useGameStore} from "@/stores/yatzi";

const gameStore = useGameStore();

const round = ref(0);
const turn = ref(0);
const numberOfPlayers = ref(0);

function startGame() {
  numberOfPlayers.value = gameStore.players.length;
  round.value = 1;
}

function passTheDices() {
  turn.value += 1;
  if (turn.value === numberOfPlayers.value) {
    turn.value = 0;
    round.value += 1;
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <h1 class="py-5 pl-3" style="font-weight: bold; color: #ffa71a">Yatzy!</h1>
    </v-row>
    <v-row>
      <v-cols cols="12">
        <v-row v-if="round === 0">
          <v-col cols="12">
            <RegisterPlayers @start-game="startGame" />
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <TurnInputs @pass-the-dice="passTheDices" :round="round" :turn="turn" />
          </v-col>
          <v-col cols="12">
            <GameScoreboard />
          </v-col>
        </v-row>
      </v-cols>
    </v-row>
  </v-container>
</template>
