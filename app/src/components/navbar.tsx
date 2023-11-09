import react from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";

function NavBar() {
  return (
    <nav className="min-w-screen flex min-h-[10vh] items-center justify-between border-b-[1px] border-black px-4 text-black shadow-md">
      <Link to="/" className="text-2xl">
        <h1 id="title">TKIRK DEV</h1>
      </Link>
      <ul className="flex h-full items-center justify-center space-x-4">
        <Link to="/about">
          <Button>About</Button>
        </Link>
      </ul>
    </nav>
  );
}

export default NavBar;
