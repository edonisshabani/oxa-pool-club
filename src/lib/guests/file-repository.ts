import { promises as fs } from "fs";
import path from "path";
import { createGuestSlug, ensureUniqueSlug } from "../slug";
import type { CreateGuestInput, Guest, InviteType } from "../types";
import { normalizeGuest, normalizeGuests } from "./normalize-guest";
import type { GuestRepository } from "./repository";

const DATA_PATH = path.join(process.cwd(), "data", "guests.json");

async function readGuests(): Promise<Guest[]> {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    return normalizeGuests(JSON.parse(raw) as Guest[]);
  } catch {
    return [];
  }
}

async function writeGuests(guests: Guest[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(guests, null, 2), "utf-8");
}

/** Server-side JSON file store — works across browsers/devices in dev & deploy */
export const fileGuestRepository: GuestRepository = {
  async getAll() {
    return readGuests();
  },

  async getBySlug(slug: string) {
    const guests = await readGuests();
    const normalized = slug.toLowerCase();
    const guest = guests.find((g) => g.slug.toLowerCase() === normalized);
    return guest ? normalizeGuest(guest) : null;
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
};
