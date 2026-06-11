import { get, put } from "@vercel/blob";
import { createGuestSlug, ensureUniqueSlug } from "../slug";
import type { CreateGuestInput, Guest } from "../types";
import type { GuestRepository } from "./repository";

const BLOB_PATH = "guests.json";

async function readGuests(): Promise<Guest[]> {
  try {
    const result = await get(BLOB_PATH, { access: "private", useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return [];

    const text = await new Response(result.stream).text();
    if (!text.trim()) return [];
    return JSON.parse(text) as Guest[];
  } catch (error) {
    console.error("Failed to read guests from blob:", error);
    return [];
  }
}

async function writeGuests(guests: Guest[]): Promise<void> {
  await put(BLOB_PATH, JSON.stringify(guests), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

/** Vercel Blob store — auto-configured when BLOB_READ_WRITE_TOKEN is set */
export const blobGuestRepository: GuestRepository = {
  async getAll() {
    return readGuests();
  },

  async getBySlug(slug: string) {
    const normalized = slug.toLowerCase();
    return (
      (await readGuests()).find((g) => g.slug.toLowerCase() === normalized) ??
      null
    );
  },

  async create(input: CreateGuestInput) {
    const guests = await readGuests();
    const baseSlug = createGuestSlug(input.firstName, input.surname);
    const slug = ensureUniqueSlug(
      baseSlug,
      guests.map((g) => g.slug)
    );

    const guest: Guest = {
      id: crypto.randomUUID(),
      firstName: input.firstName.trim(),
      surname: input.surname.trim(),
      slug,
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
};