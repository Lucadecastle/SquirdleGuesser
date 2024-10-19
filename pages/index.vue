<script setup lang="ts">
import { pokedex } from "~/store/data/pokedex";
import type { Player } from "~/store/models/player";
import { POKEMON_TYPE, type Pokemon } from "~/store/models/pokemon";
const { addNewPlayer, getPlayers, updatePlayer } = useSquirdleQueries();

const filterText = ref("");
const newPlayerName = ref("");
const selectedPokemon = ref<Pokemon>();
const selectedPlayer = ref();
const players = ref();
const newSquirdleResult = ref("");

onMounted(() => {
  players.value = getPlayers();
  console.log(getPlayers());
});

const filteredPokedex = computed(() => {
  return pokedex.filter((pokemon) =>
    pokemon.name
      .toLocaleLowerCase()
      .includes(filterText.value.toLocaleLowerCase())
  );
});

const possiblePokemons = computed(() => {
  if (!selectedPlayer.value) return [];

  return pokedex.filter(
    (pokemon) =>
      pokemon.height >= selectedPlayer.value.minHeight &&
      pokemon.height <= selectedPlayer.value.maxHeight &&
      pokemon.weight >= selectedPlayer.value.minWeight &&
      pokemon.weight <= selectedPlayer.value.maxWeight &&
      selectedPlayer.value.possibleTypes.includes(pokemon.type1) &&
      selectedPlayer.value.possibleTypes.includes(pokemon.type2) &&
      (selectedPlayer.value.sureTypes.length === 0 ||
        (selectedPlayer.value.sureTypes.length === 1 &&
          [pokemon.type1, pokemon.type2].includes(
            selectedPlayer.value.sureTypes[0]
          )) ||
        (selectedPlayer.value.sureTypes.length === 2 &&
          (JSON.stringify([pokemon.type1, pokemon.type2]) ===
            JSON.stringify(selectedPlayer.value.sureTypes) ||
            JSON.stringify([pokemon.type2, pokemon.type1]) ===
              JSON.stringify(selectedPlayer.value.sureTypes))))
  );
});

function addPlayer() {
  addNewPlayer(newPlayerName.value);
  newPlayerName.value = "";
  players.value = getPlayers();
  location.reload();
}

function resetPlayer() {
  updatePlayer({
    name: selectedPlayer.value.name,
    gens: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    possibleTypes: Object.values(POKEMON_TYPE),
    sureTypes: [],
    minHeight: 0.0,
    maxHeight: 99999.99,
    minWeight: 0.0,
    maxWeight: 99999.99,
  });
}

function selectPokemon(pokemon: any) {
  selectedPokemon.value = pokemon;
}

