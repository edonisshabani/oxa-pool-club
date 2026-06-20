import { NextResponse } from "next/server";
import { guestRepository } from "@/lib/guests";
import type { InviteType } from "@/lib/types";

const VALID_INVITE_TYPES: InviteType[] = ["pool-club", "pilates-collab"];

export async function GET() {
  const guests = await guestRepository.getAll();
  return NextResponse.json(guests);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const firstName = String(body.firstName ?? "").trim();
    const surname = String(body.surname ?? "").trim();
    const inviteType = String(body.inviteType ?? "pool-club") as InviteType;

    if (!firstName || !surname) {
      return NextResponse.json(
        { error: "First name and surname are required." },
        { status: 400 },
      );
    }

    if (!VALID_INVITE_TYPES.includes(inviteType)) {
      return NextResponse.json({ error: "Invalid invitation type." }, { status: 400 });
    }

    const guest = await guestRepository.create({ firstName, surname, inviteType });
    return NextResponse.json(guest, { status: 201 });
  } catch (error) {
    console.error("Failed to create guest:", error);
    return NextResponse.json(
      { error: "Failed to create guest. Storage may not be configured." },
      { status: 500 },
    );
  }
}
