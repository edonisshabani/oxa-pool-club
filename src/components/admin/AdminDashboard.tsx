"use client";

import { useCallback, useEffect, useState } from "react";
import { ADMIN_SESSION_KEY } from "@/lib/constants";
import type { Guest } from "@/lib/types";
import { AdminLogin } from "./AdminLogin";
import { GuestForm } from "./GuestForm";
import { GuestTable } from "./GuestTable";

export function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

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
            <h1 className="font-serif text-2xl tracking-wide text-[#0D3B66]">
              Oxa Pool Club
            </h1>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#C9A962]">
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
          <h2 className="mb-4 font-serif text-lg text-[#0D3B66]">Guest List</h2>
          <GuestTable
            guests={guests}
            onGuestDeleted={(id) =>
              setGuests((prev) => prev.filter((g) => g.id !== id))
            }
          />
        </section>
      </main>
    </div>
  );
}
