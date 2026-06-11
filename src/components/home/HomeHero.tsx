"use client";

import Image from "next/image";
import { OxaLogo } from "@/components/invite/OxaLogo";

export function HomeHero() {
  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden">
      <Image
        src="/hero-beach.png"
        alt="Oxa Pool Club beachfront with yellow and white striped umbrellas"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#0D3B66]/25 via-[#0D3B66]/10 to-[#0D3B66]/35]" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="rounded-sm bg-white/90 px-8 py-6 shadow-[0_20px_60px_rgba(13,59,102,0.2)] backdrop-blur-sm sm:px-10 sm:py-8">
          <OxaLogo className="[&_canvas]:max-h-24 [&_canvas]:max-w-[min(80vw,320px)] sm:[&_canvas]:max-h-28 sm:[&_canvas]:max-w-[360px]" />
        </div>

        <div className="mt-8 max-w-sm space-y-2 font-sans text-sm text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:text-base">
          <p>Your personal invitation awaits.</p>
          <p>Open the link shared with you.</p>
        </div>
      </div>
    </section>
  );
}