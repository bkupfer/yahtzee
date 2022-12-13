import {defineStore} from "pinia";
import {ref} from "vue";
import {Player} from "@/models/player";
import {HAND_PATTERNS} from "@/models/scoreboard";

export const useGameStore = defineStore("yatzi", {

    state: () => {
        return {
            players: ref<Player[]>([])
        };
    },

    getters: {
      scoreboard: (state) => {
          return (player: number) => state.players[player].score;
      },
      totalNumberOfRounds: (state) => {
          return () => {
              return HAND_PATTERNS.upper.length + HAND_PATTERNS.lower.length;
          }
      },
    },

    actions: {
        addPlayer(name: string) {
            this.players.push(new Player(name, this.players.length));
        }
    }

});