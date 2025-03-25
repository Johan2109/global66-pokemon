import { defineStore } from "pinia";
import { fetchPokemonList, fetchPokemonDetails } from "@/api/pokemonService";

export const usePokemonStore = defineStore("pokemon", {
  state: () => ({
    pokemonList: [],
    favorites: [],
    loading: false,
  }),

  actions: {
    // Cargar la lista de Pokémon desde la API
    async loadPokemon() {
      try {
        this.loading = true;
        this.pokemonList = await fetchPokemonList();
      } catch (error) {
        console.error("Error al cargar la lista de Pokémon:", error);
      } finally {
        this.loading = false;
      }
    },

    // Agregar un Pokémon a favoritos y eliminarlo de la lista principal
    async addFavorite(name) {
      const pokemonIndex = this.pokemonList.findIndex((p) => p.name === name);

      if (pokemonIndex !== -1) {
        try {
          const pokemon = await fetchPokemonDetails(name);
          this.favorites.push(pokemon);
          this.pokemonList.splice(pokemonIndex, 1); // Elimina el Pokémon de la lista principal
        } catch (error) {
          console.error(`Error al obtener detalles de ${name}:`, error);
        }
      }
    },

    // Eliminar un Pokémon de favoritos y volver a agregarlo a la lista principal
    removeFavorite(name) {
      const pokemonIndex = this.favorites.findIndex((p) => p.name === name);

      if (pokemonIndex !== -1) {
        const pokemon = this.favorites[pokemonIndex];
        this.favorites.splice(pokemonIndex, 1); // Elimina el Pokémon de favoritos
        this.pokemonList.push(pokemon); // Lo vuelve a agregar a la lista principal
      }
    },
  },
});
