import Image from "next/image";

/** Full-bleed pilates collab background for pilates invitation pages */
export function PilatesBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src="/hero-pilates.png"
        alt=""
        fill
        priority
        className="object-cover object-[center_45%]"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#3D3D3D]/20 via-[#3D3D3D]/10 to-[#3D3D3D]/30" />
    </div>
  );
}
