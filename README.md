# ENOS — marketing site

**ENOS_Website_v4_24Nov2026 · INTERNAL DRAFT** for internal, investor and partner review; not for publication. Supersedes v3. v4 rewrites the copy to the ENOS One story: one-person companies lead, every business type is served, USDT replaces USDC, and the page adds a proof strip and a mission section.

Single-page marketing site built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion and three.js. It has no backend, and Vercel deploys it with default settings.

## Run locally

Requires Node 20 or later.

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build check:

```bash
npm run build && npm start
```

## Deploy to Vercel

**Option A — GitHub (recommended)**
1. Push this folder to a GitHub repo.
2. In Vercel, go to **Add New → Project**, import the repo and click **Deploy**. Vercel detects Next.js automatically, so there's nothing to configure.
3. Add the domain under **Settings → Domains**. Only do this once the site is approved to replace the live enosone.com.

**Option B — Vercel CLI**
```bash
npm i -g vercel
vercel            # preview deployment
vercel --prod     # production
```

**Static export (optional):** `npm run export` writes a plain static site to `/out` that can be hosted anywhere.

## Settings

All page settings are in `lib/site.ts`:

| Setting | Now | Action |
|---|---|---|
| `signupUrl` | `#get-started` (scrolls to the final CTA) | Replace with the real sign-up or waitlist URL |
| `contactEmail` | `lawrence@enosone.com` | Partner and investor enquiries |
| `stablecoin` | `USDT` | The digital-dollar balance named across the page — change it in one place |
| `proof` | 60K merchants · $0.85bn FY26 volume · HK/PH/UAE · 200+ countries | Canonical figures; update when they change |
| `draftNote` | Draft banner in the footer | Replace with the legal disclosure before publishing |

All balances, invoices and names in the product mockups are made up for illustration.

## Structure

```
app/
  layout.tsx       metadata, fonts
  page.tsx         section order
  globals.css      ENOS brand tokens, marquee, grain
components/
  Nav, Hero, Globe (three.js), Marquee, Problem, Solution (3D phone),
  ProofStrip, FlowStory (pinned scroll story), WaysIn (mission + every customer type),
  Features, FinalCTA, Footer, Reveal
lib/
  site.ts          page settings and proof figures
  land-dots.json   pre-computed land points for the globe (Natural Earth 110m, public domain)
public/            ENOS wordmark, "e" mark, favicon
```

## Design system (ENOS brand)

- **Colours:** forest `#001A0F` / `#002415` / `#00331E`, lime accent `#E1FF33`, teal `#66D7D7` (`#138F89` for text on light backgrounds), amber `#FFD470`, and light sections in paper `#F7F7F3` / mist `#ECEDE7`.
- **Type:** Playfair Display for headlines, with the accent word in italic. Epilogue for body text and Spline Sans Mono for labels. All three fonts are self-hosted through `@fontsource`.
- **Hero:** a three.js particle globe. The Global South is lit in lime, and animated payment corridors run between cities. The globe follows the mouse and scroll, pauses when it's off-screen, and stays still for visitors whose system is set to reduce motion. The route list is illustrative.
- **Scroll story (`FlowStory.tsx`):** a 420vh section with a pinned scene. Invoices fly in from Lagos, Manila, Karachi and São Paulo over local payment rails, the balance counts up, the USD and USDC bars fill, AI and SaaS tools snap onto the account, and a revenue line climbs. All figures are illustrative.
- **App animations:** the balance counts up when the phone scrolls into view, a "paid" notification springs in, the Pay button ripples and the recent payments slide in.
- **Motion:** scroll-linked 3D phone, a giant-word parallax behind it, an italic marquee band, and content that de-blurs in on scroll. All motion respects the visitor's reduce-motion setting.
