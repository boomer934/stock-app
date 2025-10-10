import React from "react";
import { Toaster } from "sonner";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className=" p-5">
      <Toaster position="top-center" richColors />
      {children} 
    </div>
  );
}
