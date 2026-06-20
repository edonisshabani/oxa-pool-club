import { EnvelopeInvitation } from "@/components/invite/EnvelopeInvitation";
import { INVITE_TYPE_CONFIG } from "@/lib/invitations";
import { resolveGuestBySlug } from "@/lib/guests/resolve-guest";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = Promise<{ guestId: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { guestId } = await params;
  const guest = await resolveGuestBySlug(guestId, "pool-club");

  if (!guest) {
    return { title: "Invitation Not Found — Oxa Pool Club" };
  }

  return {
    title: `${guest.firstName} ${guest.surname} — ${INVITE_TYPE_CONFIG["pool-club"].metadataTitle}`,
    description: INVITE_TYPE_CONFIG["pool-club"].metadataDescription,
  };
}

export default async function InvitePage({ params }: { params: Params }) {
  const { guestId } = await params;
  const guest = await resolveGuestBySlug(guestId, "pool-club");

  if (!guest) {
    notFound();
  }

  return <EnvelopeInvitation guest={guest} />;
}
