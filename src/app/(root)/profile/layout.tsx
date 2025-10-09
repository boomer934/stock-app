"use client"
import React from 'react'
import Header from '@/components/customized/Header'
import Footer from '@/components/customized/Footer'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();
export default function layout({children}: {children: React.ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="flex flex-col min-h-screen">
        <Header />
      <div className="flex flex-col min-h-screen">
        {children}
      </div>
      <Footer />
    </div>
    </QueryClientProvider>
  )
}
