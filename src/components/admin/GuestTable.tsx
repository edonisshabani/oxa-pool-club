"use client";

import { useState } from "react";
import { buildInvitationUrl, getInvitationPath, getInviteTypeLabel } from "@/lib/invitation-url";
import type { Guest } from "@/lib/types";

interface GuestTableProps {
  guests: Guest[];
  onGuestDeleted: (id: string) => void;
}

export function GuestTable({ guests, onGuestDeleted }: GuestTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const copyLink = async (guest: Guest) => {
    const url = buildInvitationUrl(guest.slug, guest.inviteType);
    await navigator.clipboard.writeText(url);
    setCopiedId(guest.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const deleteGuest = async (guest: Guest) => {
    if (!confirm(`Remove ${guest.firstName} ${guest.surname} from the guest list?`)) {
      return;
    }

    setDeletingId(guest.id);
    try {
      const res = await fetch(`/api/guests/${guest.slug}`, { method: "DELETE" });
      if (res.ok) onGuestDeleted(guest.id);
    } finally {
      setDeletingId(null);
    }
  };

  if (guests.length === 0) {
    return (
      <div className="rounded-sm border border-dashed border-[#E8D5B7] bg-white/60 px-6 py-12 text-center">
        <p className="font-serif text-lg text-[#0D3B66]">No guests yet</p>
        <p className="mt-1 font-sans text-sm text-[#2E6B9E]">
          Add your first guest above to generate an invitation link.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-sm border border-[#E8D5B7] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left font-sans text-sm">
          <thead>
            <tr className="border-b border-[#E8D5B7] bg-[#FAF7F2]">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#1A4B7C]">
                Guest Name
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#1A4B7C]">
                Type
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#1A4B7C]">
                Link
              </th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-[#1A4B7C]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr
                key={guest.id}
                className="border-b border-[#F5E6D3] last:border-0 hover:bg-[#FAF7F2]/50"
              >
                <td className="px-4 py-3 font-medium text-[#0D3B66]">
                  {guest.firstName} {guest.surname}
                </td>
                <td className="px-4 py-3 text-[#2E6B9E]">
                  {getInviteTypeLabel(guest.inviteType)}
                </td>
                <td className="px-4 py-3 text-[#2E6B9E]">
                  {getInvitationPath(guest.slug, guest.inviteType)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => copyLink(guest)}
                      className="cursor-pointer rounded-sm border border-[#2E6B9E] px-3 py-1.5 text-xs font-medium text-[#2E6B9E] transition hover:bg-[#2E6B9E] hover:text-white"
                    >
                      {copiedId === guest.id ? "Copied!" : "Copy Link"}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteGuest(guest)}
                      disabled={deletingId === guest.id}
                      className="cursor-pointer rounded-sm border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingId === guest.id ? "…" : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
