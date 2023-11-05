import { initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import superjson from "superjson";

/**
 * Create context for each request
 * This is where you would add your database connection, etc.
 */
export const createContext = async (opts: FetchCreateContextFnOptions) => {
  return {};
};

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC
  .context<typeof createContext>()
  .create({ transformer: superjson });
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  sayHello: publicProcedure.query(() => ({ hello: "world" })),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
