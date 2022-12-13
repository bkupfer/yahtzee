<script setup lang="ts">
import {useGameStore} from "@/stores/yatzi";
import {HAND_PATTERNS} from "@/models/scoreboard";
import {formatPattern} from "./helpers";

const gameStore = useGameStore();
</script>

<template>
  <v-container >
    <h2>Scoreboard</h2>
    <div v-for="player in gameStore.players" :key="player.id">
    </div>
    <v-table hover density="compact">
      <thead>
      <tr>
        <th />
        <th v-for="player in gameStore.players" :key="player.id">
          {{ formatPattern(player.id) }}
        </th>
      </tr>
      </thead>
      <tbody>
      <!-- score -->
      <tr>
        <th class="total_score">Total Score</th>
        <td v-for="player in gameStore.players" :key="player.id" class="total_score">
          {{ player.score.totalScore() }}
        </td>
      </tr>
<!--      <hr>-->
      <!-- upper section -->
      <tr v-for="pattern in HAND_PATTERNS.upper" :key="pattern">
        <th>{{ formatPattern(pattern) }}</th>
        <td v-for="player in gameStore.players" :key="player.id">
          <span v-if="player.score.upperSection[pattern].played">
            {{ player.score.upperSection[pattern].points }}
          </span>
        </td>
      </tr>
<!--      <hr>-->
      <tr>
        <th class="section_score">Section Score</th>
        <td v-for="player in gameStore.players" :key="player.id" class="section_score">
          {{ player.score.upperSection.flatScore() }}
        </td>
      </tr>
      <tr>
        <th class="section_score">{{ formatPattern('Upper Bonus') }}</th>
        <td v-for="player in gameStore.players" :key="player.id" class="section_score">
          <span v-if="player.score.upperSection.bonus()">
            {{ player.score.upperSection.bonus() }}
          </span>
        </td>
      </tr>
      <!-- lower section -->
<!--      <hr>-->
      <tr v-for="pattern in HAND_PATTERNS.lower" :key="pattern">
        <th>{{ formatPattern(pattern) }}</th>
        <td v-for="player in gameStore.players" :key="player.id">
          <span v-if="player.score.lowerSection[pattern].played">
            {{ player.score.lowerSection[pattern].points }}
          </span>
        </td>
      </tr>
<!--      <hr>-->
      <tr>
        <th class="section_score">Section Score</th>
        <td v-for="player in gameStore.players" :key="player.id" class="section_score">
          {{ player.score.lowerSection.flatScore() }}
        </td>
      </tr>
      <tr>
        <th class="section_score">{{ formatPattern('Lower Bonus') }}</th>
        <td v-for="player in gameStore.players" :key="player.id" class="section_score">
          <span v-if="player.score.lowerSection.bonus()">
            {{ player.score.lowerSection.bonus() }}
          </span>
        </td>
      </tr>
<!--      <hr>-->
      <tr>
        <th class="total_score">Total Score</th>
        <td v-for="player in gameStore.players" :key="player.id" class="total_score">
          {{ player.score.totalScore() }}
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<style scoped>
td {
  text-align: center;
}
table {
  border:none;
  border-collapse: collapse;
}

table td {
  border-left: 1px solid #FFF;
  border-right: 1px solid #FFF;
}

table td:first-child {
  border-left: none;
}

table td:last-child {
  border-right: none;
}

.total_score {
  background-color: teal;
  font-weight: bold;
}

.section_score {
  background-color: rgba(52, 47, 27, 0.99);
}

</style>