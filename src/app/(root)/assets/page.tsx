"use client";
import SymbolInfo from "@/components/customized/SymbolInfo";
import AdvancedChart from "@/components/customized/AdvancedChart";
import CompanyProfile from "@/components/customized/CompanyProfile";
import TechnicalAnalisys from "@/components/customized/TechnicalAnalisys";
import FundamentalData from "@/components/customized/FoundamentalData";
import React from "react";
import { useSearchParams } from "next/navigation";

export default function Assets() {
  const searchParams = useSearchParams();
  const value = searchParams.get("value");
  console.log(value);
  return (
    <div className="w-full min-h-screen flex flex-col gap-2 sm:gap-4 items-start overflow-x-auto p-2 sm:p-4 lg:p-6">
      <div className="w-full overflow-x-auto p-2 sm:p-4 lg:p-6">
        <SymbolInfo symbol={value!} />
      </div>
      <div className="w-full overflow-x-auto p-2 h-[300px] sm:h-[400px] lg:h-[500px]">
        <AdvancedChart symbol={value!} />
      </div>
      <div className="flex flex-col lg:flex-row w-full gap-2 sm:gap-4">
        <div className="w-full overflow-x-auto p-2 h-[300px] sm:h-[400px] lg:h-[450px]">
          <CompanyProfile symbol={value!} />
        </div>
        <div className="w-full overflow-x-auto p-2 h-[300px] sm:h-[400px] lg:h-[450px]">
          <TechnicalAnalisys symbol={value!} />
        </div>
      </div>

      <div className="w-full overflow-x-auto p-2 h-[300px] sm:h-[400px] lg:h-[500px]">
        <FundamentalData symbol={value!} />
      </div>
    </div>
  );
}
