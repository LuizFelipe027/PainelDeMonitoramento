<template>
  <AppHeader />
  <main>
    <div class="max-w-[1200px] mx-auto">
      <router-view />
    </div>
  </main>
</template>

<script setup>
import AppHeader from "../components/AppHeader.vue";
</script>
