import React from "react";
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ModeProvider } from "./context/ModeContext";
import "./index.css"; // Make sure this is imported before the App

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <HashRouter>
      <ModeProvider>
        <App />
      </ModeProvider>
    </HashRouter>
  </React.StrictMode>
);