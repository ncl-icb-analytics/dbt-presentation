import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  env: {
    NEXT_PUBLIC_BUILD_TIME: Date.now().toString(),
  },
};

export default nextConfig;
