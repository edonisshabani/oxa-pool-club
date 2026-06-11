import { EnvelopeInvitation } from "@/components/invite/EnvelopeInvitation";
import { guestRepository } from "@/lib/guests";
import { decodeGuestSlug } from "@/lib/slug";
import type { Guest } from "@/lib/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = Promise<{ guestId: string }>;

async function resolveGuest(guestId: string): Promise<Guest | null> {
  const stored = await guestRepository.getBySlug(guestId);
  if (stored) return stored;

  const decoded = decodeGuestSlug(guestId);
  if (!decoded) return null;

  return {
    id: guestId,
    firstName: decoded.firstName,
    surname: decoded.surname,
    slug: guestId.toLowerCase(),
    createdAt: new Date().toISOString(),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { guestId } = await params;
  const guest = await resolveGuest(guestId);

  if (!guest) {
    return { title: "Invitation Not Found — Oxa Pool Club" };
  }

  return {
    title: `${guest.firstName} ${guest.surname} — Oxa Pool Club`,
    description: `You are cordially invited to an exclusive event at Oxa Pool Club.`,
  };
}

export default async function InvitePage({ params }: { params: Params }) {
  const { guestId } = await params;
  const guest = await resolveGuest(guestId);

  if (!guest) {
    notFound();
  }

  return <EnvelopeInvitation guest={guest} />;
}