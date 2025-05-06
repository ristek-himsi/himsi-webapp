/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["dvffltyreacaqzoeiicc.supabase.co", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dvffltyreacaqzoeiicc.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
