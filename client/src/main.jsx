import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import LanguageProvider from "./components/LanguageProvider.jsx";
import ToastProvider from "./components/ToastProvider.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
