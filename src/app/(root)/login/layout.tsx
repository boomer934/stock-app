import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-7 h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
