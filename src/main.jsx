import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { captureVisitRef, onDocumentClick } from "./utils/visitTracking";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

captureVisitRef();
document.addEventListener("click", onDocumentClick);

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);