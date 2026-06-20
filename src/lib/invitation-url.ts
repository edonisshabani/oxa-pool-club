import type { InviteType } from "./types";

export function getInvitationPath(slug: string, inviteType: InviteType = "pool-club"): string {
  return inviteType === "pilates-collab" ? `/invite/pilates/${slug}` : `/invite/${slug}`;
}

export function buildInvitationUrl(
  slug: string,
  inviteType: InviteType = "pool-club",
  origin?: string,
): string {
  const base = origin ?? (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}${getInvitationPath(slug, inviteType)}`;
}

export function getInviteTypeLabel(inviteType: InviteType): string {
  return inviteType === "pilates-collab" ? "Pilates Collab" : "Pool Club";
}
