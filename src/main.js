import { createApp } from "vue"; // Crea la instancia de la aplicación Vue
import App from "./App.vue"; // Componente raíz
import router from "./router"; // Importa el sistema de rutas
import { createPinia } from "pinia"; // Importa Pinia para la gestión del estado
import "./assets/main.css"; // Importa los estilos globales

// Crear la aplicación Vue
const app = createApp(App);

// Configurar plugins
app.use(router); // Habilita Vue Router
app.use(createPinia()); // Habilita Pinia como store global

// Montar la aplicación en el HTML
app.mount("#app");
