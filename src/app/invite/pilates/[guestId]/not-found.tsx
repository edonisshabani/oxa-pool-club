import { InvitePhotoMessage } from "@/components/invite/InvitePhotoMessage";
import { PilatesBackground } from "@/components/invite/pilates/PilatesBackground";

export default function PilatesInviteNotFound() {
  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4">
      <PilatesBackground />
      <InvitePhotoMessage
        title="Invitation not found"
        description="We couldn't find a pilates collab invitation for this link. Please check the URL or contact your host."
      />
    </div>
  );
}
