import { guestRepository } from "./index";
import { normalizeGuest } from "./normalize-guest";
import type { Guest } from "../types";

export async function resolveGuestBySlug(slug: string): Promise<Guest | null> {
  const guest = await guestRepository.getBySlug(slug);
  if (!guest) return null;
  return normalizeGuest(guest);
}
