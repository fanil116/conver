/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import { createPinia } from "pinia";
import { createApp } from "vue";

import { registerPlugins } from "@/plugins";

import App from "./App.vue";

const app = createApp(App);

registerPlugins(app);
app.use(createPinia());
app.mount("#app");
