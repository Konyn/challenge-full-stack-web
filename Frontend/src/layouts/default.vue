<template>
  <v-app>
    <v-app-bar
      hidden
      height="100"
      class="ps-4"
    >
      <Header />
    </v-app-bar>
    <v-main class="mx-6">
      <Sidebar />
      <Notification />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Header from "@/components/layouts/Header.vue";

//
</script>
