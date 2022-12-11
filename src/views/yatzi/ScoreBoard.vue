<script setup lang="ts">
import {useGameStore} from "@/stores/yatzi";
import {HAND_PATTERNS} from "@/models/scoreboard";
import {formatPattern} from "./helpers";

const gameStore = useGameStore();


</script>

<template>
  <div>
    <h2>Scoreboard</h2>
    <div v-for="player in gameStore.players" :key="player.id">
    </div>
    <v-table hover>
      <thead>
      <tr>
        <th />
        <th v-for="player in gameStore.players" :key="player.id">
          {{ formatPattern(player.id) }}
        </th>
      </tr>
      </thead>
      <tbody>
      <!-- upper section -->
      <tr v-for="pattern in HAND_PATTERNS.upper" :key="pattern">
        <th>{{ formatPattern(pattern) }}</th>
        <td v-for="player in gameStore.players" :key="player.id">
          <span v-if="player.score.upperSection[pattern].played">
            {{ player.score.upperSection[pattern].points }}
          </span>
        </td>
      </tr>
      <tr>
        <th>{{ formatPattern('Upper Bonus') }}</th>
        <td v-for="player in gameStore.players" :key="player.id">
          <span v-if="player.score.upperSection.bonus()">
            {{ player.score.upperSection.bonus() }}
          </span>
        </td>
      </tr>
      <!-- lower section -->
      <tr v-for="pattern in HAND_PATTERNS.lower" :key="pattern">
        <th>{{ formatPattern(pattern) }}</th>
        <td v-for="player in gameStore.players" :key="player.id">
          <span v-if="player.score.lowerSection[pattern].played">
            {{ player.score.lowerSection[pattern].points }}
          </span>
        </td>
      </tr>
      <tr>
        <th>{{ formatPattern('Lower Bonus') }}</th>
        <td v-for="player in gameStore.players" :key="player.id">
          <span v-if="player.score.lowerSection.bonus()">
            {{ player.score.lowerSection.bonus() }}
          </span>
        </td>
      </tr>
      <!-- score -->
      <tr>
        <th>Total Score</th>
        <td v-for="player in gameStore.players" :key="player.id">
          {{ player.score.totalScore() }}
        </td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style scoped>
td {
  text-align: center;
}
</style>