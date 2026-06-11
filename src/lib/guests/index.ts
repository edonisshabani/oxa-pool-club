import { blobGuestRepository } from "./blob-repository";
import { fileGuestRepository } from "./file-repository";
import { upstashGuestRepository } from "./upstash-repository";

function pickRepository() {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return upstashGuestRepository;
  }
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return blobGuestRepository;
  }
  return fileGuestRepository;
}

export const guestRepository = pickRepository();
export type { GuestRepository } from "./repository";
export { localStorageGuestRepository } from "./local-storage-repository";
export { fileGuestRepository } from "./file-repository";
export { blobGuestRepository } from "./blob-repository";
export { upstashGuestRepository } from "./upstash-repository";