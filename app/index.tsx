import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./src/app";

const root = createRoot(document.getElementById("app")!);
root.render(<App />);