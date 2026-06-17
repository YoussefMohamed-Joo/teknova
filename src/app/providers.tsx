"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ReactLenis } from "lenis/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [qc] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 1000 * 60 * 5, retry: 1 },
        },
      })
  );

  return (
    <QueryClientProvider client={qc}>
      <ReactLenis
        root
        options={{
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          wheelMultiplier: 1,
        }}
      >
        {children}
      </ReactLenis>
    </QueryClientProvider>
  );
}
