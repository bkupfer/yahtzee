<script setup lang="ts">
import { useGameStore } from "@/stores/yatzi";
import RegisterPlayers from "@/views/yatzi/RegisterPlayers.vue";
import GameScoreboard from "@/views/yatzi/ScoreBoard.vue";
import TurnInputs from "@/views/yatzi/TurnInputs.vue";

const gameStore = useGameStore();
</script>

<template>
  <v-container>
    <v-row>
      <h1 class="py-5 pl-3" style="font-weight: bold; color: #ffa71a">Yatzy!</h1>
    </v-row>
    <v-row>
      <v-row v-if="gameStore.round === 0">
        <v-col cols="12">
          <RegisterPlayers />
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12">
          <TurnInputs />
        </v-col>
        <v-col cols="12">
          <GameScoreboard />
        </v-col>
      </v-row>
    </v-row>
  </v-container>
</template>
