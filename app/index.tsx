import React from "react";
import { createRoot } from "react-dom/client";
import App from "./src/app";
import "./src/styles/index.css";
import "@fontsource/rajdhani/500.css";

const root = createRoot(document.getElementById("app")!);
root.render(<App />);
