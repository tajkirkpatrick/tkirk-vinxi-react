import react from "react";
import { Link } from "@tanstack/react-router";

function NavBar() {
  return (
    <nav className="min-w-screen h-[48px] bg-black text-white">
      <ul className=" flex h-full flex-row items-center justify-center space-x-2">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </ul>
    </nav>
  );
}

export default NavBar;
