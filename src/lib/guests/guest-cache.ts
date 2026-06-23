import { revalidatePath } from "next/cache";

/** Bust Next.js page cache for invite routes after guest mutations. */
export async function invalidateGuestCaches(): Promise<void> {
  revalidatePath("/invite", "layout");
}
