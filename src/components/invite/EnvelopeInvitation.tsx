"use client";

import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useCallback, useState } from "react";
import type { Guest } from "@/lib/types";
import { InvitationCard } from "./InvitationCard";

type Phase = "closed" | "opening" | "open";

interface EnvelopeInvitationProps {
  guest: Guest;
}

const EASE_LUXE = [0.22, 1, 0.36, 1] as const;
const CARD_LAYOUT_ID = "oxa-invitation-card";

export function EnvelopeInvitation({ guest }: EnvelopeInvitationProps) {
  const [phase, setPhase] = useState<Phase>("closed");
  const reduceMotion = useReducedMotion();

  const handleOpen = useCallback(() => {
    if (phase !== "closed") return;

    if (reduceMotion) {
      setPhase("open");
      return;
    }

    setPhase("opening");
    window.setTimeout(() => setPhase("open"), 1300);
  }, [phase, reduceMotion]);

  const isOpen = phase === "open";
  const isOpening = phase === "opening";

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-4 py-8 sm:py-10">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#F5E6D3] via-[#FAF7F2] to-[#E8D5B7]" />
      <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-[#F4C430]/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-20 h-72 w-72 rounded-full bg-[#2E6B9E]/15 blur-3xl" />

      <motion.p
        className="absolute top-[max(1.5rem,env(safe-area-inset-top))] z-20 font-sans text-[10px] uppercase tracking-[0.35em] text-[#2E6B9E] sm:text-xs"
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.35 }}
      >
        Tap to open your invitation
      </motion.p>

      <LayoutGroup>
        {/* Expanded invitation */}
        {isOpen && (
          <motion.div
            layoutId={CARD_LAYOUT_ID}
            className="relative z-40 w-full max-w-lg px-2"
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <InvitationCard guest={guest} expanded />
          </motion.div>
        )}

        {/* Envelope stage */}
        {!isOpen && (
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={false}
            animate={{
              opacity: isOpening ? 0 : 1,
              scale: isOpening ? 0.96 : 1,
              y: isOpening ? 24 : 0,
            }}
            transition={{ duration: 0.6, ease: EASE_LUXE, delay: isOpening ? 0.55 : 0 }}
          >
            <motion.button
              type="button"
              onClick={handleOpen}
              disabled={phase !== "closed"}
              aria-label="Open invitation envelope"
              className="relative cursor-pointer border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A962] focus-visible:ring-offset-4 disabled:cursor-default"
              animate={phase === "closed" ? { y: [0, -6, 0] } : { y: 0 }}
              transition={
                phase === "closed"
                  ? { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.25 }
              }
            >
              <div
                className="relative h-[220px] w-[min(88vw,340px)] sm:h-[260px] sm:w-[400px]"
                style={{ perspective: "1600px" }}
              >
                <div className="absolute -bottom-3 left-1/2 h-7 w-[85%] -translate-x-1/2 rounded-[100%] bg-[#0D3B66]/12 blur-lg" />

                {/* 1 — Back / lining */}
                <div className="absolute inset-x-0 bottom-0 top-[24%] overflow-hidden rounded-md bg-white shadow-[0_28px_80px_rgba(13,59,102,0.22)]">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "repeating-linear-gradient(135deg, #FFD54F 0px, #FFD54F 9px, #FFF8E7 9px, #FFF8E7 18px)",
                    }}
                  />
                </div>

                {/* 2 — Invitation card (inside envelope) */}
                <motion.div
                  layoutId={CARD_LAYOUT_ID}
                  className="absolute left-1/2 z-[14] w-[78%] -translate-x-1/2"
                  style={{ top: "22%" }}
                  animate={
                    isOpening
                      ? { y: -72, scale: 1.02, rotateX: -6 }
                      : { y: 18, scale: 0.88, rotateX: 0 }
                  }
                  transition={{
                    duration: 0.95,
                    ease: EASE_LUXE,
                    delay: isOpening ? 0.28 : 0,
                  }}
                >
                  <InvitationCard guest={guest} />
                </motion.div>

                {/* 3 — Side folds */}
                <div
                  className="absolute bottom-0 left-0 z-[16] h-[72%] w-[52%] bg-gradient-to-br from-white to-[#EFEFEF]"
                  style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
                />
                <div
                  className="absolute bottom-0 right-0 z-[16] h-[72%] w-[52%] bg-gradient-to-bl from-white to-[#EFEFEF]"
                  style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
                />

                {/* 4 — Bottom flap */}
                <motion.div
                  className="absolute inset-x-0 bottom-0 z-[18] h-[50%] origin-bottom bg-white"
                  style={{ clipPath: "polygon(0 100%, 50% 6%, 100% 100%)" }}
                  animate={isOpening ? { rotateX: 32, y: 4 } : { rotateX: 0, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE_LUXE, delay: 0.18 }}
                />

                {/* 5 — Top flap (3D) */}
                <div
                  className="absolute inset-x-0 top-0 z-[22] h-[56%]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    className="h-full w-full"
                    style={{
                      transformOrigin: "50% 0%",
                      transformStyle: "preserve-3d",
                    }}
                    animate={isOpening ? { rotateX: 175 } : { rotateX: 0 }}
                    transition={{ duration: 0.8, ease: EASE_LUXE, delay: 0.05 }}
                  >
                    {/* Front of flap */}
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-white to-[#F3F3F3] shadow-[0_8px_24px_rgba(13,59,102,0.1)]"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                        backfaceVisibility: "hidden",
                      }}
                    />
                    {/* Back of flap — yellow lining */}
                    <div
                      className="absolute inset-0"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                        transform: "rotateX(180deg)",
                        backfaceVisibility: "hidden",
                        background:
                          "repeating-linear-gradient(135deg, #FFD54F 0px, #FFD54F 9px, #FFF8E7 9px, #FFF8E7 18px)",
                      }}
                    />
                  </motion.div>
                </div>

                {/* 6 — Wax seal */}
                <motion.div
                  className="absolute left-1/2 top-[41%] z-[26] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full sm:h-14 sm:w-14"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 25%, #F2DA7A, #C9A962 52%, #96783A 100%)",
                    boxShadow:
                      "inset 0 2px 6px rgba(255,255,255,0.5), 0 6px 16px rgba(100,75,30,0.4)",
                  }}
                  animate={
                    isOpening
                      ? { scale: [1, 1.2, 0], opacity: [1, 1, 0], y: [0, -4, 10] }
                      : { scale: 1, opacity: 1, y: 0 }
                  }
                  transition={{ duration: 0.42, ease: EASE_LUXE }}
                >
                  <span className="font-serif text-lg font-bold text-[#5C4A1F]">O</span>
                </motion.div>
              </div>
            </motion.button>
          </motion.div>
        )}
      </LayoutGroup>
    </div>
  );
}
