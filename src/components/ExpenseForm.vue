<template>
  <div v-if="open" class="wrapper" @click.self="$emit('close')">
    <dialog :open="open">
      <div>
        <h2>Tambah Entri</h2>
        <form @submit="submit">
          <label for="nama">Nama</label>
          <input autofocus id="nama" v-model="nama" />
          <span class="error" v-if="errors?.['nama']">
            {{ errors?.["nama"] }}
          </span>

          <label for="pengeluaran">Harga</label>
          <input type="number" v-model="pengeluaran" id="pengeluaran" />
          <span class="error" v-if="errors?.['pengeluaran']">
            {{ errors?.["pengeluaran"] }}
          </span>

          <div class="action">
            <button class="secondary" type="reset" @click="$emit('close')">
              BATAL
            </button>
            <button class="primary" type="submit">KIRIM</button>
          </div>
        </form>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import type { Expense } from "@/types/Expense";

defineProps<{ open: boolean }>();
defineEmits<{
  (e: "close"): void;
  (e: "submit", value: Expense): void;
}>();
</script>

<script lang="ts">
import { defineComponent } from "vue";
import { formatDate, formatTime } from "@/utils/date";

export default defineComponent({
  name: "ExpenseForm",
  data() {
    return {
      errors: {} as Record<string, string> | null,
      nama: "",
      pengeluaran: 1000,
    };
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.$emit("close");
      }
    });
  },
  watch: {
    // Reset every open dialog
    open(open) {
      if (open) {
        this.nama = "";
        this.pengeluaran = 1000;
        this.errors = null;
      }
    },
  },
  methods: {
    submit: function (e: Event) {
      e.preventDefault();

      // Simple Validation
      const errors: Record<string, string> = {};
      if (!this.nama) {
        errors.nama = "Nama wajib diisi.";
      }
      if (Number(this.pengeluaran) < 1) {
        errors.pengeluaran = "Harga minimal 1 rupiah";
      }
      // If there
      if (errors?.nama || errors?.pengeluaran) {
        this.errors = errors;
        return;
      }

      this.$emit("submit", {
        nama: this.nama,
        jam: formatTime(new Date()),
        tanggal: formatDate(new Date()),
        pengeluaran: this.pengeluaran,
      });
    },
  },
});
</script>

<style scoped>
.wrapper {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
}

form * {
  display: block;
  margin-block: 8px;
}

span.error {
  color: #bd1313;
}
.action {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

@media (max-width: 400px) {
  dialog[open] {
    width: 100%;
  }
}
</style>
