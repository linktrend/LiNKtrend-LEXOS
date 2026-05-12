import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Playwright / tooling often uses 127.0.0.1 while Next prints localhost; allow dev RSC/HMR.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
