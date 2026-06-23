import { put } from "@vercel/blob";
import { createGuestSlug, ensureUniqueSlug } from "../slug";
import type { CreateGuestInput, Guest } from "../types";
import {
  invalidateBlobGuestMemoryCache,
  setBlobGuestMemoryCache,
  withBlobGuestSingleflight,
} from "./blob-memory-cache";
import { normalizeGuest, normalizeGuests } from "./normalize-guest";
import type { GuestRepository } from "./repository";

const BLOB_PATH = "guests.json";

/** CDN cache for private blob reads (min 60s). Overwritten on each guest write. */
const BLOB_CACHE_MAX_AGE_SECONDS = Number(
  process.env.GUEST_BLOB_CACHE_CONTROL_MAX_AGE ?? 86_400,
);

async function readGuestsFromBlob(): Promise<Guest[]> {
  const { get } = await import("@vercel/blob");

  try {
    const result = await get(BLOB_PATH, {
      access: "private",
      // Default is true — never bypass CDN for guest list reads.
      useCache: true,
    });

    if (!result || result.statusCode !== 200 || !result.stream) return [];

    const text = await new Response(result.stream).text();
    if (!text.trim()) return [];
    return normalizeGuests(JSON.parse(text) as Guest[]);
  } catch (error) {
    console.error("Failed to read guests from blob:", error);
    return [];
  }
}

async function readGuests(): Promise<Guest[]> {
  return withBlobGuestSingleflight(readGuestsFromBlob);
}

async function writeGuests(guests: Guest[]): Promise<void> {
  await put(BLOB_PATH, JSON.stringify(guests), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: Math.max(60, BLOB_CACHE_MAX_AGE_SECONDS),
  });

  setBlobGuestMemoryCache(guests);
}

/** Vercel Blob store — auto-configured when BLOB_READ_WRITE_TOKEN is set */
export const blobGuestRepository: GuestRepository = {
  async getAll() {
    return readGuests();
  },

  async getBySlug(slug: string) {
    const normalized = slug.toLowerCase();
    const guest = (await readGuests()).find((g) => g.slug.toLowerCase() === normalized);
    return guest ? normalizeGuest(guest) : null;
  },

  async create(input: CreateGuestInput) {
    const guests = await readGuests();
    const baseSlug = createGuestSlug(input.firstName, input.surname);
    const slug = ensureUniqueSlug(
      baseSlug,
      guests.map((g) => g.slug),
    );

    const guest: Guest = {
      id: crypto.randomUUID(),
      firstName: input.firstName.trim(),
      surname: input.surname.trim(),
      slug,
      inviteType: input.inviteType ?? "pool-club",
      createdAt: new Date().toISOString(),
    };

    guests.push(guest);
    await writeGuests(guests);
    return guest;
  },

  async delete(id: string) {
    const guests = await readGuests();
    const next = guests.filter((g) => g.id !== id);
    if (next.length === guests.length) return false;
    await writeGuests(next);
    return true;
  },

  async deleteBySlug(slug: string) {
    const normalized = slug.toLowerCase();
    const guests = await readGuests();
    const next = guests.filter((g) => g.slug.toLowerCase() !== normalized);
    if (next.length === guests.length) return false;
    await writeGuests(next);
    return true;
  },
};

export { invalidateBlobGuestMemoryCache };
