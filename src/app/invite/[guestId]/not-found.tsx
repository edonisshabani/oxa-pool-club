import { InvitePhotoMessage } from "@/components/invite/InvitePhotoMessage";
import { HeroBeachBackground } from "@/components/home/HeroBeachBackground";

export default function InviteNotFound() {
  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4">
      <HeroBeachBackground />
      <InvitePhotoMessage
        title="Invitation not found"
        description="We couldn't find an invitation for this link. Please check the URL or contact your host."
      />
    </div>
  );
}
