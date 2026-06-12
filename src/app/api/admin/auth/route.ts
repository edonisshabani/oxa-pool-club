import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return NextResponse.json(
      { error: "Admin access is not configured." },
      { status: 503 },
    );
  }

  const { password } = await request.json();

  if (password !== expected) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  return NextResponse.json({ success: true, token: randomUUID() });
}
