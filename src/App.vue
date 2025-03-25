<script setup>
import { ref } from "vue";

const showWelcome = ref(true); // Estado para mostrar la pantalla de bienvenida

// Ocultar la pantalla de bienvenida y mostrar el contenido principal
const startApp = () => {
  showWelcome.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Pantalla de Bienvenida -->
    <transition name="fade">
      <div
        v-if="showWelcome"
        class="min-h-screen flex flex-col items-center justify-center bg-white px-6"
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
          class="flex-grow max-w-5xl mx-auto p-8 bg-gray-50 shadow-md rounded-xl mt-10"
        >
          <RouterView />
        </main>

        <!-- Barra de Navegación Inferior -->
        <div
          class="fixed bottom-0 left-0 w-full bg-white shadow-lg py-3 flex justify-around border-t"
        >
          <RouterLink
            to="/"
            class="flex flex-col items-center text-[#2F5EE5] font-medium hover:text-[#1F4DBE] transition"
          >
            <span class="text-2xl">📋</span>
            <span>Todos</span>
          </RouterLink>

          <RouterLink
            to="/favorites"
            class="flex flex-col items-center text-gray-500 hover:text-gray-800 transition"
          >
            <span class="text-2xl">⭐</span>
            <span>Favoritos</span>
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
