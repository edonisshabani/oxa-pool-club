"use client";

import { OxaLogo } from "@/components/invite/OxaLogo";
import { HeroBeachBackground } from "./HeroBeachBackground";

export function HomeHero() {
  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden">
      <HeroBeachBackground />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <OxaLogo
          size="lg"
          priority
          className="drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
        />

        <div className="mt-8 max-w-sm space-y-2 font-sans text-sm text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:text-base">
          <p>Your personal invitation awaits.</p>
          <p>Open the link shared with you.</p>
        </div>
      </div>
    </section>
  );
}