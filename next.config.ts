import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "r2-proxy-worker.andriyivvanyuk.workers.dev",
        pathname: "/**", // дозволяє всі шляхи
      },
      {
        protocol: "https",
        hostname: "pub-f2a1168bcc8267043d925c14d7a08960.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
