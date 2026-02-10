import type { NextConfig } from "next";
import { withRemoteComponents } from "remote-components/next/config";
import { withMicrofrontends } from "@vercel/microfrontends/next/config";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/components/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type" },
        ],
      },
    ];
  },
};

export default withRemoteComponents(
  withMicrofrontends(nextConfig),
  {
    // Shared dependencies between host and remote
    shared: ["react", "react-dom"],
  }
);
