<script setup>
import { defineProps, defineEmits, computed } from "vue";
import Swal from "sweetalert2";

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close"]); // CORRECTO: Guardamos el emit en una constante

const pokemon = computed(() => ({
  ...props.pokemon,
  types: props.pokemon.types || [],
}));

const sharePokemon = () => {
  if (!pokemon.value) return;

  const text = `Name: ${pokemon.value.name}, Height: ${
    pokemon.value.height / 10
  }m, Weight: ${pokemon.value.weight / 10}kg, Types: ${pokemon.value.types.join(
    ", "
  )}`;

  navigator.clipboard.writeText(text).then(() => {
    Swal.fire({
      icon: "success",
      title: "¡Copiado!",
      text: "📋 La información del Pokémon se copió al portapapeles.",
      confirmButtonColor: "#3085d6",
    }).then(() => {
      emit("close"); // CORRECTO: Cerramos el modal después del mensaje
    });
  });
};
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
      <p class="text-gray-600">
        <strong>Tipos:</strong>
        {{ pokemon.types.length ? pokemon.types.join(", ") : "Desconocido" }}
      </p>

      <!-- Botones alineados en la parte inferior -->
      <div class="flex justify-between w-full mt-4">
        <button
          @click="sharePokemon"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all flex-1 mr-2"
        >
          🔗 Compartir
        </button>

        <button
          @click="emit('close')"
          class="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all flex-1 ml-2"
        >
          ✖ Cerrar
        </button>
      </div>
    </div>
  </div>
</template>
