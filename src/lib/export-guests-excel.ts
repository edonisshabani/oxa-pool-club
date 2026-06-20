import * as XLSX from "xlsx";
import type { Guest } from "./types";

export function exportGuestsToExcel(guests: Guest[]) {
  const rows = guests.map((guest) => ({
    "First Name": guest.firstName,
    Surname: guest.surname,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet["!cols"] = [{ wch: 14 }, { wch: 14 }];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Guest List");

  const date = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `oxa-guest-list-${date}.xlsx`);
}
