<template>
  <div class="d-flex">
    <v-card width="500" class="mr-6">
      <base-select
        v-model:selected="selectedCurrencyOne"
        :items="currencyNames"
        :variant="'filled'"
        :label="'Валюта 1'"
      />
      <v-text-field
        v-model="inputValueOne"
        label="Сумма 1"
        type="number"
        :clearable="true"
        dense
        @input="convertCurrency"
      />
    </v-card>

    <v-card width="500">
      <base-select
        v-model:selected="selectedCurrencyTwo"
        :items="currencyNames"
        :variant="'filled'"
        :label="'Валюта 2'"
      />
      <v-text-field
        v-model="inputValueTwo"
        label="Сумма 2"
        type="number"
        :clearable="true"
        dense
        @input="convertCurrency"
      />
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";

import BaseSelect from "@/components/ui/form/BaseSelect.vue";
import { useCurrencyStore } from "@/store/currencyStore";

const currencyStore = useCurrencyStore();
const { currencyData, currencyItems } = storeToRefs(currencyStore);

const selectedCurrencyOne = ref<string>("rub");
const selectedCurrencyTwo = ref<string>("usd");
let currencyNames = computed(() =>
  currencyItems.value.map((item) => item.name),
);

const inputValueOne = ref<number>(1000);
const inputValueTwo = ref<number>(0);

const convertCurrency = () => {
  const rate = getConversionRate(
    selectedCurrencyOne.value,
    selectedCurrencyTwo.value,
  );

  if (selectedCurrencyOne.value === selectedCurrencyTwo.value) {
    inputValueTwo.value = inputValueOne.value;
  } else {
    inputValueTwo.value = (inputValueOne.value * rate).toFixed(2);
  }
};

const getConversionRate = (from: string, to: string): number => {
  if (!currencyData.value) return 0;

  const pair = `${from}-${to}`;
  return currencyData.value[pair] || 0;
};

watch([selectedCurrencyOne, selectedCurrencyTwo, inputValueOne], () => {
  convertCurrency();
});

onMounted(async () => {
  convertCurrency();
});
</script>
