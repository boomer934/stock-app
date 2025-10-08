"use client";
import Header from "@/components/customized/Header";
import Footer from "@/components/customized/Footer";
import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full min-h-screen flex flex-col">
        <Header />
        <div className="p-4 w-full flex-1">{children}</div>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
