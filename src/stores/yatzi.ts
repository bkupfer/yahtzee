import {defineStore} from "pinia";
import {ref} from "vue";
import {Player} from "@/models/player";

export const useGameStore = defineStore("yatzi", {

    state: () => {
        return {
            players: ref<Player[]>([])
        };
    },

    getters: {
      scoreboard: (state) => {
          return (player: number) => state.players[player].score;
      }
    },

    actions: {
        addPlayer(name: string) {
            this.players.push(new Player(name, this.players.length));
        }
    }

});