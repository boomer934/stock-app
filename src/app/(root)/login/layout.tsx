import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-15 h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
