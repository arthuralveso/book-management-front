import React from "react";
import Router from "./routes";
import "./global.css";
import { AppProvider } from "./Context/AppContext";

function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}

export default App;
