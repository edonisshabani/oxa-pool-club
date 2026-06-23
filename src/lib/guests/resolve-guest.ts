import { guestRepository } from "./index";
import { resolveGuestBySlugCached } from "./guest-cache";
import type { Guest } from "../types";

export async function resolveGuestBySlug(slug: string): Promise<Guest | null> {
  return resolveGuestBySlugCached(slug);
}
