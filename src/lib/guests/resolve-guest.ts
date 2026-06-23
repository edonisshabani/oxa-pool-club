import { guestRepository } from "./index";
import type { Guest } from "../types";

export async function resolveGuestBySlug(slug: string): Promise<Guest | null> {
  return guestRepository.getBySlug(slug);
}
