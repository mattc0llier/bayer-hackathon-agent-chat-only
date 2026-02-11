import { vercelAdapter } from "@flags-sdk/vercel";
import { flag } from "flags/next";

export const enableRemoteComponentCssIsolationExampleFlag = flag({
  key: "enable-remote-component-css-isolation-example",
  adapter: vercelAdapter(),
});
