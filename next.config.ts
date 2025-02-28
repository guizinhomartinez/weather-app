import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
  experimental: {
    // missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;