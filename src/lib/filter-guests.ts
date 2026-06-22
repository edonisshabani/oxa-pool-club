import { getInviteTypeLabel } from "./invitation-url";
import type { Guest } from "./types";

export function guestMatchesSearch(guest: Guest, query: string): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;

  const haystack = [
    guest.firstName,
    guest.surname,
    `${guest.firstName} ${guest.surname}`,
    guest.slug,
    getInviteTypeLabel(guest.inviteType),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalized);
}
