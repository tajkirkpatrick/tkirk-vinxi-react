import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import { useState, StrictMode, lazy, Suspense } from "react";
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
        <main className="flex min-h-[90vh] items-center justify-center">
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

const catchAllRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => {
    return (
      <div>
        <h1>404 | Page Not Found</h1>
      </div>
    );
  },
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  catchAllRoute,
]);

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
      <Suspense fallback={<div>Loading...</div>}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </trpc.Provider>
      </Suspense>
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
