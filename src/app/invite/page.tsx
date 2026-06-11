import { redirect } from "next/navigation";

type SearchParams = Promise<{ guest?: string }>;

/**
 * Supports legacy/query-style links: /invite?guest=john-doe
 * Redirects to the canonical dynamic route /invite/[guestId].
 */
export default async function InviteQueryPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { guest } = await searchParams;

  if (!guest?.trim()) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-[#F5E6D3] px-4 text-center">
        <div>
          <p className="font-serif text-2xl text-[#0D3B66]">Invalid invitation</p>
          <p className="mt-2 font-sans text-sm text-[#2E6B9E]">
            This link appears to be incomplete. Please use the full invitation URL
            provided to you.
          </p>
        </div>
      </div>
    );
  }

  const slug = guest.trim().toLowerCase().replace(/_/g, "-");
  redirect(`/invite/${slug}`);
}
