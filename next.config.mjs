import dotenv from "dotenv";
import fs from "fs";
import path from "path";

if (process.env.NODE_ENV !== "production") {
  // Read the .env file directly for debugging
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    const tokenMatch = envContent.match(/^GITHUB_TOKEN=(.+)$/m);
    if (tokenMatch) {
      const rawToken = tokenMatch[1];
      console.log("GITHUB_TOKEN directly from .env file:", rawToken);

      // Override process.env.GITHUB_TOKEN with the raw token
      process.env.GITHUB_TOKEN = rawToken;
    } else {
      console.error("GITHUB_TOKEN not found in .env file.");
    }
  } else {
    console.error(".env file not found at path:", envPath);
  }

  dotenv.config();
}


/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN, // Expose the token to the app
  },
};

export default nextConfig;
