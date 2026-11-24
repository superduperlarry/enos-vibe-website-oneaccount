/** @type {import('next').NextConfig} */
const nextConfig = {
  // `npm run export` sets STATIC_EXPORT=1 to produce a plain static site in /out.
  // Vercel deploys use the default (no export) — nothing to configure.
  output: process.env.STATIC_EXPORT ? "export" : undefined,
  // Relative asset paths so the exported site also works from a sub-folder.
  assetPrefix: process.env.STATIC_EXPORT ? "." : undefined,
  images: { unoptimized: true },
};
export default nextConfig;
