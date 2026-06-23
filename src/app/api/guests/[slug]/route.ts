import { NextResponse } from "next/server";
import { guestRepository } from "@/lib/guests";
import { invalidateGuestCaches } from "@/lib/guests/guest-cache";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const guest = await guestRepository.getBySlug(slug);

  if (!guest) {
    return NextResponse.json({ error: "Guest not found." }, { status: 404 });
  }

  return NextResponse.json(guest, {
    headers: {
      "Cache-Control": "private, no-store",
    },
  });
}

export async function DELETE(_request: Request, { params }: Params) {
  const { slug } = await params;

  const deleted =
    (await guestRepository.deleteBySlug?.(slug)) ??
    (await guestRepository.getBySlug(slug).then(async (guest) =>
      guest ? guestRepository.delete(guest.id) : false,
    ));

  if (!deleted) {
    return NextResponse.json({ error: "Guest not found." }, { status: 404 });
  }

  await invalidateGuestCaches();
  return NextResponse.json({ success: true });
}
