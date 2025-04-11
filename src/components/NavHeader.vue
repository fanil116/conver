<template>
  <div class="d-flex align-center">
    <div v-for="(item, i) in routes" :key="i" class="mr-3">
      <router-link :to="item.url">
        {{ item.name }}
      </router-link>
    </div>
    <base-select
      v-model:selected="selectedCurrency"
      :items="currencyItems"
      :variant="'filled'"
      :width="'300'"
      class="ml-6"
    />
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";

import BaseSelect from "@/components/ui/form/BaseSelect.vue";
import { useCurrencyStore } from "@/store/currencyStore";
const currencyStore = useCurrencyStore();
const { currencyItems, selectedCurrency } = storeToRefs(currencyStore);
const routes = [
  { name: "Home", url: "/" },
  { name: "Convertation", url: "/convertation" },
];
</script>
