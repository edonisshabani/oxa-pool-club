import { redirect } from "next/navigation";

type SearchParams = Promise<{ guest?: string }>;

/**
 * Supports query-style links: /invite/pilates?guest=john-doe
 * Redirects to the canonical dynamic route /invite/pilates/[guestId].
 */
export default async function PilatesInviteQueryPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { guest } = await searchParams;

  if (!guest?.trim()) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-[#E8E1D9] px-4 text-center">
        <div>
          <p className="font-serif text-2xl text-[#3D3D3D]">Invalid invitation</p>
          <p className="mt-2 font-sans text-sm text-[#6B625C]">
            This link appears to be incomplete. Please use the full pilates invitation URL
            provided to you.
          </p>
        </div>
      </div>
    );
  }

  const slug = guest.trim().toLowerCase().replace(/_/g, "-");
  redirect(`/invite/pilates/${slug}`);
}
