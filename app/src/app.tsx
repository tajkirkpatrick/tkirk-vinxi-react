import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import { useState, StrictMode, lazy } from "react";
import superjson from "superjson";
import type { AppRouter } from "../../server/trpc/router";
import Home from "./home";
import {
  Outlet,
  RouterProvider,
  Router,
  Route,
  RootRoute,
} from "@tanstack/react-router";
import NavBar from "./components/navbar";
import About from "./about";

// Render the devtools in development
const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

// Create a root route
const rootRoute = new RootRoute({
  component: () => {
    return (
      <>
        <NavBar />
        <main className="flex items-center justify-center">
          <Outlet />
        </main>
        <TanStackRouterDevtools initialIsOpen={false} />
      </>
    );
  },
});

// Create an index route
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

// Create the router using your route tree
const router = new Router({ routeTree });

export const trpc = createTRPCReact<AppRouter>();

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
        }),
      ],
    }),
  );

  return (
    <StrictMode>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </trpc.Provider>
    </StrictMode>
  );
}

// Register your router for maximum type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default App;
