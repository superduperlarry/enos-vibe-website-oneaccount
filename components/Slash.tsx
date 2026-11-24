/**
 * PLACEHOLDER for the enos slash (the swooping element and dart from the e).
 * Swap for the official asset (assets/elements/enos-slash-*.png) when available.
 */
export default function Slash({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} fill="none" aria-hidden>
      <path d="M4 34 C 34 32, 70 22, 104 8" stroke={color} strokeWidth="5" strokeLinecap="round" />
      <path d="M92 4 L116 4 L104 22 Z" fill={color} />
    </svg>
  );
}
