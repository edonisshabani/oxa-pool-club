export default function InviteNotFound() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-b from-[#F5E6D3] to-[#FAF7F2] px-4 text-center">
      <div>
        <p className="font-serif text-3xl text-[#0D3B66]">Invitation not found</p>
        <p className="mt-3 max-w-sm font-sans text-sm text-[#2E6B9E]">
          We couldn&apos;t find an invitation for this link. Please check the URL or
          contact your host.
        </p>
      </div>
    </div>
  );
}
