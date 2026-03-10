<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { inject } from '@vercel/analytics'

// Only inject in the browser environment
if (import.meta.client) {
  inject()
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
  background-color: #f5f5f7;
  color: #1d1d1f;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>
