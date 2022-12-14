<script setup lang="ts">
import {useGameStore} from "@/stores/yatzi";
import {formatPattern} from "./helpers";
import {HAND_PATTERNS} from "@/models/patterns";

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
      
      <!-- sections -->
      <!-- upper section -->
      <tr v-for="pattern in HAND_PATTERNS.upper" :key="pattern">
        <th>{{ formatPattern(pattern) }}</th>
        <td v-for="player in gameStore.players" :key="player.id">
          <span v-if="player.score.upper[pattern].played">
            {{ player.score.upper[pattern].points }}
          </span>
        </td>
      </tr>
      <tr>
        <th class="section_score">Upper section score</th>
        <td v-for="player in gameStore.players" :key="player.id" class="section_score">
          {{ player.score.upper.flatScore() }}
        </td>
      </tr>
      <tr>
        <th class="section_score">{{ formatPattern('Upper Bonus') }}</th>
        <td v-for="player in gameStore.players" :key="player.id" class="section_score">
          <span v-if="player.score.upper.bonus()">
            {{ player.score.upper.bonus() }}
          </span>
        </td>
      </tr>

      <!-- lower section -->
      <tr v-for="pattern in HAND_PATTERNS.lower" :key="pattern">
        <th>{{ formatPattern(pattern) }}</th>
        <td v-for="player in gameStore.players" :key="player.id">
          <span v-if="player.score.lower[pattern].played">
            {{ player.score.lower[pattern].points }}
          </span>
        </td>
      </tr>
      <tr>
        <th class="section_score">Lower section score</th>
        <td v-for="player in gameStore.players" :key="player.id" class="section_score">
          {{ player.score.lower.flatScore() }}
        </td>
      </tr>
      <tr>
        <th class="section_score">{{ formatPattern('Lower Bonus') }}</th>
        <td v-for="player in gameStore.players" :key="player.id" class="section_score">
          <span v-if="player.score.lower.bonus()">
            {{ player.score.lower.bonus() }}
          </span>
        </td>
      </tr>

      <!-- special section -->
      <tr v-for="pattern in HAND_PATTERNS.special" :key="pattern">
        <th>{{ formatPattern(pattern) }}</th>
        <td v-for="player in gameStore.players" :key="player.id">
          <span v-if="player.score.special[pattern].played">
            {{ player.score.special[pattern].points }}
          </span>
        </td>
      </tr>
      <tr>
        <th class="section_score">Special section score</th>
        <td v-for="player in gameStore.players" :key="player.id" class="section_score">
          {{ player.score.special.flatScore() }}
        </td>
      </tr>
      <tr>
        <th class="section_score">{{ formatPattern('Special Bonus') }}</th>
        <td v-for="player in gameStore.players" :key="player.id" class="section_score">
          <span v-if="player.score.special.bonus()">
            {{ player.score.special.bonus() }}
          </span>
        </td>
      </tr>

      <!-- evil section -->
      <tr v-for="pattern in HAND_PATTERNS.evil" :key="pattern">
        <th>{{ formatPattern(pattern) }}</th>
        <td v-for="player in gameStore.players" :key="player.id">
          <span v-if="player.score.evil[pattern].played">
            {{ player.score.evil[pattern].points }}
          </span>
        </td>
      </tr>
      <tr>
        <th class="section_score">Evil section score</th>
        <td v-for="player in gameStore.players" :key="player.id" class="section_score">
          {{ player.score.evil.flatScore() }}
        </td>
      </tr>
      <tr>
        <th class="section_score">Evil bonus</th>
        <td v-for="player in gameStore.players" :key="player.id" class="section_score">
          <span v-if="player.score.evil.bonus()">
            {{ player.score.evil.bonus() }}
          </span>
        </td>
      </tr>

      <!-- final score -->
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