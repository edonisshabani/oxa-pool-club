import type { CreateGuestInput, Guest } from "../types";

export interface GuestRepository {
  getAll(): Promise<Guest[]>;
  getBySlug(slug: string): Promise<Guest | null>;
  create(input: CreateGuestInput): Promise<Guest>;
  delete(id: string): Promise<boolean>;
  deleteBySlug?(slug: string): Promise<boolean>;
}
