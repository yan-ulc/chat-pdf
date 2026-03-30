import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Kasih tahu Next.js untuk memperlakukan transformers sebagai paket eksternal
  serverExternalPackages: ['@xenova/transformers'],
  
  // 2. Jika kamu pakai fitur image atau output tertentu (opsional tapi aman)
  images: {
    remotePatterns: [{ hostname: 'uploadthing.com' }],
  },

  // 3. Matikan turbopack di build jika error menetap (opsional)
  // Tapi coba langkah 1 dulu saja.
};

export default nextConfig;