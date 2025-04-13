import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export type TCurrencyItem = {
  name: string;
  symbol: string;
};

export const useCurrencyStore = defineStore("CurrencyStore", () => {
  const currencyItems = ref<TCurrencyItem[]>([
    { name: "usd", symbol: "$" },
    { name: "eur", symbol: "€" },
    { name: "rub", symbol: "₽" },
  ]);
  const fetchUrl = ref<string>(
    "https://status.neuralgeneration.com/api/currency",
  );
  const currencyData = ref<Record<string, number> | null>(null);

  const selectedCurrency = ref<string>("usd");

  const fetchApi = async () => {
    try {
      const response = await axios.get<Record<string, number>>(fetchUrl.value);
      if (response.data) {
        const validCurrencies = currencyItems.value.map((item) => item.name);
        // Фильтруем объект, оставляя только допустимые валюты
        currencyData.value = Object.fromEntries(
          Object.entries(response.data).filter(([key]) => {
            const [from, to] = key.split("-");
            return (
              validCurrencies.includes(from) && validCurrencies.includes(to)
            );
          }),
        );
      }
    } catch (error) {
      console.error("Error fetching global coins:", error);
    }
  };

  return {
    currencyItems,
    currencyData,
    selectedCurrency,
    fetchApi,
  };
});
