import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/o-nas", destination: "/", permanent: true },
      { source: "/wydarzenia", destination: "/#oferta", permanent: true },
      { source: "/wydarzenia/:path*", destination: "/#oferta", permanent: true },
      { source: "/letnie-obozy", destination: "/", permanent: true },
      { source: "/kontakt", destination: "/", permanent: true },
      { source: "/aktualnosci", destination: "/#news", permanent: false },
      {
        source: "/aktualnosci/:slug",
        destination: "/poradnik/:slug",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
