import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import FavoritesProvider from "./Pages/FavoritesContext";
import { Loop } from "@mui/icons-material";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <ThemeProvider>
      <FavoritesProvider> 
          <App />
      </FavoritesProvider>
      
    </ThemeProvider>

);


