import { PilatesInvitation } from "@/components/invite/pilates/PilatesInvitation";
import { INVITE_TYPE_CONFIG } from "@/lib/invitations";
import { resolveGuestBySlug } from "@/lib/guests/resolve-guest";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = Promise<{ guestId: string }>;

/** Cache rendered pilates invite pages — avoids a Blob read per guest view. */
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { guestId } = await params;
  const guest = await resolveGuestBySlug(guestId);

  if (!guest) {
    return { title: "Invitation Not Found — OXA × Pilates Collab" };
  }

  return {
    title: `${guest.firstName} ${guest.surname} — ${INVITE_TYPE_CONFIG["pilates-collab"].metadataTitle}`,
    description: INVITE_TYPE_CONFIG["pilates-collab"].metadataDescription,
  };
}

export default async function PilatesInvitePage({ params }: { params: Params }) {
  const { guestId } = await params;
  const guest = await resolveGuestBySlug(guestId);

  if (!guest) {
    notFound();
  }

  return <PilatesInvitation guest={guest} />;
}
