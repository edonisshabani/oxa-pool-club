"use client";

import { OxaLogo } from "@/components/invite/OxaLogo";
import { exportGuestsToExcel } from "@/lib/export-guests-excel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ADMIN_SESSION_KEY } from "@/lib/constants";
import type { Guest, InviteType } from "@/lib/types";
import { AdminLogin } from "./AdminLogin";
import { GuestForm } from "./GuestForm";
import { GuestTable } from "./GuestTable";

type GuestFilter = "all" | InviteType;

const FILTER_OPTIONS: Array<{ value: GuestFilter; label: string }> = [
  { value: "all", label: "All Guests" },
  { value: "pool-club", label: "Pool Club" },
  { value: "pilates-collab", label: "Pilates Collab" },
];

export function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [guestFilter, setGuestFilter] = useState<GuestFilter>("all");
  const [loading, setLoading] = useState(true);

  const filteredGuests = useMemo(() => {
    if (guestFilter === "all") return guests;
    return guests.filter((guest) => guest.inviteType === guestFilter);
  }, [guestFilter, guests]);

  const emptyMessage =
    guestFilter === "all"
      ? undefined
      : guestFilter === "pool-club"
        ? "No pool club guests yet."
        : "No pilates collab guests yet.";

  const fetchGuests = useCallback(async () => {
    const res = await fetch("/api/guests");
    if (res.ok) setGuests(await res.json());
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (token) setAuthenticated(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authenticated) fetchGuests();
  }, [authenticated, fetchGuests]);

  if (loading) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-[#F5E6D3]">
        <p className="font-sans text-sm text-[#2E6B9E]">Loading…</p>
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onAuthenticated={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#F5E6D3] to-[#FAF7F2]">
      <header className="border-b border-[#E8D5B7] bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <OxaLogo size="sm" className="mx-0 max-w-[140px] sm:max-w-[160px]" />
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.2em] text-[#C9A962]">
              Invitation Manager
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              sessionStorage.removeItem(ADMIN_SESSION_KEY);
              setAuthenticated(false);
            }}
            className="cursor-pointer font-sans text-xs text-[#2E6B9E] underline-offset-2 hover:underline"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 sm:py-10">
        <GuestForm
          onGuestCreated={(guest) => setGuests((prev) => [guest, ...prev])}
        />
        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-lg text-[#0D3B66]">Guest List</h2>
            <button
              type="button"
              onClick={() => exportGuestsToExcel(filteredGuests)}
              disabled={filteredGuests.length === 0}
              className="cursor-pointer rounded-sm border border-[#2E6B9E] bg-white px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider text-[#2E6B9E] transition hover:bg-[#2E6B9E] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Export to Excel
            </button>
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            {FILTER_OPTIONS.map((option) => {
              const isActive = guestFilter === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setGuestFilter(option.value)}
                  className={`cursor-pointer rounded-sm px-4 py-2 font-sans text-xs font-medium uppercase tracking-wider transition ${
                    isActive
                      ? "bg-[#1A4B7C] text-white shadow-sm"
                      : "border border-[#E8D5B7] bg-white text-[#2E6B9E] hover:border-[#2E6B9E] hover:text-[#1A4B7C]"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <GuestTable
            guests={filteredGuests}
            emptyMessage={emptyMessage}
            onGuestDeleted={(id) =>
              setGuests((prev) => prev.filter((g) => g.id !== id))
            }
          />
        </section>
      </main>
    </div>
  );
}
