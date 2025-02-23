import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient} data-oid="1xvdj6z">
    <BrowserRouter data-oid="-j9p7n4">
      <StrictMode data-oid="fsg.0ps">
        <App data-oid="gqqex_x" />
      </StrictMode>
    </BrowserRouter>
  </QueryClientProvider>,
);
