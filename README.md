# ENOS — marketing site

**ENOS_Website_v6_24Nov2026 · INTERNAL DRAFT** for internal, investor and partner review; not for publication. One codebase serves two designs: **`/`** has the globe hero and **`/latest`** has the brand-book cropped e. Everything else is shared and follows the ENOS Brand Book (Masterbrand Edition 02). v4 is kept at git tag `v4-archive`.

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
| `signupUrl` | `#get-started` (the sign-up form) | Replace with the real app URL when there is one |
| `waitlistEndpoint` | empty: the form opens the visitor's email app, addressed to `contactEmail` | Set a JSON POST endpoint (Formspree, a Vercel function, a CRM webhook); success shows only on a 2xx |
| `whatsappNumber` | empty (button hidden) | Digits with country code to show "Chat with us on WhatsApp" |
| `calculator` | example assumptions; `enosFeePct: null` | Set ENOS's all-in fee % to switch on the "keep $X" comparison |
| `contactEmail` | `lawrence@enosone.com` | Partner and investor enquiries |
| `stablecoin` | `USDT` | The digital-dollar balance named across the page — change it in one place |
| `proof` | 60K merchants · $0.85bn FY26 volume · HK/PH/UAE · 100+ countries | Canonical figures; update when they change |
| `draftNote` | Draft note in the footer; also sets `noindex` | Clear it when the page is approved to publish |

**Before publishing:** fill the two bracketed licence numbers in `components/Footer.tsx` (the compliance block), and replace the placeholder sections of `/privacy` and `/terms` (`app/privacy`, `app/terms`) with the approved legal text. Anything still to supply shows as a dashed saffron box.

All balances, invoices and names in the product mockups are made up for illustration.

## Structure

```
app/
  layout.tsx       metadata, fonts
  page.tsx         section order
  globals.css      ENOS brand tokens, marquee, grain
components/
  Nav, Hero (cropped e / optional Globe), Problem, Solution (3D phone),
  GreenBand, Slash (placeholder), FlowStory (pinned scroll story), WaysIn (mission + every customer type),
  Agents (Harness & Agent OS demo), Features, Savings (fees calculator), FinalCTA (sign-up form),
  Footer (nav + compliance notice), LegalPage (/privacy, /terms stubs), Placeholder, Reveal
lib/
  site.ts          page settings and proof figures
  land-dots.json   pre-computed land points for the globe (Natural Earth 110m, public domain)
public/            ENOS wordmark (white, Deep Green), e mark (white, chartreuse, Deep Green), favicon
```

## Design system — ENOS Brand Book (Masterbrand Edition 02)

- **Palette (assets):** Deep Green `#123D32` (heroes, covers), Parchment `#E9E2D5` (light grounds), White, Ink `#171A18`. ENOS Green `#00A94F` is used once per view: the one full-green band. Chartreuse `#D8FF32` marks the accent word and the cropped e on Deep Green. Supporting colours: Mineral Green `#315E50` for panels, Saffron `#D9A441` for thin outlines on Deep Green, and Ube Halaya `#5B3D8F` only on anything AI.
- **Section rhythm:** Deep Green → ENOS Green → Parchment → White → Deep Green → Parchment → Deep Green → White → Parchment → Deep Green.
- **Type:** Playfair Display 700 headlines in Title Case, with one italic accent at 500. Epilogue for body text. Spline Sans Mono for eyebrows and labels (uppercase, 0.16em, with a short leading rule). Inter for the product UI (phone, account card, invoice chips), with tabular figures.
- **Shape:** cards 20px, panels 32px, pill buttons. Warm, green-tinted shadows.
- **Motion:** fade and rise on `cubic-bezier(0.16, 1, 0.3, 1)`, a slight lift on hover, `scale(0.97)` on press. No infinite decorative loops: the marquee is gone and the payment toast plays once.
- **Design elements:** the stylized e, cropped to the artboard edge with its vertex showing, appears in the hero, the mission card and the closing section. `components/Slash.tsx` is a **placeholder** for the enos slash; swap in the official asset.
- **Two heroes:** `app/page.tsx` renders the globe and `app/latest/page.tsx` renders the cropped e. Both use `components/HomePage.tsx`, so every other change applies to both. A Globe | Latest toggle (bottom-left) is for reviewers only; turn it off with `site.showVersionSwitch`.
