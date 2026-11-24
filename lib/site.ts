// Site-wide settings. Change these in one place.
export const site = {
  name: "ENOS",
  product: "ENOS One",
  categoryLine: "One Account. Every Rail.",
  tagline: "The financial operating system for the Global South",
  // The digital-dollar balance shown across the page. USDT matches the Tether partnership; switch here if that changes.
  stablecoin: "USDT",
  // Where "Open your account" goes: the sign-up form at the bottom of the page. Replace with the real app URL when there is one.
  signupUrl: "#get-started",
  // Where the sign-up form posts (JSON). Leave empty and the form opens the visitor's email app, addressed to contactEmail.
  // Any endpoint that accepts a JSON POST and answers 2xx works (Formspree, a Vercel function, a CRM webhook).
  waitlistEndpoint: "",
  // WhatsApp number for "Chat with us on WhatsApp", digits only with country code (e.g. "85212345678"). Empty hides the button.
  whatsappNumber: "",
  // Partner and investor enquiries.
  contactEmail: "lawrence@enosone.com",
  // Default hero visual. "/" uses the globe and "/latest" uses the cropped e (see app/).
  heroVisual: "globe" as "e" | "globe",
  // Review-only Globe | Latest toggle, bottom-left. Set false before publishing.
  showVersionSwitch: true,
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

// The live markets, used by the mockups so their examples stay inside them.
export const liveMarkets = ["Hong Kong", "Philippines", "UAE"] as const;

// Savings calculator. Every number here is an example assumption the visitor can change, never an ENOS quote.
export const calculator = {
  monthly: 2000, // USD received per month
  wireFee: 25, // flat fee per incoming payment, USD
  fxSpread: 3, // % lost to FX on conversion
  paymentsPerMonth: 2,
  // ENOS's own all-in fee in %, once confirmed. null hides the ENOS comparison and shows a marked placeholder.
  enosFeePct: null as number | null,
};
