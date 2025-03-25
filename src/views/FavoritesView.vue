<script setup>
import { ref } from "vue";
import { usePokemonStore } from "@/store/usePokemonStore";
import PokemonCard from "@/components/PokemonCard.vue";
import PokemonModal from "@/components/PokemonModal.vue";

const store = usePokemonStore();
const selectedPokemon = ref(null);
const showModal = ref(false);

// Abrir modal con detalles del Pokémon seleccionado
const openModal = (pokemon) => {
  selectedPokemon.value = pokemon;
  showModal.value = true;
};

// Cerrar modal
const closeModal = () => {
  showModal.value = false;
  selectedPokemon.value = null;
};
</script>

<template>
  <div class="max-w-7xl mx-auto p-4 sm:p-6">
    <h1 class="text-3xl font-bold text-center my-6 text-gray-800">
      ⭐ Mis Pokémons Favoritos
    </h1>

    <div
      v-if="store.favorites.length === 0"
      class="text-center text-lg text-gray-700"
    >
      No hay favoritos aún.
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center"
    >
      <PokemonCard
        v-for="pokemon in store.favorites"
        :key="pokemon.name"
        :pokemon="pokemon"
        :showButton="false"
        :showRemoveButton="true"
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
