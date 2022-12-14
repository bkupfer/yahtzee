<script setup lang="ts">
import {useGameStore} from "@/stores/yatzi";
import {formatPattern} from "../helpers";

const gameStore = useGameStore();
</script>

<template>
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
</template>

<style scoped>

</style>