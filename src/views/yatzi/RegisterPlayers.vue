<script setup lang="ts">
import {useGameStore} from "@/stores/yatzi";

defineEmits(['start-game'])

const gameStore = useGameStore();

const playerNameInput: string = ""

const addPlayer = (name: string) => {
  gameStore.addPlayer(name);
}
</script>

<template>
  <div>
    <h2>Register player</h2>
    <input v-model="playerNameInput" type="text" placeholder="player name">
    <v-btn v-on:click="addPlayer(playerNameInput)" color="primary">
      Add player
    </v-btn>
    <br>
    <div v-if="gameStore.players.length">
      <h3>Players:</h3>
      <ol>
        <li v-for="player in gameStore.players" v-bind:key="player.id">{{ player.id }}</li>
      </ol>
      <v-btn v-on:click="$emit('start-game')" color="success">
        Start game
      </v-btn>
    </div>
  </div>
</template>

<style scoped>

</style>