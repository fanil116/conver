<template>
  <v-app>
    <v-main class="pa-5">
      <nav-header />
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import NavHeader from "@/components/NavHeader";
</script>
