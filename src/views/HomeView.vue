<template>
  <main>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <div v-for="(item, key) in data" :key="key">
        <h2>Diari Jajan Bulan {{ key }}</h2>
        <h3>Pengeluaran Bulan ini {{ formatCurrency(total?.[key] || 0) }}</h3>
        <button class="primary" @click="open = true">TAMBAH ITEM</button>
        <div class="container">
          <ExpenseCard
            v-for="(expense, key) in item"
            :key="key"
            :date="key"
            :items="expense"
          />
        </div>
      </div>
    </div>
    <ExpenseForm :open="open" @close="open = false" @submit="handleSubmit" />
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

import ExpenseCard from "@/components/ExpenseCard.vue";
import ExpenseForm from "@/components/ExpenseForm.vue";
import type { Expense } from "@/types/Expense";
import { formatCurrency } from "@/utils/currency";
import type { State } from "@/store/index";

import { groupExpense } from "./utils/group";

export default defineComponent({
  components: {
    ExpenseCard,
    ExpenseForm,
  },
  setup() {
    const store = useStore<State>();

    const fetch = () => store.dispatch("fetchItems");
    const add = (item: Expense) => store.dispatch("addItem", item);
    const items = computed(() => store.state.items);
    const loading = computed(() => store.state.loading);
    const error = computed(() => store.state.error);

    return {
      items,
      loading,
      error,
      add,
      fetch,
    };
  },
  data() {
    return {
      data: undefined as Record<string, Record<string, Expense[]>> | undefined,
      total: undefined as Record<string, number> | undefined,
      open: false,
    };
  },
  mounted() {
    this.fetch();
  },
  watch: {
    items: {
      handler() {
        const { data, total } = groupExpense(this.items);

        this.data = data;
        this.total = total;
      },
      immediate: true,
    },
  },
  methods: {
    formatCurrency,
    handleSubmit(value: Expense) {
      this.add(value);
      this.open = false;
    },
  },
});
</script>

<style scoped>
main {
  box-sizing: border-box;
  margin: auto;
  width: 1280px;
  padding: 16px;
}

h2,
h3 {
  text-align: center;
  margin-block: 0;
}

button {
  margin-block: 8px;
  display: block;
  margin-inline: auto;
}

@media (max-width: 1280px) {
  main {
    width: 100%;
  }
}
.container {
  padding-block: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 12px;
}
</style>
