<script setup lang="ts">
import {useGameStore} from "@/stores/yatzi";
import {formatPattern} from "./helpers";
import {HAND_PATTERNS} from "@/models/patterns";
import PlayersScoreRow from "@/views/yatzi/Scoreboard/PlayersScoreRow.vue";

const gameStore = useGameStore();
</script>

<template>
  <v-container >
    <h2>Scoreboard</h2>
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
      <players-score-row />
      <!-- sections -->
      <template v-for="section in gameStore.sections" :key="section">
        <tr v-for="pattern in HAND_PATTERNS[section]" :key="pattern">
          <th>{{ formatPattern(pattern) }}</th>
          <td v-for="player in gameStore.players" :key="player.id">
            <span v-if="player.score[section][pattern].played">
              {{ player.score[section][pattern].points }}
            </span>
          </td>
        </tr>
        <tr>
          <th class="section_score">{{ formatPattern(section) }} section score</th>
          <td v-for="player in gameStore.players" :key="player.id" class="section_score">
            {{ player.score[section].flatScore() }}
          </td>
        </tr>
        <tr>
          <th class="section_score">{{ formatPattern(section) }} bonus</th>
          <td v-for="player in gameStore.players" :key="player.id" class="section_score">
            <span v-if="player.score[section].bonus()">
              {{ player.score[section].bonus() }}
            </span>
          </td>
        </tr>
      </template>
      <players-score-row />
      </tbody>
    </v-table>
  </v-container>
</template>

<style scoped>
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

td {
  text-align: center;
}

.section_score {
  background-color: rgba(52, 47, 27, 0.99);
}
</style>