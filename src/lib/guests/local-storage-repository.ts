import { STORAGE_KEY } from "../constants";
import { createGuestSlug, ensureUniqueSlug } from "../slug";
import type { CreateGuestInput, Guest } from "../types";
import type { GuestRepository } from "./repository";

function readGuests(): Guest[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Guest[]) : [];
  } catch {
    return [];
  }
}

function writeGuests(guests: Guest[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(guests));
}

/**
 * Browser-only fallback — useful for offline demos.
 * Note: invite links only work on the same device/browser with this store.
 */
export const localStorageGuestRepository: GuestRepository = {
  async getAll() {
    return readGuests();
  },

  async getBySlug(slug: string) {
    const normalized = slug.toLowerCase();
    return (
      readGuests().find((g) => g.slug.toLowerCase() === normalized) ?? null
    );
  },

  async create(input: CreateGuestInput) {
    const guests = readGuests();
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
    writeGuests(guests);
    return guest;
  },

  async delete(id: string) {
    const guests = readGuests();
    const next = guests.filter((g) => g.id !== id);
    if (next.length === guests.length) return false;
    writeGuests(next);
    return true;
  },
};
