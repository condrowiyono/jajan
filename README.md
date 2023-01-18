<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Aplikasi Diary Jajan</h3>
  <p align="center">
    Website Aplikasi Jajan
    <br />
    <a href="https://github.com/condrowiyono/jajan"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://jajan-kappa.vercel.app/">View Demo on Vercel</a>
    ·
    <a href="https://github.com/condrowiyono/jajan/issues">Report Bug</a>
  </p>
</div>

### Video
![record](https://user-images.githubusercontent.com/14830052/213284621-e1b78644-d96a-4a4b-a969-6d5cf659df5e.gif)


### Project Boilerplate

Project ini di-bootstrap menggunakan [create-vue](https://github.com/vuejs/create-vue). Menggunakan framework vuejs dan bundler vite, serta typescript. Secara lengka menggunakan konfigurasi sebagai berikut:

<img width="540" alt="image" src="https://user-images.githubusercontent.com/14830052/213282263-843ce7e8-29b2-4c79-b02b-e00890cc0677.png">

Ditambah dengan Vuex sebagai state management

### Struktur Folder
- `assets` (berisi `main.css` -> global css)
- `components` (berisi `ExpenseForm` dan `ExpenseCard`)
- `router` (berisi konfigurasi `vue-router`)
- `store` (berisi state management file)
- `types` (berisi type definition)
- `utils` (berisi `currency` dan `date` yang menggunakan [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) sebagai formatting template, dan `fetcher` untuk call API menggunakan `fetch`)
- `view` (berisi `HomeView` dengan utils [groupItem](https://github.com/condrowiyono/jajan/edit/main/README.md#groupitem) yang mengubah response API menjadi group berdasarkan bulan dan tanggal)

### Instalasi di Lingkungan Pengembangan

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Utils File
## groupItem
```ts
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

```

### date, currency
```ts
const formatDate = (value: Date) =>
  new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(value);

const formatTime = (value: Date) =>
  new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(value);

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};
```

## Unit Test
<img width="571" alt="Screen Shot 2023-01-19 at 03 06 57" src="https://user-images.githubusercontent.com/14830052/213283591-9fdc1343-17b9-47ea-a590-f223c4b2b5f0.png">
