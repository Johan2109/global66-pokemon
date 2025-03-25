<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const showWelcome = ref(true);
const route = useRoute(); // Obtiene la ruta actual

// Ocultar la pantalla de bienvenida y mostrar el contenido principal
const startApp = () => {
  showWelcome.value = false;
};
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-b from-blue-100 to-white"
  >
    <!-- Pantalla de Bienvenida -->
    <transition name="fade">
      <div
        v-if="showWelcome"
        class="min-h-screen flex flex-col items-center justify-center px-6"
      >
        <div class="bg-white p-6 rounded-full shadow-lg">
          <img
            src="https://global66.com/ui-kit/assets/at-logo-text-right/logo-textRight.svg"
            alt="Global66 Logo"
            class="h-24"
          />
        </div>
        <h1 class="text-2xl font-semibold text-gray-800 mt-6">
          Bienvenido a la Plataforma
        </h1>
        <p class="text-gray-600 text-center mt-2 max-w-md">
          Gestiona tus solicitudes y usuarios fácilmente con nuestra aplicación
          intuitiva.
        </p>
        <button
          @click="startApp"
          class="mt-6 bg-[#2F5EE5] text-white px-6 py-3 rounded-full shadow-md transition hover:bg-[#1F4DBE]"
        >
          Empezar ahora
        </button>
      </div>
    </transition>

    <!-- Contenido Principal -->
    <transition name="fade">
      <div v-if="!showWelcome" class="flex flex-col min-h-screen">
        <!-- Navbar con Logo -->
        <nav
          class="bg-white shadow-md py-4 px-6 flex justify-between items-center"
        >
          <img
            src="https://global66.com/ui-kit/assets/at-logo-text-right/logo-textRight.svg"
            alt="Global66 Logo"
            class="h-12"
          />
        </nav>

        <!-- Contenido Principal -->
        <main
          class="flex-grow max-w-5xl mx-auto p-8 bg-white shadow-md rounded-xl mt-10"
        >
          <RouterView />
        </main>

        <!-- Barra de Navegación Inferior -->
        <div
          class="fixed bottom-0 left-0 w-full bg-white shadow-lg py-3 flex justify-around border-t"
        >
          <RouterLink
            to="/"
            :class="[
              'flex flex-col items-center font-medium transition transform hover:scale-105 px-6 py-2 rounded-full',
              route.path === '/'
                ? 'bg-[#2F5EE5] text-white'
                : 'text-[#2F5EE5] hover:text-[#1F4DBE]',
            ]"
          >
            <span class="text-3xl">📋</span>
            <span class="mt-1 text-lg">Todos</span>
          </RouterLink>

          <RouterLink
            to="/favorites"
            :class="[
              'flex flex-col items-center font-medium transition transform hover:scale-105 px-6 py-2 rounded-full',
              route.path === '/favorites'
                ? 'bg-yellow-500 text-white'
                : 'text-gray-500 hover:text-yellow-500',
            ]"
          >
            <span class="text-3xl">⭐</span>
            <span class="mt-1 text-lg">Favoritos</span>
          </RouterLink>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
/* Animación de transición */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
