/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  experimental: {
    missingSuspenseWithCSRBailout: false,
    serverComponentsExternalPackages: ["node-appwrite"],
  },
  images: {
    remotePatterns: [
      { hostname: "firebasestorage.googleapis.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "pc-cdn.b-cdn.net" },
      { hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
