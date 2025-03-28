<script setup>
import { ref, computed, onMounted } from "vue";
import { usePokemonStore } from "@/store/usePokemonStore";
import PokemonCard from "@/components/PokemonCard.vue";
import PokemonModal from "@/components/PokemonModal.vue";

const store = usePokemonStore();
const selectedPokemon = ref(null);
const showModal = ref(false);

onMounted(() => {
  if (!store.pokemonList.length) {
    store.loadPokemon();
  }
});

// Generar imagen para cada Pokémon
const pokemonWithImages = computed(() =>
  store.pokemonList.map((pokemon) => {
    if (!pokemon.url) return pokemon;
    const id = pokemon.url.split("/").slice(-2, -1)[0];
    return {
      ...pokemon,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  })
);

// Abrir modal con detalles del Pokémon seleccionado
const openModal = (pokemon) => {
  selectedPokemon.value = pokemon;
  showModal.value = true;
};

// Cerrar modal asegurando que se limpie `selectedPokemon`
const closeModal = () => {
  showModal.value = false;
  selectedPokemon.value = null;
};
</script>

<template>
  <div class="max-w-7xl mx-auto p-4 sm:p-6">
    <h1 class="text-3xl font-bold text-center my-6 text-gray-800">
      🔥 Pokémons
    </h1>

    <div
      v-if="store.loading"
      class="text-center text-lg font-semibold text-gray-700"
    >
      Cargando...
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center"
    >
      <PokemonCard
        v-for="pokemon in pokemonWithImages"
        :key="pokemon.name"
        :pokemon="pokemon"
        @click="openModal(pokemon)"
      />
    </div>

    <!-- Modal -->
    <PokemonModal
      v-if="showModal && selectedPokemon"
      :pokemon="selectedPokemon"
      @close="closeModal"
    />
  </div>
</template>
