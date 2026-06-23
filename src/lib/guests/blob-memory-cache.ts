import type { Guest } from "../types";

type GuestMemoryCache = {
  guests: Guest[];
  fetchedAt: number;
};

let memoryCache: GuestMemoryCache | null = null;
let inflightRead: Promise<Guest[]> | null = null;

const MEMORY_TTL_MS = Number(process.env.GUEST_BLOB_CACHE_TTL_MS ?? 120_000);

export function getBlobGuestMemoryCache(): Guest[] | null {
  if (!memoryCache) return null;
  if (Date.now() - memoryCache.fetchedAt >= MEMORY_TTL_MS) return null;
  return memoryCache.guests;
}

export function setBlobGuestMemoryCache(guests: Guest[]): void {
  memoryCache = { guests, fetchedAt: Date.now() };
}

export function invalidateBlobGuestMemoryCache(): void {
  memoryCache = null;
}

export async function withBlobGuestSingleflight(
  read: () => Promise<Guest[]>,
): Promise<Guest[]> {
  const cached = getBlobGuestMemoryCache();
  if (cached) return cached;

  if (!inflightRead) {
    inflightRead = read().finally(() => {
      inflightRead = null;
    });
  }

  const guests = await inflightRead;
  setBlobGuestMemoryCache(guests);
  return guests;
}
