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
      name: "trpc",
      mode: "handler",
      handler: "./server/trpc/handler.ts",
      base: "/api/trpc",
      target: "server",
    },
    {
      name: "client",
      mode: "spa",
      handler: "./client.ts",
      target: "browser",
      plugins: () => [reactRefresh()],
    },
  ],
});
