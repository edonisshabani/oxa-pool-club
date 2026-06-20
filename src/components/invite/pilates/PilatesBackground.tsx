export function PilatesBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 45%), linear-gradient(160deg, #E8E1D9 0%, #D9CFC7 38%, #C8B8AE 100%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.18),transparent_30%)]" />
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
}
