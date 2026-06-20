import * as XLSX from "xlsx";
import { buildInvitationUrl, getInviteTypeLabel } from "./invitation-url";
import type { Guest } from "./types";

export function exportGuestsToExcel(guests: Guest[]) {
  const rows = guests.map((guest) => ({
    "First Name": guest.firstName,
    Surname: guest.surname,
    "Full Name": `${guest.firstName} ${guest.surname}`,
    Type: getInviteTypeLabel(guest.inviteType),
    Slug: guest.slug,
    "Invitation Link": buildInvitationUrl(guest.slug, guest.inviteType),
    Added: new Date(guest.createdAt).toLocaleString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet["!cols"] = [
    { wch: 14 },
    { wch: 14 },
    { wch: 24 },
    { wch: 14 },
    { wch: 20 },
    { wch: 48 },
    { wch: 22 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Guest List");

  const date = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(workbook, `oxa-guest-list-${date}.xlsx`);
}
