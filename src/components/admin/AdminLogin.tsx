"use client";

import { useState } from "react";
import { OxaLogo } from "@/components/invite/OxaLogo";
import { ADMIN_SESSION_KEY } from "@/lib/constants";

interface AdminLoginProps {
  onAuthenticated: () => void;
}

export function AdminLogin({ onAuthenticated }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Invalid password. Please try again.");
        return;
      }

      const data = await res.json();
      sessionStorage.setItem(ADMIN_SESSION_KEY, data.token);
      onAuthenticated();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-b from-[#F5E6D3] to-[#FAF7F2] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-sm border border-[#E8D5B7] bg-white p-8 shadow-xl"
      >
        <OxaLogo size="md" className="mb-2" />

        <p className="mt-2 text-center font-sans text-sm text-[#2E6B9E]">Admin Access</p>

        <label className="mt-8 block font-sans text-xs uppercase tracking-wider text-[#1A4B7C]">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-sm border border-[#E8D5B7] bg-[#FAF7F2] px-4 py-3 font-sans text-sm text-[#0D3B66] outline-none transition focus:border-[#C9A962] focus:ring-1 focus:ring-[#C9A962]"
            placeholder="Enter admin password"
            required
          />
        </label>

        {error && (
          <p className="mt-3 font-sans text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full cursor-pointer rounded-sm bg-[#1A4B7C] px-4 py-3 font-sans text-sm font-medium uppercase tracking-wider text-white transition hover:bg-[#2E6B9E] disabled:opacity-60"
        >
          {loading ? "Verifying…" : "Enter Dashboard"}
        </button>
      </form>
    </div>
  );
}