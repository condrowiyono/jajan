const MONTH: Record<number, string> = {
  1: "Januari",
  2: "Februari",
  3: "Maret",
  4: "April",
  5: "Mei",
  6: "Juni",
  7: "Juli",
  8: "Agustus",
  9: "September",
  10: "Oktober",
  11: "November",
  12: "Desember",
};

function getMonthName(month: number): string {
  return MONTH[month];
}

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

export { getMonthName, formatDate, formatTime };
