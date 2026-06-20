"use client";

import { OxaLogo } from "@/components/invite/OxaLogo";
import type { ReactNode } from "react";

interface InvitePhotoMessageProps {
  title: string;
  description: string;
  logoClassName?: string;
  children?: ReactNode;
}

export function InvitePhotoMessage({
  title,
  description,
  logoClassName = "mb-6",
  children,
}: InvitePhotoMessageProps) {
  return (
    <div className="relative z-10 w-full max-w-md rounded-sm border border-white/60 bg-white/94 px-8 py-10 text-center shadow-[0_20px_60px_rgba(26,75,124,0.16)] backdrop-blur-md">
      <OxaLogo size="md" priority className={logoClassName} />
      {children}
      <p className="font-serif text-3xl text-[#0D3B66]">{title}</p>
      <p className="mt-3 font-sans text-sm leading-relaxed text-[#2E6B9E]">{description}</p>
    </div>
  );
}
