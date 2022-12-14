<script setup lang="ts">
import {useGameStore} from "@/stores/yatzi";

const gameStore = useGameStore();
</script>

<template>
  <tr>
    <th class="total_score">Total Score</th>
    <td v-for="player in gameStore.players" :key="player.id" class="total_score">
      {{ player.score.totalScore() }}
    </td>
  </tr>
</template>

<style scoped>
.total_score {
  background-color: teal;
  font-weight: bold;
}

td {
  text-align: center;
}
</style>