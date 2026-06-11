import { Redis } from "@upstash/redis";
import { createGuestSlug, ensureUniqueSlug } from "../slug";
import type { CreateGuestInput, Guest } from "../types";
import type { GuestRepository } from "./repository";

const GUESTS_KEY = "oxa:guests";

function getRedis(): Redis {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    throw new Error("Upstash Redis is not configured.");
  }
  return new Redis({ url, token });
}

async function readGuests(): Promise<Guest[]> {
  const redis = getRedis();
  const guests = await redis.get<Guest[]>(GUESTS_KEY);
  return guests ?? [];
}

async function writeGuests(guests: Guest[]): Promise<void> {
  const redis = getRedis();
  await redis.set(GUESTS_KEY, guests);
}

/** Production store for Vercel — free Upstash Redis via Vercel marketplace */
export const upstashGuestRepository: GuestRepository = {
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
