<script setup lang="ts">
// import {DiceHand, randomDice, randomHand} from "@/models/hand";
// import {playerColor} from "@/models/player";
// import {useGameStore} from "@/stores/yatzi";
// import {ref} from "vue";
// import {formatPattern} from "../helpers";
//
// const gameStore = useGameStore();
//
// // const hand = ref<DiceHand>(new DiceHand([0, 0, 0, 0, 0]));
// // const props = defineProps({
// //   hand: {
// //     type: DiceHand,
// //     required: true,
// //   }
// // });
</script>

<template>
<!--  <h2>Turn {{ gameStore.round }} / {{ totalNumberOfRounds }} - <span :color="playerColor(gameStore.turn)" style="font-weight: bold">{{ formatPattern(gameStore.players[gameStore.turn].id) }}</span></h2>-->
<!--  {{ randomInputs ? "Random" : "Manual" }} play:-->
<!--  <input type="checkbox" id="checkbox" v-model="randomInputs" />-->
<!--  <div v-if="randomInputs">-->
<!--    <v-btn v-on:click="randomizeHand()" color="secondary" class="mr-1">Generate hand</v-btn>-->
<!--    <v-btn :disabled="reroll.length === 0 || rerollAttempts === 2" v-on:click="randomizeRerolls()" color="secondary">-->
<!--      Throw reroll ({{ rerollAttempts }}/2)-->
<!--    </v-btn>-->
<!--    <br>-->
<!--  </div>-->
<!--  <div v-else>-->
<!--    <span v-for="n in 5" :key="n">-->
<!--      <input v-model="hand.dices[n - 1]" type="number" :placeholder="'dice ' + n" min="1" max="6">-->
<!--    </span>-->
<!--  </div>-->
<!--  <v-btn-group class="my-2">-->
<!--    <v-btn v-for="dice in 5" :key="dice"-->
<!--           @click="selectForReroll(dice - 1)"-->
<!--           :color="reroll.includes(dice - 1) ? 'secondary' : 'primary'"-->
<!--           class="mr-1"-->
<!--    >-->
<!--      {{ hand.dices[dice - 1] }}-->
<!--    </v-btn>-->
<!--  </v-btn-group>-->
</template>

<style scoped>

</style>