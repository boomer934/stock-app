"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { SearchSchema } from "@/lib/types/generic";
import { useRouter } from "next/navigation";
import BgCoverSearchBar from "./BgCoverSearchBar";

export default function SearchBar() {
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSearch = () => {
    const parsed = SearchSchema.safeParse({ search });
    if (!parsed.success) {
      console.error(parsed.error);
      return;
    }

    // Force a hard refresh to ensure clean state
    const targetUrl = `/assets?value=${encodeURIComponent(parsed.data.search)}`;
    window.location.href = targetUrl;

    setSearch(""); // reset search value
  };

  return (
    <div className="w-full h-auto flex gap-1">
      <div
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      }}
        onClick={() => setOpen(!open)}
        className="ring-yellow-400 text-white border-none bg-gray-700 w-full rounded-lg sm:rounded-xl p-2 sm:p-3 px-3 sm:px-5 cursor-pointer hover:bg-gray-600 transition-colors"
      >
        <span className="text-gray-400 text-sm sm:text-base">Search assets...</span>
      </div>
      {open && <BgCoverSearchBar open={open} setOpen={setOpen}/>}
    </div>
  );
}
