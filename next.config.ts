import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname:
          "/a/ACg8ocJ5IJx0nkakG1fNenVjnzlEPlmjEFP2-EiPoWM4rZVPjEfs6EDZ=s96-c",
      },
    ],
  },
};

export default nextConfig;
