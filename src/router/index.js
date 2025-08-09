import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from '../components/DefaultLayout.vue';
import GuestLayout from '../components/GuestLayout.vue';
import Home from '../views/Home.vue';
import Logs from '../views/Logs.vue';
import Integracao from '../views/Integracao.vue';
import Automacao from '../views/Automacao.vue';


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
      {
        path: "/automacoes",
        name: "automacoes",
        component: Automacao,
      },
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
