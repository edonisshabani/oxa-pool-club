"use client";

import { motion } from "framer-motion";
import { EVENT_DETAILS } from "@/lib/constants";
import type { Guest } from "@/lib/types";
import { OxaLogo } from "./OxaLogo";

interface InvitationCardProps {
  guest: Guest;
  expanded?: boolean;
}

export function InvitationCard({ guest, expanded = false }: InvitationCardProps) {
  const fullName = `${guest.firstName} ${guest.surname}`;

  return (
    <motion.article
      className={`relative w-full overflow-hidden rounded-sm bg-white shadow-2xl ${
        expanded ? "max-w-lg" : "max-w-[280px] sm:max-w-[320px]"
      }`}
      style={{
        boxShadow:
          "0 25px 50px -12px rgba(13, 59, 102, 0.25), 0 0 0 1px rgba(201, 169, 98, 0.15)",
      }}
    >
      {/* Gold top border accent */}
      <div className="h-1 bg-gradient-to-r from-[#C9A962] via-[#F4C430] to-[#C9A962]" />

      <div className={`text-center ${expanded ? "px-8 py-10 sm:px-10 sm:py-12" : "px-5 py-6"}`}>
        <OxaLogo className="mb-6" />

        <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#2E6B9E] sm:text-xs">
          Cordially invites
        </p>

        <h1
          className={`font-serif text-[#0D3B66] ${
            expanded
              ? "my-4 text-3xl sm:text-4xl"
              : "my-3 text-xl sm:text-2xl"
          }`}
        >
          {fullName}
        </h1>

        <div className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-[#C9A962] to-transparent" />

        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-4 font-sans text-[#1A4B7C]"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A962]">
                Event
              </p>
              <p className="mt-1 font-serif text-2xl text-[#0D3B66]">
                {EVENT_DETAILS.title}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-sm bg-[#FAF7F2] px-4 py-3">
                <p className="text-[10px] uppercase tracking-wider text-[#C9A962]">
                  Date
                </p>
                <p className="mt-1 font-medium">{EVENT_DETAILS.date}</p>
              </div>
              <div className="rounded-sm bg-[#FAF7F2] px-4 py-3">
                <p className="text-[10px] uppercase tracking-wider text-[#C9A962]">
                  Time
                </p>
                <p className="mt-1 font-medium">{EVENT_DETAILS.time}</p>
              </div>
            </div>

            <div className="rounded-sm bg-[#FAF7F2] px-4 py-3 text-sm">
              <p className="text-[10px] uppercase tracking-wider text-[#C9A962]">
                Location
              </p>
              <p className="mt-1 font-serif text-lg text-[#0D3B66]">
                {EVENT_DETAILS.location}
              </p>
              {EVENT_DETAILS.locationAddress && (
                <p className="mt-0.5 text-xs text-[#2E6B9E]">
                  {EVENT_DETAILS.locationAddress}
                </p>
              )}
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 w-full cursor-pointer rounded-sm bg-gradient-to-r from-[#1A4B7C] to-[#2E6B9E] px-6 py-3.5 font-sans text-sm font-medium uppercase tracking-[0.2em] text-white shadow-lg transition-shadow hover:shadow-xl"
              onClick={() => {
                window.location.href = `mailto:rsvp@oxapoolclub.com?subject=RSVP - ${fullName}`;
              }}
            >
              RSVP
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Subtle striped resort lining at bottom */}
      <div
        className="h-3"
        style={{
          background:
            "repeating-linear-gradient(90deg, #F4C430 0px, #F4C430 8px, #FFFFFF 8px, #FFFFFF 16px)",
        }}
      />
    </motion.article>
  );
}
