import { HAND_PATTERNS } from "@/models/patterns";
import { Player } from "@/models/player";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore("yatzi", {

    state: () => {
        return {
            players: ref<Player[]>([]),
            round: ref<number>(0),
            turn: ref<number>(0),
        };
    },

    getters: {
      scoreboard: (state) => {
          return (player: number) => state.players[player].score;
      },
      totalNumberOfRounds: (state) => {
          return (): number => {
              return HAND_PATTERNS.upper.length
                  + HAND_PATTERNS.lower.length
                  + HAND_PATTERNS.special.length
                  + HAND_PATTERNS.evil.length;
          }
      },
      numberOfPlayers: (state): number => {
          return state.players.length;
      }
    },

    actions: {
        addPlayer(name: string) {
            this.players.push(new Player(name, this.players.length));
        },
        startGame() {
            this.round = 1;
        },
        passTheDice() {
            this.turn += 1;
            if (this.turn === this.numberOfPlayers) {
                this.turn = 0;
                this.round += 1;
            }
        }
    }

});
