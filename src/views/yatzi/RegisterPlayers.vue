<script setup lang="ts">
import type { SectionPatterns } from "@/models/patterns";
import { useGameStore } from "@/stores/yatzi";
import { ref } from "vue";
import { formatPattern } from "./helpers";


const gameStore = useGameStore();
const playerNameInput = ref<string>("");
const gameModeClassic = ref<boolean>(true)
const gameModeSpecial = ref<boolean>(true)
const gameModeEvil = ref<boolean>(true)

const addPlayer = (name: string) => {
  if (name) {
    gameStore.addPlayer(name);
    playerNameInput.value = "";
  }
}

function selectedSections(): SectionPatterns[] {
  const classicSections: SectionPatterns[] = ['upper', 'lower'];
  const specialSections: SectionPatterns[] = ['special'];
  const evilSections: SectionPatterns[] = ['evil'];
  const selected: SectionPatterns[] = [];
  if (gameModeClassic.value) {
    selected.push(...classicSections);
  }
  if (gameModeSpecial.value) {
    selected.push(...specialSections);
  }
  if (gameModeEvil.value) {
    selected.push(...evilSections);
  }
  return selected;
}

function startGame() {
  const sections: SectionPatterns[] = selectedSections();
  gameStore.startGame(sections);
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <h2 class="mb-4">Register players</h2>
        <input v-model="playerNameInput" type="text" placeholder="Player name">
        <v-btn v-on:click="addPlayer(playerNameInput)" color="primary" class="mt-3">
          Add player
        </v-btn>
        <br>
        <div v-if="gameStore.players.length" class="mt-6">
          <h3>Players:</h3>
          <ol>
            <li v-for="player in gameStore.players" v-bind:key="player.id">
              <p :style="'color: ' + player.color">{{ formatPattern(player.id) }}</p>
            </li>
          </ol>
          <br>
          <v-btn @click="startGame()" color="success">
            Start game
          </v-btn>
        </div>
      </v-col>
      <v-col cols="6">
        <h2 class="mb-4">Select game sections</h2>
        Classic <input type="checkbox" id="checkbox" v-model="gameModeClassic" /> +
        Special <input type="checkbox" id="checkbox" v-model="gameModeSpecial" /> +
        Evil <input type="checkbox" id="checkbox" v-model="gameModeEvil" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>