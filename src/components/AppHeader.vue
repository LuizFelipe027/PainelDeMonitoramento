<template>
  <header class="bg-[#6495ed] shadow h-14 flex justify-center items-stretch sticky top-0 z-50">
    <router-link :to="{ name: 'home' }" class="inline-flex items-center h-full px-5 text-white font-bold">
      Home
    </router-link>
    <router-link :to="{ name: 'logs' }" class="inline-flex items-center h-full px-5 text-white font-bold">
      Logs
    </router-link>
    <router-link :to="{ name: 'integracoes' }" class="inline-flex items-center h-full px-5 text-white font-bold">
      Integração
    </router-link>
  </header>
</template>