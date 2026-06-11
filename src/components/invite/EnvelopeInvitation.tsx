"use client";

import { HeroBeachBackground } from "@/components/home/HeroBeachBackground";
import { OxaLogo } from "./OxaLogo";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useState } from "react";
import type { Guest } from "@/lib/types";
import { InvitationCard } from "./InvitationCard";

type Phase = "closed" | "opening" | "open";

interface EnvelopeInvitationProps {
  guest: Guest;
}

const EASE = [0.22, 1, 0.36, 1] as const;

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
    window.setTimeout(() => setPhase("open"), 1200);
  }, [phase, reduceMotion]);

  const isOpen = phase === "open";
  const isOpening = phase === "opening";

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-4 py-8">
      <HeroBeachBackground />

      <motion.p
        className="absolute top-[max(1.25rem,env(safe-area-inset-top))] z-20 font-sans text-[10px] uppercase tracking-[0.35em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:text-xs"
        animate={{ opacity: isOpen ? 0 : 1 }}
      >
        Tap to open your invitation
      </motion.p>

      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, y: 32, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative z-30 w-full max-w-lg px-2"
          >
            <InvitationCard guest={guest} expanded />
          </motion.div>
        ) : (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: isOpening ? 0 : 1, scale: isOpening ? 0.97 : 1, y: isOpening ? 20 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: isOpening ? 0.45 : 0 }}
            className="relative z-10"
          >
            <motion.button
              type="button"
              onClick={handleOpen}
              disabled={phase !== "closed"}
              aria-label="Open invitation envelope"
              className="block cursor-pointer border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A962] focus-visible:ring-offset-4 disabled:cursor-default"
              animate={phase === "closed" ? { y: [0, -5, 0] } : { y: 0 }}
              transition={
                phase === "closed"
                  ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.2 }
              }
            >
              <div className="relative mx-auto w-[min(300px,88vw)] sm:w-[340px]" style={{ height: 210 }}>
                <div className="absolute -bottom-2 left-1/2 h-5 w-[90%] -translate-x-1/2 rounded-[100%] bg-[#0D3B66]/20 blur-md" />

                <div className="absolute inset-0 overflow-hidden rounded-lg bg-white shadow-[0_20px_60px_rgba(13,59,102,0.25)]">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "repeating-linear-gradient(135deg, #FFD54F 0px, #FFD54F 8px, #FFF8E7 8px, #FFF8E7 16px)",
                    }}
                  />

                  <motion.div
                    className="absolute left-1/2 z-[1] w-[68%] -translate-x-1/2 overflow-hidden rounded-sm border border-[#E8D5B7]/60 bg-[#FFFCF7] shadow-sm"
                    style={{ top: 36, height: 100 }}
                    animate={isOpening ? { y: -80, opacity: 0 } : { y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: EASE, delay: isOpening ? 0.2 : 0 }}
                  >
                    <div className="h-1 bg-gradient-to-r from-[#C9A962] via-[#F4C430] to-[#C9A962]" />
                    <div className="flex h-[calc(100%-4px)] items-center justify-center px-2">
                      <OxaLogo size="sm" className="max-h-7 max-w-[72px]" />
                    </div>
                  </motion.div>

                  <div
                    className="absolute inset-x-0 bottom-0 z-[2] bg-white"
                    style={{ height: "58%", clipPath: "polygon(0 100%, 50% 8%, 100% 100%)" }}
                  />

                  <div
                    className="pointer-events-none absolute bottom-0 left-0 z-[3] h-[50%] w-1/2 bg-gradient-to-r from-[#F0F0F0] to-white opacity-80"
                    style={{ clipPath: "polygon(0 100%, 100% 15%, 100% 100%)" }}
                  />
                  <div
                    className="pointer-events-none absolute bottom-0 right-0 z-[3] h-[50%] w-1/2 bg-gradient-to-l from-[#F0F0F0] to-white opacity-80"
                    style={{ clipPath: "polygon(0 15%, 100% 100%, 0 100%)" }}
                  />

                  <div className="absolute inset-x-0 top-0 z-[4]" style={{ height: "52%", perspective: 1200 }}>
                    <motion.div
                      className="relative h-full w-full origin-top"
                      animate={isOpening ? { rotateX: -165 } : { rotateX: 0 }}
                      transition={{ duration: 0.75, ease: EASE, delay: 0.05 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div
                        className="absolute inset-0 bg-white"
                        style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)", backfaceVisibility: "hidden" }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                          transform: "rotateX(180deg)",
                          backfaceVisibility: "hidden",
                          background:
                            "repeating-linear-gradient(135deg, #FFD54F 0px, #FFD54F 8px, #FFF8E7 8px, #FFF8E7 16px)",
                        }}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    className="absolute left-1/2 z-[5] flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full sm:h-12 sm:w-12"
                    style={{
                      top: "46%",
                      background: "radial-gradient(circle at 30% 25%, #F0D878, #C9A962 50%, #9A7B3F 100%)",
                      boxShadow: "inset 0 2px 5px rgba(255,255,255,0.45), 0 5px 14px rgba(100,75,30,0.35)",
                    }}
                    animate={isOpening ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <span className="font-serif text-base font-bold text-[#5C4A1F]">O</span>
                  </motion.div>
                </div>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}