import { eventHandler, toWebRequest } from "vinxi/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter, createContext } from "./router";

export default eventHandler((event) => {
  return fetchRequestHandler({
    router: appRouter,
    endpoint: "/api/trpc",
    req: toWebRequest(event),
    createContext,
  });
});
