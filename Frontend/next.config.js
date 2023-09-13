/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   swcMinify: true,
   optimizeFonts: true,
   images: {
      remotePatterns: [
         {
            protocol: "http",
            hostname: "127.0.0.1",
            port: "8000",
            pathname: "/**",
         },
      ],
   },
};
module.exports = nextConfig;
