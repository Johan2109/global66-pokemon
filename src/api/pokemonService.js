import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

// Obtener la lista de Pokémon (primeros 100)
export const fetchPokemonList = async () => {
  try {
    const response = await axios.get(`${API_URL}?limit=100`);
    return response.data.results;
  } catch (error) {
    console.error("Error al obtener la lista de Pokémon:", error);
    return [];
  }
};

// Obtener detalles de un Pokémon en específico
export const fetchPokemonDetails = async (name) => {
  try {
    const response = await axios.get(`${API_URL}${name}`);
    return {
      name: response.data.name,
      id: response.data.id,
      image: response.data.sprites.front_default,
    };
  } catch (error) {
    console.error(`Error al obtener detalles de ${name}:`, error);
    return null;
  }
};
