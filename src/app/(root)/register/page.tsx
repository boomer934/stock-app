"use client";
import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";

export default function Register() {
  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="relative z-10 w-full max-w-lg">
        <RegisterForm />
      </div>
    </div>
  );
}
