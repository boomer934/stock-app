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

    router.push("/assets?value=" + encodeURIComponent(parsed.data.search));

    setSearch(""); // reset search value
  };

  return (
    <div className="w-auto h-auto flex gap-1 mx-4">
      <div
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      }}
        onClick={() => setOpen(!open)}
        className="ring-yellow-400 text-white border-none bg-gray-700 w-auto rounded-xl p-1 px-5"
      >
        <span className="text-gray-400">Search assets...</span>
      </div>
      {open && <BgCoverSearchBar open={open} setOpen={setOpen}/>}
    </div>
  );
}
