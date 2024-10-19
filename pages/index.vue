<script setup lang="ts">
import { pokedex } from "~/store/data/pokedex";

const filterText = ref("");

const filteredPokedex = computed(() => {
  return pokedex.filter((pokemon) =>
    pokemon.name
      .toLocaleLowerCase()
      .includes(filterText.value.toLocaleLowerCase())
  );
});
</script>

<template>
  <div>Squirdle Guesser</div>
  <input type="text" v-model="filterText" />
  <div>
    <div v-for="pokemon in filteredPokedex">
      {{ pokemon.name }}
    </div>
  </div>
</template>
