<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});

defineEmits(["close"]);
</script>

<template>
  <div
    v-if="pokemon"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div
      class="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col items-center"
    >
      <!-- Imagen del Pokémon -->
      <img
        :src="pokemon.image"
        :alt="pokemon.name"
        class="w-48 h-48 object-contain mx-auto"
      />

      <!-- Nombre del Pokémon -->
      <h2 class="text-2xl font-bold mt-4 capitalize text-center text-gray-800">
        {{ pokemon.name }}
      </h2>

      <!-- Detalles -->
      <p class="text-gray-600 mt-2">
        <strong>Altura:</strong> {{ pokemon.height / 10 }} m
      </p>
      <p class="text-gray-600">
        <strong>Peso:</strong> {{ pokemon.weight / 10 }} kg
      </p>

      <!-- Botón de cierre -->
      <button
        @click="$emit('close')"
        class="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all"
      >
        Cerrar
      </button>
    </div>
  </div>
</template>
