"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const value = searchParams.get("value");

  useEffect(() => {
    // Redirect to assets page with the search value
    if (value) {
      router.replace(`/assets?value=${encodeURIComponent(value)}`);
    } else {
      // If no value, redirect to home
      router.replace("/");
    }
  }, [value, router]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-4"></div>
        <p className="text-gray-400">Redirecting...</p>
      </div>
    </div>
  );
}
