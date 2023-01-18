<template>
  <div class="card">
    <div class="date">{{ date }}</div>
    <table>
      <tbody>
        <tr v-for="item in items" :key="item.jam">
          <td>{{ item.jam }}</td>
          <td>{{ item.nama }}</td>
          <td class="right">{{ formatCurrency(item.pengeluaran) }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">Total</td>
          <td class="right">{{ formatCurrency(total) }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup lang="ts">
type Props = {
  items?: Expense[];
  date?: string;
};

defineProps<Props>();
</script>

<script lang="ts">
import { defineComponent } from "vue";
import { formatCurrency } from "@/utils/currency";
import { getMonthName } from "@/utils/date";
import type { Expense } from "@/types/Expense";

export default defineComponent({
  name: "ExpenseCard",
  data() {
    return {
      total: 0,
    };
  },
  watch: {
    items: {
      handler() {
        this.calculateTotal();
      },
      immediate: true,
    },
  },
  methods: {
    formatCurrency,
    getMonthName,
    calculateTotal() {
      this.total = this.items?.reduce((acc, item) => {
        return acc + item.pengeluaran;
      }, 0) as number;
    },
  },
});
</script>

<style scoped>
.card {
  background-color: rgb(255, 255, 255);
  color: rgba(0, 0, 0, 0.87);
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: rgb(0 0 0 / 20%) 1px 2px 1px -1px;
  padding: 12px;
}

.date {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
