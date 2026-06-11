import { fileGuestRepository } from "./file-repository";
import { upstashGuestRepository } from "./upstash-repository";

/** Active repository — Upstash on Vercel, local JSON file in dev */
export const guestRepository =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? upstashGuestRepository
    : fileGuestRepository;

export type { GuestRepository } from "./repository";
export { localStorageGuestRepository } from "./local-storage-repository";
export { fileGuestRepository } from "./file-repository";
export { upstashGuestRepository } from "./upstash-repository";