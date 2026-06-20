/** Guest record - swap the repository implementation for Supabase/Prisma later. */
export type InviteType = "pool-club" | "pilates-collab";

export interface Guest {
  id: string;
  firstName: string;
  surname: string;
  slug: string;
  inviteType: InviteType;
  createdAt: string;
}

export interface CreateGuestInput {
  firstName: string;
  surname: string;
  inviteType?: InviteType;
}

export interface EventDetails {
  title: string;
  date: string;
  time: string;
  location: string;
  locationAddress?: string;
}