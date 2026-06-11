import Image from "next/image";

/** Full-bleed beach hero background shared by home and invite pages */
export function HeroBeachBackground() {
  return (
    <>
      <Image
        src="/hero-beach.png"
        alt=""
        fill
        priority
        className="object-cover object-center sm:object-[center_35%]"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D3B66]/25 via-[#0D3B66]/10 to-[#0D3B66]/35]" />
    </>
  );
}