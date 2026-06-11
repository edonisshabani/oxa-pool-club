/** Guest record - swap the repository implementation for Supabase/Prisma later. */
export interface Guest {
  id: string;
  firstName: string;
  surname: string;
  slug: string;
  createdAt: string;
}

export interface CreateGuestInput {
  firstName: string;
  surname: string;
}

export interface EventDetails {
  title: string;
  date: string;
  time: string;
  location: string;
  locationAddress?: string;
}