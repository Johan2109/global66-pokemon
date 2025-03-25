<script setup>
import { usePokemonStore } from "@/store/usePokemonStore";
import { defineProps, defineEmits } from "vue";
import Swal from "sweetalert2";

const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
  showButton: {
    type: Boolean,
    default: true,
  },
  showRemoveButton: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["select"]);

const store = usePokemonStore();

const addToFavorites = () => {
  if (props.pokemon) {
    store.addFavorite(props.pokemon.name);
  }
};

const removeFromFavorites = async () => {
  if (props.pokemon) {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Vas a eliminar a ${props.pokemon.name} de tus favoritos.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      store.removeFavorite(props.pokemon.name);
      Swal.fire({
        title: "Eliminado",
        text: `${props.pokemon.name} ha sido eliminado de favoritos.`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }
};
</script>

<template>
  <div
    class="border p-6 rounded-lg shadow-lg text-center bg-white hover:shadow-xl transition-shadow cursor-pointer"
    @click="emit('select', pokemon)"
  >
    <img
      v-if="pokemon.image"
      :src="pokemon.image"
      :alt="pokemon.name"
      class="mx-auto w-24 h-24 rounded-full border-2 border-gray-200 shadow-sm"
    />
    <p class="text-xl font-semibold mt-2 capitalize text-gray-800">
      {{ pokemon.name }}
    </p>

    <div class="flex justify-center gap-4 mt-4">
      <button
        v-if="showButton"
        @click.stop="addToFavorites"
        class="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-all active:scale-95"
      >
        ⭐ Agregar a favoritos
      </button>

      <button
        v-if="showRemoveButton"
        @click.stop="removeFromFavorites"
        class="bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:from-red-600 hover:to-red-800 transition-all active:scale-95"
      >
        Eliminar de favoritos
      </button>
    </div>
  </div>
</template>
