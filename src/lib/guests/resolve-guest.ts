import { guestRepository } from "./index";
import { normalizeGuest } from "./normalize-guest";
import type { Guest, InviteType } from "../types";

export async function resolveGuestBySlug(
  slug: string,
  expectedType?: InviteType,
): Promise<Guest | null> {
  const guest = await guestRepository.getBySlug(slug);
  if (!guest) return null;

  const normalized = normalizeGuest(guest);
  if (expectedType && normalized.inviteType !== expectedType) {
    return null;
  }

  return normalized;
}
