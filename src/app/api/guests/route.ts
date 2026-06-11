import { NextResponse } from "next/server";
import { guestRepository } from "@/lib/guests";

export async function GET() {
  const guests = await guestRepository.getAll();
  return NextResponse.json(guests);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const firstName = String(body.firstName ?? "").trim();
    const surname = String(body.surname ?? "").trim();

    if (!firstName || !surname) {
      return NextResponse.json(
        { error: "First name and surname are required." },
        { status: 400 }
      );
    }

    const guest = await guestRepository.create({ firstName, surname });
    return NextResponse.json(guest, { status: 201 });
  } catch (error) {
    console.error("Failed to create guest:", error);
    return NextResponse.json(
      { error: "Failed to create guest. Storage may not be configured." },
      { status: 500 }
    );
  }
}
