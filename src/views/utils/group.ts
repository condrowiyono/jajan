import type { Expense } from "@/types/Expense";
import { getMonthName } from "@/utils/date";

export function groupExpense(items: Expense[]) {
  const data = items.reduce((acc, item) => {
    const year = new Date(item.tanggal).getFullYear();
    const month = getMonthName(new Date(item.tanggal).getMonth() + 1);
    const my = `${month} ${year}`;
    const date = item.tanggal;

    if (!acc[my]) acc[my] = {};
    if (!acc[my][date]) acc[my][date] = [];

    acc[my][date].push(item);

    return acc;
  }, {} as Record<string, Record<string, Expense[]>>);

  const total = Object.keys(data).reduce((acc, month) => {
    acc[month] = Object.keys(data[month]).reduce((acc, date) => {
      acc += data[month][date].reduce((acc, item) => {
        acc += item.pengeluaran;
        return acc;
      }, 0);

      return acc;
    }, 0);

    return acc;
  }, {} as Record<string, number>);

  return { data, total };
}
