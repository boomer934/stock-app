"use client";
import React from "react";
import LoginForm from "@/components/auth/LoginForm";

export default function Login() {
  return (
    <div className="h-full w-full bg-gray-900 flex justify-center py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
      <div className="relative z-10 w-full max-w-2xl">
        <LoginForm />
      </div>
    </div>
  );
}
