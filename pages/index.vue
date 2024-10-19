<script setup lang="ts">
import { pokedex } from "~/store/data/pokedex";
const { addNewPlayer } = useSquirdleQueries();

const filterText = ref("");
const newPlayerName = ref("");

const filteredPokedex = computed(() => {
  return pokedex.filter((pokemon) =>
    pokemon.name
      .toLocaleLowerCase()
      .includes(filterText.value.toLocaleLowerCase())
  );
});

function addPlayer() {
  addNewPlayer(newPlayerName.value);
  newPlayerName.value = "";
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1>Squirdle Guesser</h1>
    <div
      id="pokedex-search"
      class="bg-black/20 rounded-lg p-4 flex flex-col gap-4"
    >
      <input type="text" v-model="filterText" />
      <div class="max-h-[10vh] overflow-auto bg-white/10 rounded-lg p-4">
        <div v-for="pokemon in filteredPokedex">
          {{ pokemon.name }}
        </div>
      </div>
    </div>

    <div
      id="pokedex-search"
      class="bg-black/20 rounded-lg p-4 flex flex-col gap-4"
    >
      <div class="flex flex-row gap-4">
        <input type="text" v-model="newPlayerName" />
        <button @click="addPlayer">Aggiungi</button>
      </div>
    </div>
  </div>
</template>
