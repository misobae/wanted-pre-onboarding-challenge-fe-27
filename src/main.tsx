import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import "./tailwind.css";
import Router from "./routes/index.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
);
