import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/ABUO023/SEG_3525-Devoir_5",
        permanent: true,
      },
      {
        source: "/figma",
        destination:
          "https://www.figma.com/design/5JhqwhrtXKBQmKPNKeiuNn/Untitled?node-id=0-1&t=m0mtzu6eAHQJrjMC-1",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
