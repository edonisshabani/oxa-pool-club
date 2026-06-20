"use client";

import { SMOOTH_EASE } from "@/lib/motion";
import { motion } from "framer-motion";

interface InvitePhotoHintProps {
  text: string;
  visible: boolean;
  variant?: "pool" | "pilates";
}

const VARIANT_CLASSES = {
  pool: "border-white/35 bg-[#0D3B66]/82 text-[#FAF7F2]",
  pilates: "border-[#E8D5B7]/50 bg-[#FCFAF7]/92 text-[#3D3D3D]",
} as const;

export function InvitePhotoHint({
  text,
  visible,
  variant = "pool",
}: InvitePhotoHintProps) {
  return (
    <motion.p
      className={`pointer-events-none absolute top-[max(1.25rem,env(safe-area-inset-top))] z-20 rounded-full border px-5 py-2.5 font-sans text-[10px] font-medium uppercase tracking-[0.24em] shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-md sm:text-[11px] sm:tracking-[0.3em] ${VARIANT_CLASSES[variant]}`}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
      transition={{ duration: 0.8, ease: SMOOTH_EASE }}
    >
      {text}
    </motion.p>
  );
}
