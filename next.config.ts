import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MONGODB_URI:
      process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/hospcare",
  },
};

export default nextConfig;
