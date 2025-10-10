"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 p-4 sm:p-6">
      <div className="w-full">
        <h1 className="text-2xl font-bold text-white mb-4">Search Results</h1>
        {query ? (
          <div className="bg-gray-800 rounded-lg p-6">
            <p className="text-gray-300">Searching for: <span className="text-white font-semibold">{query}</span></p>
            <div className="mt-4">
              <p className="text-gray-400">Search functionality will be implemented here.</p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-6">
            <p className="text-gray-400">Enter a search query to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading search...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
