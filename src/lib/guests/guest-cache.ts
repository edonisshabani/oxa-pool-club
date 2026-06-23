import { revalidateTag, unstable_cache } from "next/cache";
import { guestRepository } from "./index";
import { invalidateBlobGuestMemoryCache } from "./blob-memory-cache";
import { normalizeGuest } from "./normalize-guest";
import type { Guest } from "../types";

export const GUEST_LIST_CACHE_TAG = "guests";

const REVALIDATE_SECONDS = Number(process.env.GUEST_CACHE_REVALIDATE_SECONDS ?? 300);

export const getCachedGuestList = unstable_cache(
  async (): Promise<Guest[]> => guestRepository.getAll(),
  ["guest-list"],
  {
    revalidate: REVALIDATE_SECONDS,
    tags: [GUEST_LIST_CACHE_TAG],
  },
);

export async function resolveGuestBySlugCached(slug: string): Promise<Guest | null> {
  const guests = await getCachedGuestList();
  const normalized = slug.toLowerCase();
  const guest = guests.find((item) => item.slug.toLowerCase() === normalized);
  return guest ? normalizeGuest(guest) : null;
}

export async function invalidateGuestCaches(): Promise<void> {
  invalidateBlobGuestMemoryCache();
  revalidateTag(GUEST_LIST_CACHE_TAG, { expire: 0 });
}