function addSquirdle() {
  if (!selectedPokemon.value) return;

  const blueSquare = "\udfe6";
  const redSquare = "\udfe5";
  const greenSquare = "\udfe9";
  const yellowSquare = "\udfe8";
  const arrowUp = "\udd3c";
  const arrowDown = "\udd3d";

  const newHint = newSquirdleResult.value.split("\n")[1];
  const newHints = newHint.split("");
  let targetPlayer: Player = selectedPlayer.value;

  if (newHints[1] === greenSquare) {
    targetPlayer.gens = [selectedPokemon.value.gen];
  } else if (newHints[1] === blueSquare) {
    targetPlayer.gens = targetPlayer.gens.filter(
      (gen) => gen !== selectedPokemon.value!.gen
    );
  }

  if (
    newHints[3] === greenSquare &&
    !targetPlayer.sureTypes.find(
      (type) => type === selectedPokemon.value!.type1
    )
  ) {
    targetPlayer.sureTypes.push(selectedPokemon.value!.type1);
  } else if (
    newHints[3] === yellowSquare &&
    !targetPlayer.sureTypes.find(
      (type) => type === selectedPokemon.value!.type2
    )
  ) {
    targetPlayer.sureTypes.push(selectedPokemon.value!.type2);
  } else if (newHints[3] === redSquare) {
    targetPlayer.possibleTypes = targetPlayer.possibleTypes.filter(
      (type) => type !== selectedPokemon.value!.type1
    );
  }

  if (
    newHints[5] === greenSquare &&
    !targetPlayer.sureTypes.find(
      (type) => type === selectedPokemon.value!.type2
    )
  ) {
    targetPlayer.sureTypes.push(selectedPokemon.value!.type2);
  } else if (
    newHints[5] === yellowSquare &&
    !targetPlayer.sureTypes.find(
      (type) => type === selectedPokemon.value!.type1
    )
  ) {
    targetPlayer.sureTypes.push(selectedPokemon.value!.type1);
  } else if (newHints[5] === redSquare) {
    targetPlayer.possibleTypes = targetPlayer.possibleTypes.filter(
      (type) => type !== selectedPokemon.value!.type2
    );
  }

  if (newHints[7] === greenSquare) {
    targetPlayer.minHeight = selectedPokemon.value.height;
    targetPlayer.maxHeight = selectedPokemon.value.height;
  } else if (
    newHints[7] === arrowDown &&
    selectedPokemon.value.height > targetPlayer.minHeight
  ) {
    targetPlayer.minHeight = selectedPokemon.value.height;
  } else if (
    newHints[7] === arrowUp &&
    selectedPokemon.value.height < targetPlayer.maxHeight
  ) {
    targetPlayer.maxHeight = selectedPokemon.value.height;
  }

  if (newHints[9] === greenSquare) {
    targetPlayer.minWeight = selectedPokemon.value.weight;
    targetPlayer.maxWeight = selectedPokemon.value.weight;
  } else if (
    newHints[9] === arrowDown &&
    selectedPokemon.value.weight > targetPlayer.minWeight
  ) {
    targetPlayer.minWeight = selectedPokemon.value.weight;
  } else if (
    newHints[9] === arrowUp &&
    selectedPokemon.value.weight < targetPlayer.maxWeight
  ) {
    targetPlayer.maxWeight = selectedPokemon.value.weight;
  }

  updatePlayer(targetPlayer);
  newSquirdleResult.value = "";
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-xl font-semibold">Squirdle Guesser</h1>
    <div
      id="pokedex-search"
      class="bg-black/20 rounded-lg p-4 flex flex-col gap-4"
    >
      <input type="text" v-model="filterText" />
      <div class="bg-white/10 rounded-lg px-4 py-1">
        {{ filteredPokedex.length }} risultati
      </div>
      <div class="h-[30vh] overflow-auto bg-white/10 rounded-lg p-4">
        <div
          v-for="pokemon in filteredPokedex"
          class="flex flex-row gap-2 hover:bg-white/5 cursor-pointer px-2 rounded-lg"
          :class="{
            '!bg-[#003B3B]': selectedPokemon?.name === pokemon.name,
          }"
          @pointerdown="() => selectPokemon(pokemon)"
        >
          <span v-if="selectedPokemon?.name === pokemon.name">✓</span>
          <span>{{ pokemon.name }}</span>
        </div>
      </div>
    </div>

    <div id="add-player" class="bg-black/20 rounded-lg p-4 flex flex-col gap-4">
      <h2>Aggiungi giocatore</h2>
      <div class="flex flex-row gap-4">
        <input type="text" v-model="newPlayerName" class="w-full" />
        <button @click="addPlayer">Aggiungi</button>
      </div>
    </div>

    <div
      id="add-squirdle-result"
      class="bg-black/20 rounded-lg p-4 flex flex-col gap-4"
    >
      <h2>Nuovo Squirdle</h2>
      <div class="flex flex-row gap-4">
        <select
          class="w-full"
          :disabled="!players?.length"
          v-model="selectedPlayer"
        >
          <option v-for="player in players" :value="player">
            {{ player.name }}
          </option>
        </select>
      </div>
      <div class="flex flex-col gap-4">
        <textarea
          type="text"
          v-model="newSquirdleResult"
          class="w-full h-[15vh]"
          :disabled="!selectedPokemon"
        ></textarea>
        <button
          @click="addSquirdle"
          :disabled="!selectedPokemon || !selectedPlayer"
        >
          Aggiungi
        </button>
        <button @click="resetPlayer" :disabled="!selectedPlayer">
          Reset Giocatore
        </button>
      </div>
    </div>

    <div
      id="pokedex-search"
      class="bg-black/20 rounded-lg p-4 flex flex-col gap-4"
    >
      <div class="bg-white/10 rounded-lg px-4 py-1">
        {{ possiblePokemons.length }} risultati
      </div>
      <div class="h-[30vh] overflow-auto bg-white/10 rounded-lg p-4">
        <div
          v-for="pokemon in possiblePokemons"
          class="flex flex-row gap-2 hover:bg-white/5 cursor-pointer px-2 rounded-lg"
        >
          <span>{{ pokemon.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
