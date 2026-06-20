import type { Guest, InviteType } from "../types";

export function normalizeGuest(
  guest: Omit<Guest, "inviteType"> & { inviteType?: InviteType },
): Guest {
  return {
    ...guest,
    inviteType: guest.inviteType ?? "pool-club",
  };
}

export function normalizeGuests(guests: Array<Omit<Guest, "inviteType"> & { inviteType?: InviteType }>): Guest[] {
  return guests.map(normalizeGuest);
}
