import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import ErrorBoundary from "./components/global/error-boundary";
import { initializeAppSafety } from "./lib/app-safety";
import './styles/global.css'

// Initialize app safety measures to prevent native alerts
initializeAppSafety();

// Global error handlers to prevent native alerts
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Prevent default browser error handling
  event.preventDefault();
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Prevent default browser error handling
  event.preventDefault();
});

const isDev = import.meta.env.DEV;

// Create root with concurrent features for better performance
const root = ReactDOM.createRoot(document.getElementById("root")!);

// Main App component (exported for Fast Refresh)
function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

// Render the app
root.render(
  isDev ? (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) : (
    <App />
  )
);

// Export for Fast Refresh
export default App;
