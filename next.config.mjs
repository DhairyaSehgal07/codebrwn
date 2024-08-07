/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Only allow HTTPS images
        hostname: "utfs.io", // Add the hostname of the external image provider
      },
    ],
  },
};

export default nextConfig;
