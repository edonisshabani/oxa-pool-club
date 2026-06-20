"use client";

import { useState } from "react";
import type { Guest, InviteType } from "@/lib/types";

interface GuestFormProps {
  onGuestCreated: (guest: Guest) => void;
}

export function GuestForm({ onGuestCreated }: GuestFormProps) {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [inviteType, setInviteType] = useState<InviteType>("pool-club");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, surname, inviteType }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Failed to add guest.");
        return;
      }

      const guest: Guest = await res.json();
      onGuestCreated(guest);
      setFirstName("");
      setSurname("");
    } catch {
      setError("Failed to add guest. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-sm border border-[#E8D5B7] bg-white p-6 shadow-sm"
    >
      <h2 className="font-serif text-lg text-[#0D3B66]">Add Guest</h2>
      <p className="mt-1 font-sans text-xs text-[#2E6B9E]">
        Generate a unique invitation link for each guest.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block font-sans text-xs uppercase tracking-wider text-[#1A4B7C]">
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-2 w-full rounded-sm border border-[#E8D5B7] bg-[#FAF7F2] px-3 py-2.5 text-sm text-[#0D3B66] outline-none focus:border-[#C9A962]"
            placeholder="Emri"
            required
          />
        </label>

        <label className="block font-sans text-xs uppercase tracking-wider text-[#1A4B7C]">
          Surname
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="mt-2 w-full rounded-sm border border-[#E8D5B7] bg-[#FAF7F2] px-3 py-2.5 text-sm text-[#0D3B66] outline-none focus:border-[#C9A962]"
            placeholder="Mbiemri"
            required
          />
        </label>
      </div>

      <label className="mt-4 block font-sans text-xs uppercase tracking-wider text-[#1A4B7C]">
        Invitation Type
        <select
          value={inviteType}
          onChange={(e) => setInviteType(e.target.value as InviteType)}
          className="mt-2 w-full rounded-sm border border-[#E8D5B7] bg-[#FAF7F2] px-3 py-2.5 text-sm text-[#0D3B66] outline-none focus:border-[#C9A962]"
        >
          <option value="pool-club">Oxa Pool Club</option>
          <option value="pilates-collab">Pilates Collab</option>
        </select>
      </label>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-5 cursor-pointer rounded-sm bg-gradient-to-r from-[#C9A962] to-[#F4C430] px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#0D3B66] transition hover:shadow-md disabled:opacity-60"
      >
        {loading ? "Generating…" : "Generate Invitation Link"}
      </button>
    </form>
  );
}
