"use client";

import { motion } from "framer-motion";
import { MEMBERSHIP_CARD_COPY } from "@/lib/constants";
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5 text-left font-sans text-[#1A4B7C]"
          >
            <h2 className="text-center font-serif text-xl tracking-wide text-[#0D3B66] sm:text-2xl">
              {MEMBERSHIP_CARD_COPY.headline}
            </h2>

            <div className="space-y-4 rounded-sm bg-[#FAF7F2] px-5 py-5 text-sm leading-relaxed sm:text-[15px]">
              {MEMBERSHIP_CARD_COPY.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-[#C9A962] sm:text-sm">
              {MEMBERSHIP_CARD_COPY.validity}
            </p>
          </motion.div>
        )}
      </div>

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