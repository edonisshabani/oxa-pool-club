import Image from "next/image";

interface HeroBeachStripProps {
  className?: string;
}

export function HeroBeachStrip({ className = "" }: HeroBeachStripProps) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div className="relative h-44 w-full sm:h-56 md:h-64">
        <Image
          src="/hero-beach.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/40 to-transparent" />
      </div>
    </div>
  );
}