import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ExpenseCard from "../ExpenseCard.vue";

describe("ExpenseCard", () => {
  it("renders properly", () => {
    const props = {
      date: "18 Februari 2021",
      items: [
        {
          jam: "03:15",
          tanggal: "18 Februari 2021",
          nama: "Ayam Tangkap",
          pengeluaran: 77249,
        },
        {
          jam: "03:15",
          tanggal: "18 Februari 2021",
          nama: "Mie Rebus",
          pengeluaran: 32154,
        },
      ],
    };
    const wrapper = mount(ExpenseCard, { props });
    // should display total correctly with currency
    expect(wrapper.text()).toContain("Rp\xa0109.403");
  });
});
