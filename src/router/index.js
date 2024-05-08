import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from '../components/DefaultLayout.vue';
import GuestLayout from '../components/GuestLayout.vue';
import Home from '../views/Home.vue';
import Logs from '../views/Logs.vue';
import Integracao from '../views/Integracao.vue';


const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: Home,
      },
      {
        path: "/logs",
        name: "logs",
        component: Logs,
      },
      {
        path: "/integracoes",
        name: "integracoes",
        component: Integracao,
      },
      // {
      //   path: "/by-letter/:letter?",
      //   name: "byLetter",
      //   component: MealsByLetter,
      // },
      // {
      //   path: "/ingredients",
      //   name: "ingredients",
      //   component: Ingredients,
      // },
      // {
      //   path: "/by-ingredient/:ingredient",
      //   name: "byIngredient",
      //   component: MealsByIngredient,
      // },
      // {
      //   path: '/meal/:id',
      //   name: 'mealDetails',
      //   component: MealDetails
      // }
    ]
  },
  {
    path: '/guest',
    component: GuestLayout
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
