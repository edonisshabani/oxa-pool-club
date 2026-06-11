import { EnvelopeInvitation } from "@/components/invite/EnvelopeInvitation";
import { guestRepository } from "@/lib/guests";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = Promise<{ guestId: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { guestId } = await params;
  const guest = await guestRepository.getBySlug(guestId);

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
  const guest = await guestRepository.getBySlug(guestId);

  if (!guest) {
    notFound();
  }

  return <EnvelopeInvitation guest={guest} />;
}
