<script setup lang="ts">
import { useRoute } from 'vue-router'
import Sidebar from '@/components/sidebar.vue';
import LoginView from '@/views/login_view.vue';

const route = useRoute()  
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center" v-if="route.name === 'login'" >
    <LoginView />
  </div>
  <div class="w-screen h-screen" v-if="route.name !== 'login'" >
    <Sidebar />
  </div>
</template>

<style scoped>

</style>