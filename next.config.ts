import type { NextConfig } from "next";
import { withRemoteComponents } from "remote-components/next/config";
import { withMicrofrontends } from "@vercel/microfrontends/next/config";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withRemoteComponents(withMicrofrontends(nextConfig), {
  shared: ["@/shared/chat-context-provider"],
});
