/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Only allow HTTPS images
        hostname: "utfs.io", // Add the hostname of the external image provider
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**", // Add this line to match the specific path pattern
      },
    ],
  },
};

export default nextConfig;
