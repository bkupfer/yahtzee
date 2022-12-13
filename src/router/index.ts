import { createRouter, createWebHistory } from "vue-router";
import YatzyView from "@/views/YatzyView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: YatzyView,
    },
    {
      path: "/yatzy",
      name: "yatzy",
      component: YatzyView,
    },
  ],
});

export default router;
