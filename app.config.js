import { createApp } from "vinxi";
import reactRefresh from "@vitejs/plugin-react";

export default createApp({
  routers: [
    {
      name: "public",
      mode: "static",
      dir: "./public",
    },
    {
      name: "client",
      mode: "spa",
      handler: "./index.ts",
      target: "browser",
      plugins: () => [reactRefresh()],
    },
  ],
});
