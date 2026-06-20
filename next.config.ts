import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/merrymarry",
  images: { unoptimized: true },
};

export default nextConfig;
