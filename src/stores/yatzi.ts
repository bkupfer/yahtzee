import { HAND_PATTERNS } from "@/models/patterns";
import type { SectionPatterns } from "@/models/patterns";
import { Player } from "@/models/player";
import { Section } from "@/models/scoreboard";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore("yatzi", {

    state: () => {
        return {
            players: ref<Player[]>([]),
            round: ref<number>(0),
            turn: ref<number>(0),
            sections: ref<Array<SectionPatterns>>([]),
        };
    },

    getters: {
      scoreboard: (state) => {
          return (player: number) => state.players[player].score;
      },
      totalNumberOfRounds: (state) => {
          return (): number => {
              let patternsCount: number = 0;
              state.sections.forEach((section: SectionPatterns) => {
                  patternsCount += HAND_PATTERNS[section].length;
              });
              return patternsCount;
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
        startGame(sections: SectionPatterns[]) {
            this.round = 1;
            this.sections = sections;
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
