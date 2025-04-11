<template>
  <div v-for="(item, key) in filteredCurrencyData" :key="key">
    <strong>1 {{ firstPartKey(key) }}</strong> =
    {{ item }}
    {{ selectedCurrency }}
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";

import { useCurrencyStore } from "@/store/currencyStore";
const currencyStore = useCurrencyStore();
const { selectedCurrency, currencyData } = storeToRefs(currencyStore);
onMounted(async () => {
  await currencyStore.fetchApi();
});
const firstPartKey = function (params: string) {
  return params.split("-")[0];
};
const filteredCurrencyData = computed(() => {
  if (!currencyData.value || !selectedCurrency.value) return {};

  return Object.fromEntries(
    Object.entries(currencyData.value).filter(([key]) =>
      key.endsWith(`-${selectedCurrency.value}`),
    ),
  );
});
</script>
