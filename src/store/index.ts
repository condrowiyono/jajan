import { createStore } from "vuex";
import type { Expense } from "@/types/Expense";
import fetcher from "@/utils/fetcher";

export type State = {
  items: Expense[];
  loading: boolean;
  error: Error | null;
};

export default createStore<State>({
  state: {
    items: [],
    loading: false,
    error: null,
  },
  getters: {
    getItems: (state) => state.items,
  },
  actions: {
    async fetchItems({ commit }) {
      commit("SET_ITEMS_LOADING");
      try {
        const resp = await fetcher<Expense[]>("http://localhost:3000/items");

        commit("SET_ITEMS", resp);
      } catch (error) {
        commit("SET_ITEMS_ERROR", error);
      }
    },

    async addItem({ commit }, item: Expense) {
      const newData = [item].concat(this.state.items);
      commit("SET_ITEMS", newData);
    },
  },
  mutations: {
    SET_ITEMS_LOADING(state) {
      state.loading = true;
      state.error = null;
    },
    SET_ITEMS(state, items) {
      state.items = items;
      state.loading = false;
    },
    SET_ITEMS_ERROR(state, error) {
      state.error = error;
      state.loading = false;
    },
  },
});
