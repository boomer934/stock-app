"use client";
import SymbolInfo from "@/components/customized/SymbolInfo";
import AdvancedChart from "@/components/customized/AdvancedChart";
import CompanyProfile from "@/components/customized/CompanyProfile";
import TechnicalAnalisys from "@/components/customized/TechnicalAnalisys";
import FundamentalData from "@/components/customized/FoundamentalData";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Assets() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const value = searchParams.get("value");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Force complete page re-render when symbol changes
    setRefreshKey(prev => prev + 1);

    // Also force a hard refresh if needed
    if (value) {
      console.log('Symbol changed to:', value);
    }
  }, [value]);

  // Force refresh when component mounts or symbol changes significantly
  useEffect(() => {
    if (value) {
      // Small delay to ensure all components are ready
      const timer = setTimeout(() => {
        console.log('Forcing component refresh for symbol:', value);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [value, refreshKey]);

  if (!value) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">Select a Symbol</h2>
          <p className="text-gray-400">Please search for a stock symbol to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 sm:gap-6 p-4 sm:p-6" key={`assets-${value}-${refreshKey}`}>
      {/* SymbolInfo - Full width, responsive height */}
      <div className="w-full">
        <div className="bg-gray-800 rounded-lg p-4 h-[300px]">
          <SymbolInfo symbol={value} key={`symbol-info-${value}-${refreshKey}`} />
        </div>
      </div>

      {/* AdvancedChart - Full width, larger height */}
      <div className="w-full">
        <div className="bg-gray-800 rounded-lg p-4 h-[400px] sm:h-[500px] lg:h-[600px]">
          <AdvancedChart symbol={value} key={`chart-${value}-${refreshKey}`} />
        </div>
      </div>

      {/* CompanyProfile and TechnicalAnalysis - Side by side on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="w-full">
          <div className="bg-gray-800 rounded-lg p-4 h-[400px] sm:h-[450px]">
            <CompanyProfile symbol={value} key={`profile-${value}-${refreshKey}`} />
          </div>
        </div>
        <div className="w-full">
          <div className="bg-gray-800 rounded-lg p-4 h-[400px] sm:h-[450px]">
            <TechnicalAnalisys symbol={value} key={`analysis-${value}-${refreshKey}`} />
          </div>
        </div>
      </div>

      {/* FundamentalData - Full width */}
      <div className="w-full">
        <div className="bg-gray-800 rounded-lg p-4 h-[400px] sm:h-[500px] lg:h-[600px]">
          <FundamentalData symbol={value} key={`data-${value}-${refreshKey}`} />
        </div>
      </div>
    </div>
  );
}
