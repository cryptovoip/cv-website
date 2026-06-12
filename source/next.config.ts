import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Deployed on Vercel as a full Next.js app (not a static export) so that
  // server features like the /api/contact route work.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
