<template>
  <v-select
    v-model="selected"
    :label="props.label"
    :items="items"
    :variant="props.variant"
    :max-width="props.width"
    item-title="name"
    density="compact"
  ></v-select>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import { ref, watch } from "vue";

import type { TCurrencyItem } from "@/store/currencyStore";
const props = defineProps({
  label: {
    type: String,
    required: false,
    default: "",
  },

  variant: {
    type: String as () =>
      | "filled"
      | "outlined"
      | "plain"
      | "underlined"
      | "solo"
      | "solo-inverted"
      | "solo-filled"
      | undefined,
    required: false,
    default: "outlined",
  },
  items: {
    type: Array as () => TCurrencyItem[],
    required: true,
  },
  selected: {
    type: String,
    required: true,
  },
  width: {
    type: [Number, String],
    required: false,
    default: "auto",
  },
});

const emit = defineEmits<{
  (e: "update:selected", value: string): void;
}>();
const selected = ref(props.selected);
watch(selected, (newValue) => {
  emit("update:selected", newValue);
});
</script>
