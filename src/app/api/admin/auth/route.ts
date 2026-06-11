import { NextResponse } from "next/server";

const DEFAULT_PASSWORD = "oxapool";

export async function POST(request: Request) {
  const { password } = await request.json();
  const expected = process.env.ADMIN_PASSWORD ?? DEFAULT_PASSWORD;

  if (password !== expected) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  return NextResponse.json({ success: true, token: expected });
}
