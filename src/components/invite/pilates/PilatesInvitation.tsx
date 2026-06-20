"use client";

import { OPEN_SEQUENCE_MS, SMOOTH_EASE } from "@/lib/motion";
import { OxaLogo } from "../OxaLogo";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Guest } from "@/lib/types";
import { PilatesBackground } from "./PilatesBackground";
import { PilatesInvitationCard } from "./PilatesInvitationCard";

type Phase = "closed" | "opening" | "open";

interface PilatesInvitationProps {
  guest: Guest;
}

export function PilatesInvitation({ guest }: PilatesInvitationProps) {
  const [phase, setPhase] = useState<Phase>("closed");
  const reduceMotion = useReducedMotion();
  const openTimerRef = useRef<number | null>(null);

  const isOpen = phase === "open";
  const isOpening = phase === "opening";

  useEffect(() => {
    return () => {
      if (openTimerRef.current !== null) {
        window.clearTimeout(openTimerRef.current);
      }
    };
  }, []);

  const handleOpen = useCallback(() => {
    if (phase !== "closed") return;

    if (reduceMotion) {
      setPhase("open");
      return;
    }

    setPhase("opening");
    openTimerRef.current = window.setTimeout(() => {
      setPhase("open");
      openTimerRef.current = null;
    }, OPEN_SEQUENCE_MS);
  }, [phase, reduceMotion]);

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-4 py-8">
      <PilatesBackground />

      <motion.p
        className="pointer-events-none absolute top-[max(1.25rem,env(safe-area-inset-top))] z-20 font-sans text-[10px] uppercase tracking-[0.35em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:text-xs"
        animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? -8 : 0 }}
        transition={{ duration: 0.8, ease: SMOOTH_EASE }}
      >
        Tap to open your invitation
      </motion.p>

      <div className="relative z-10 flex w-full max-w-lg items-center justify-center px-2">
        <motion.div
          className="relative w-full"
          animate={{
            opacity: isOpen ? 0 : 1,
            scale: isOpening ? 0.97 : isOpen ? 0.94 : 1,
            y: isOpening ? 10 : isOpen ? 18 : 0,
            filter: isOpen || isOpening ? "blur(6px)" : "blur(0px)",
          }}
          transition={{ duration: 1.1, ease: SMOOTH_EASE, delay: isOpening ? 0.55 : 0 }}
          style={{ pointerEvents: isOpen ? "none" : "auto" }}
        >
          <motion.button
            type="button"
            onClick={handleOpen}
            disabled={phase !== "closed"}
            aria-label="Open pilates collaboration invitation"
            className="mx-auto block cursor-pointer border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8FA98F] focus-visible:ring-offset-4 disabled:cursor-default"
            animate={phase === "closed" ? { y: [0, -4, 0] } : { y: 0 }}
            transition={
              phase === "closed"
                ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.8, ease: SMOOTH_EASE }
            }
          >
            <div className="relative mx-auto w-[min(300px,88vw)] sm:w-[340px]" style={{ height: 210 }}>
              <div className="absolute -bottom-2 left-1/2 h-5 w-[90%] -translate-x-1/2 rounded-[100%] bg-[#3D3D3D]/15 blur-md" />

              <div className="absolute inset-0 overflow-hidden rounded-lg bg-[#FCFAF7] shadow-[0_20px_60px_rgba(61,61,61,0.18)]">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "repeating-linear-gradient(135deg, #D4B5B0 0px, #D4B5B0 8px, #F3EEE8 8px, #F3EEE8 16px)",
                  }}
                />

                <motion.div
                  className="absolute left-1/2 z-[1] w-[68%] -translate-x-1/2 overflow-hidden rounded-sm border border-[#E4D8D0]/70 bg-[#FCFAF7] shadow-sm"
                  style={{ top: 36, height: 100 }}
                  animate={
                    isOpening
                      ? { y: -92, opacity: 0, scale: 0.96, rotateX: -8 }
                      : { y: 0, opacity: 1, scale: 1, rotateX: 0 }
                  }
                  transition={{ duration: 1.05, ease: SMOOTH_EASE, delay: isOpening ? 0.28 : 0 }}
                >
                  <div className="h-1 bg-gradient-to-r from-[#8FA98F] via-[#D4B5B0] to-[#8FA98F]" />
                  <div className="flex h-[calc(100%-4px)] flex-col items-center justify-center px-2">
                    <OxaLogo size="sm" className="max-h-7 max-w-[72px]" />
                    <p className="mt-1 font-sans text-[8px] uppercase tracking-[0.25em] text-[#8FA98F]">
                      Nomi Wellness
                    </p>
                  </div>
                </motion.div>

                <div
                  className="absolute inset-x-0 bottom-0 z-[2] bg-[#FCFAF7]"
                  style={{ height: "58%", clipPath: "polygon(0 100%, 50% 8%, 100% 100%)" }}
                />

                <div className="absolute inset-x-0 top-0 z-[4]" style={{ height: "52%", perspective: 1200 }}>
                  <motion.div
                    className="envelope-3d relative h-full w-full origin-top"
                    animate={isOpening ? { rotateX: -172 } : { rotateX: 0 }}
                    transition={{ duration: 1.15, ease: SMOOTH_EASE, delay: isOpening ? 0.08 : 0 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div
                      className="envelope-flap-face absolute inset-0 bg-[#FCFAF7]"
                      style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                    />
                    <div
                      className="envelope-flap-face absolute inset-0"
                      style={{
                        clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                        transform: "rotateX(180deg)",
                        background:
                          "repeating-linear-gradient(135deg, #D4B5B0 0px, #D4B5B0 8px, #F3EEE8 8px, #F3EEE8 16px)",
                      }}
                    />
                  </motion.div>
                </div>

                <motion.div
                  className="absolute left-1/2 z-[5] flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full sm:h-12 sm:w-12"
                  style={{
                    top: "46%",
                    background: "radial-gradient(circle at 30% 25%, #D4B5B0, #8FA98F 50%, #6E856E 100%)",
                    boxShadow: "inset 0 2px 5px rgba(255,255,255,0.45), 0 5px 14px rgba(61,61,61,0.18)",
                  }}
                  animate={isOpening ? { scale: 0.6, opacity: 0 } : { scale: 1, opacity: 1 }}
                  transition={{ duration: 0.65, ease: SMOOTH_EASE, delay: isOpening ? 0.12 : 0 }}
                >
                  <span className="font-serif text-base font-bold text-white">P</span>
                </motion.div>
              </div>
            </div>
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute inset-0 z-30 flex items-center justify-center px-2"
          initial={false}
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : 36,
            scale: isOpen ? 1 : 0.95,
            filter: isOpen ? "blur(0px)" : "blur(8px)",
          }}
          transition={{
            duration: 1.05,
            ease: SMOOTH_EASE,
            delay: isOpen ? 0.12 : 0,
          }}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          <PilatesInvitationCard guest={guest} animateContent={isOpen} />
        </motion.div>
      </div>
    </div>
  );
}
