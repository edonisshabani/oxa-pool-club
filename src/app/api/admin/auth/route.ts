import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

function getAdminPassword(): string | undefined {
  const value = process.env.ADMIN_PASSWORD ?? process.env.admin_password;
  return value?.trim() || undefined;
}

export async function POST(request: Request) {
  const expected = getAdminPassword();

  if (!expected) {
    return NextResponse.json(
      { error: "Admin access is not configured on the server." },
      { status: 503 },
    );
  }

  const { password } = await request.json();
  const submitted = String(password ?? "").trim();

  if (submitted !== expected) {
    return NextResponse.json({ error: "Invalid password. Please try again." }, { status: 401 });
  }

  return NextResponse.json({ success: true, token: randomUUID() });
}
