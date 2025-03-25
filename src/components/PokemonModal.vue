<script setup>
import { defineProps, defineEmits, computed } from "vue";
import Swal from "sweetalert2";

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["close"]);

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
      emit("close");
    });
  });
};
</script>

<template>
  <div
    v-if="pokemon"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md p-4"
  >
    <div
      class="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm transform transition-all scale-95 opacity-0 animate-fadeIn flex flex-col items-center"
    >
      <!-- Imagen del Pokémon -->
      <img
        :src="pokemon.image"
        :alt="pokemon.name"
        class="w-40 h-40 object-contain mx-auto drop-shadow-lg"
      />

      <!-- Nombre del Pokémon -->
      <h2
        class="text-3xl font-bold mt-4 capitalize text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text"
      >
        {{ pokemon.name }}
      </h2>

      <!-- Detalles -->
      <div class="mt-3 text-gray-700 text-center space-y-1">
        <p><strong>Altura:</strong> {{ pokemon.height / 10 }} m</p>
        <p><strong>Peso:</strong> {{ pokemon.weight / 10 }} kg</p>
        <p>
          <strong>Tipos:</strong>
          {{ pokemon.types.length ? pokemon.types.join(", ") : "Desconocido" }}
        </p>
      </div>

      <!-- Botones alineados -->
      <div class="flex justify-between w-full mt-5 gap-3">
        <button
          @click="sharePokemon"
          class="flex-1 bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          🔗 Compartir
        </button>

        <button
          @click="emit('close')"
          class="flex-1 bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all"
        >
          ✖ Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<style>
/* Animación para el modal */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>
