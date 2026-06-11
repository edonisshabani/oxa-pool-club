import { NextResponse } from "next/server";
import { guestRepository } from "@/lib/guests";

type Params = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const guest = await guestRepository.getBySlug(slug);

  if (!guest) {
    return NextResponse.json({ error: "Guest not found." }, { status: 404 });
  }

  return NextResponse.json(guest);
}

export async function DELETE(_request: Request, { params }: Params) {
  const { slug } = await params;
  const guest = await guestRepository.getBySlug(slug);

  if (!guest) {
    return NextResponse.json({ error: "Guest not found." }, { status: 404 });
  }

  const deleted = await guestRepository.delete(guest.id);
  if (!deleted) {
    return NextResponse.json({ error: "Failed to delete guest." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
