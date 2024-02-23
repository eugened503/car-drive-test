import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "./store";
import { IMaskDirective } from "vue-imask";

createApp(App).directive("imask", IMaskDirective).use(store).mount("#app");
