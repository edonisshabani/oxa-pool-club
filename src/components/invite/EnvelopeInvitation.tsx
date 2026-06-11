"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Guest } from "@/lib/types";
import { InvitationCard } from "./InvitationCard";

type Phase = "closed" | "opening" | "open";

interface EnvelopeInvitationProps {
  guest: Guest;
}

export function EnvelopeInvitation({ guest }: EnvelopeInvitationProps) {
  const [phase, setPhase] = useState<Phase>("closed");

  const handleOpen = () => {
    if (phase !== "closed") return;
    setPhase("opening");
    setTimeout(() => setPhase("open"), 900);
  };

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-4 py-10">
      {/* Ambient Riviera background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F5E6D3] via-[#FAF7F2] to-[#E8D5B7]" />
      <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-[#F4C430]/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-20 h-72 w-72 rounded-full bg-[#2E6B9E]/15 blur-3xl" />

      <AnimatePresence mode="wait">
        {phase !== "open" ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex flex-col items-center"
          >
            <p className="mb-6 font-sans text-xs uppercase tracking-[0.35em] text-[#2E6B9E]">
              Tap to open your invitation
            </p>

            <button
              type="button"
              onClick={handleOpen}
              disabled={phase === "opening"}
              className="group relative cursor-pointer border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A962] focus-visible:ring-offset-4"
              aria-label="Open invitation envelope"
            >
              <div className="relative h-[200px] w-[min(90vw,340px)] sm:h-[240px] sm:w-[380px]">
                {/* Envelope body */}
                <div className="absolute inset-x-0 bottom-0 top-[28%] overflow-hidden rounded-sm bg-white shadow-[0_20px_60px_rgba(13,59,102,0.18)]">
                  {/* Yellow striped inner lining */}
                  <div
                    className="absolute inset-0 opacity-90"
                    style={{
                      background:
                        "repeating-linear-gradient(135deg, #FFD54F 0px, #FFD54F 10px, #FFF8E7 10px, #FFF8E7 20px)",
                    }}
                  />
                  {/* Side folds */}
                  <div className="absolute bottom-0 left-0 h-full w-1/2 origin-bottom-right -skew-y-6 bg-white/60" />
                  <div className="absolute bottom-0 right-0 h-full w-1/2 origin-bottom-left skew-y-6 bg-white/60" />
                </div>

                {/* Card sliding out */}
                <motion.div
                  className="absolute left-1/2 z-10 -translate-x-1/2"
                  style={{ top: "18%" }}
                  animate={
                    phase === "opening"
                      ? { y: -80, scale: 0.85 }
                      : { y: 30, scale: 0.72 }
                  }
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <InvitationCard guest={guest} />
                </motion.div>

                {/* Envelope flap — 3D flip on open */}
                <motion.div
                  className="absolute inset-x-0 top-0 z-20 h-[55%]"
                  style={{ transformStyle: "preserve-3d", perspective: 900 }}
                  animate={
                    phase === "opening"
                      ? { rotateX: -160, y: -6 }
                      : { rotateX: 0, y: 0 }
                  }
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="h-full w-full bg-white shadow-md"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    }}
                  />
                </motion.div>

                {/* Wax seal */}
                <motion.div
                  className="absolute left-1/2 top-[38%] z-30 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:h-14 sm:w-14"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 35%, #E8C96A, #C9A962 45%, #A68B4B 100%)",
                    boxShadow:
                      "inset 0 2px 4px rgba(255,255,255,0.4), 0 4px 12px rgba(166,139,75,0.5)",
                  }}
                  animate={
                    phase === "opening"
                      ? { opacity: 0, scale: 0.5 }
                      : { opacity: 1, scale: 1 }
                  }
                  transition={{ duration: 0.4 }}
                >
                  <span className="font-serif text-lg font-bold text-[#5C4A1F] sm:text-xl">
                    O
                  </span>
                </motion.div>

                {/* Bottom V-fold cover */}
                <div
                  className="absolute inset-x-0 bottom-0 z-[15] h-[45%] bg-white"
                  style={{
                    clipPath: "polygon(0 100%, 50% 0, 100% 100%)",
                  }}
                />
              </div>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="card-expanded"
            initial={{ opacity: 0, scale: 0.75, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-lg px-2"
          >
            <InvitationCard guest={guest} expanded />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
