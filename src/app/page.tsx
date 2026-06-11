import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gradient-to-b from-[#F5E6D3] to-[#FAF7F2] px-4 text-center">
      <p className="font-serif text-3xl tracking-wide text-[#0D3B66] sm:text-4xl">
        Oxa Pool Club
      </p>
      <p className="mt-2 font-sans text-sm uppercase tracking-[0.3em] text-[#C9A962]">
        Côte d&apos;Azur
      </p>
      <p className="mt-8 max-w-md font-sans text-sm text-[#2E6B9E]">
        Your personal invitation awaits. Open the link shared with you, or manage
        guests from the admin dashboard.
      </p>
      <Link
        href="/admin"
        className="mt-8 rounded-sm bg-[#1A4B7C] px-6 py-3 font-sans text-xs font-medium uppercase tracking-wider text-white transition hover:bg-[#2E6B9E]"
      >
        Admin Dashboard
      </Link>
    </div>
  );
}
