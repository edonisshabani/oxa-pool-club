import Image from "next/image";

interface OxaLogoProps {
  className?: string;
  /** sm = compact (envelope peek), md = default, lg = hero */
  size?: "sm" | "md" | "lg";
  priority?: boolean;
}

const SIZE_CLASSES = {
  sm: "max-h-8 max-w-[100px] sm:max-h-9 sm:max-w-[120px]",
  md: "max-h-16 max-w-[min(75vw,240px)] sm:max-h-20 sm:max-w-[280px]",
  lg: "max-h-24 max-w-[min(85vw,320px)] sm:max-h-28 sm:max-w-[360px]",
} as const;

export function OxaLogo({
  className = "",
  size = "md",
  priority = false,
}: OxaLogoProps) {
  const src = "/oxa-logo-transparent.png";

  return (
    <Image
      src={src}
      alt="Oxa Pool Club"
      width={720}
      height={240}
      priority={priority}
      unoptimized
      className={`mx-auto h-auto w-auto ${SIZE_CLASSES[size]} ${className}`}
    />
  );
}