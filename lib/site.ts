// Site-wide settings. Change these in one place.
export const site = {
  name: "ENOS",
  product: "ENOS One",
  categoryLine: "One Account. Every Rail.",
  tagline: "The financial operating system for the Global South",
  // The digital-dollar balance shown across the page. USDT matches the Tether partnership; switch here if that changes.
  stablecoin: "USDT",
  // Where "Open your account" goes. Replace with the real sign-up / waitlist URL.
  signupUrl: "#get-started",
  // Partner and investor enquiries.
  contactEmail: "lawrence@enosone.com",
  // Hero visual: "e" follows the Masterbrand (cropped e, no abstract globes). "globe" restores the v4 particle globe.
  heroVisual: "e" as "e" | "globe",
  // Shown in the footer while the page is a draft.
  draftNote: "Draft for internal, investor and partner review · Not for publication · Illustrative figures marked on page",
};

// Proof points — canonical figures as ruled by Lawrence (60K active merchants, 11 Oct 2026; FY26 TPV per deck v18_EOS).
export const proof = [
  { value: "60K", label: "Active merchants on ENOS rails" },
  { value: "$0.85bn", label: "FY26 payment volume" },
  { value: "3", label: "Live markets today · HK · PH · UAE" },
  { value: "100+", label: "Countries reachable through partners" },
];
