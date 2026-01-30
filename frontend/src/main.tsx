import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // es un contexto que habilita leer la url actual cambiar la url sin recargar y que link y routes funcionen.
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter> {/* para que toda la app pueda usar rutas */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
