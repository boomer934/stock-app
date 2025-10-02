"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { SearchSchema } from "@/lib/types/generic";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter(); // <-- Hook spostato qui

  const handleSearch = () => {
    const parsed = SearchSchema.safeParse({ search });
    if (!parsed.success) {
      console.error(parsed.error);
      return;
    }

    router.push("/search?value=" + encodeURIComponent(parsed.data.search));

    setSearch(""); // reset search value
  };

  return (
    <div className="w-auto h-auto flex gap-1 mx-4">
      <Input
        className="ring-yellow-400 text-white border-none bg-gray-700"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="search assets..."
      />
      <Button
        type="button"
        variant={"outline"}
        className="bg-yellow-400 text-black"
        onClick={handleSearch} // <-- usa direttamente la funzione
      >
        <Search />
      </Button>
    </div>
  );
}
