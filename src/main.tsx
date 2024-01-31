import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import ErrorBoundary2 from "./components/ErrorBoundary2.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Check if it possible to render different errors by wrapping the entire app */}
    {/* <ErrorBoundary2 fallback={<div>There was an error</div>}> */}
    <App />
    {/* </ErrorBoundary2> */}
  </React.StrictMode>
);
