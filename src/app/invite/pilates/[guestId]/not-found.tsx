import { OxaLogo } from "@/components/invite/OxaLogo";
import { PilatesBackground } from "@/components/invite/pilates/PilatesBackground";

export default function PilatesInviteNotFound() {
  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 text-center">
      <PilatesBackground />
      <div className="relative z-10">
        <OxaLogo
          size="md"
          priority
          className="mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
        />
        <p className="font-serif text-3xl text-white drop-shadow-md">Invitation not found</p>
        <p className="mt-3 max-w-sm font-sans text-sm text-white/90 drop-shadow">
          We couldn&apos;t find a pilates collab invitation for this link. Please check the URL or
          contact your host.
        </p>
      </div>
    </div>
  );
}
