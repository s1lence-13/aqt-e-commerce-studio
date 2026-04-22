export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-2xl font-semibold tracking-tight leading-none ${className}`}
      aria-label="AQT"
    >
      <span>AQ</span>
      <span className="text-accent">·</span>
      <span>T</span>
    </span>
  );
}
