<script setup lang="ts">
import {useGameStore} from "@/stores/yatzi";
import {ref} from "vue";

defineEmits(['start-game'])

const gameStore = useGameStore();

const playerNameInput = ref<string>("");

const addPlayer = (name: string) => {
  if (name) {
    gameStore.addPlayer(name);
    playerNameInput.value = "";
  }
}

function startGame() {
  gameStore.startGame();
}
</script>

<template>
  <v-container>
    <h2 class="mb-4">Register player</h2>
    <input v-model="playerNameInput" type="text" placeholder="Player name">
    <v-btn v-on:click="addPlayer(playerNameInput)" color="primary">
      Add player
    </v-btn>
    <br>
    <div v-if="gameStore.players.length" class="mt-6">
      <h3>Players:</h3>
      <ol>
        <li v-for="player in gameStore.players" v-bind:key="player.id">{{ player.id }}</li>
      </ol>
      <br>
      <v-btn @click="startGame()" color="success">
        Start game
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>

</style>