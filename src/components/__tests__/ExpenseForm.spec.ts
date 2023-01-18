import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ExpenseForm from "../ExpenseForm.vue";

describe("ExpenseForm", () => {
  it("renders properly", () => {
    const props = {
      open: true,
    };
    const wrapper = mount(ExpenseForm, { props });
    expect(wrapper.text()).toContain("Tambah Entri");
  });
});
