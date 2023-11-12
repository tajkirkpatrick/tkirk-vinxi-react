import react from "react";
import { Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "../components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { cn } from "../lib/utils";
import Logo from "./logo";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";

function NavBar() {
  const [open, setOpen] = react.useState(false);

  return (
    <nav className="min-w-screen flex min-h-[10vh] items-center justify-between border-b-[1px] border-black px-4 text-black shadow-md">
      <Link to="/" className="text-2xl">
        <Logo />
      </Link>
      <ul className="flex list-none flex-row gap-x-2">
        <li>
          <ModeToggle />
        </li>
        <li>
          <Sheet onOpenChange={setOpen} open={open}>
            <SheetTrigger>
              <Button
                variant="primary"
                className="text-white dark:text-[#0F161A]"
              >
                Menu
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full">
              <SheetHeader className="flex flex-col items-center">
                <SheetTitle className="text-2xl">Where to?</SheetTitle>
                <SheetDescription>
                  <ul className="flex list-none flex-col items-center gap-y-2">
                    <li>
                      <Link
                        to="/"
                        onClick={() => setOpen(false)}
                        className={cn(
                          buttonVariants({ variant: "link" }),
                          "text-lg font-medium",
                        )}
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about"
                        onClick={() => setOpen(false)}
                        className={cn(
                          buttonVariants({ variant: "link" }),
                          "text-md font-medium",
                        )}
                      >
                        About
                      </Link>
                    </li>
                  </ul>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
