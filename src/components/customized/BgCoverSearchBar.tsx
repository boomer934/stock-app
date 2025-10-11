import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { SearchSchema } from "@/lib/types/generic";
import AutoSuggestions from "./AutoSuggestions";
import {MagnifyingGlassIcon, Cross1Icon} from "@radix-ui/react-icons"

export default function BgCoverSearchBar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSearch = () => {
    const parsed = SearchSchema.safeParse({ search });
    if (!parsed.success) {
      console.error(parsed.error);
      return;
    }

    // Force a hard refresh to ensure clean state
    const targetUrl = `/assets?value=${encodeURIComponent(parsed.data.search)}`;
    window.location.href = targetUrl;
    
    setOpen(false);
    setSearch(""); // reset search value
  };

  useEffect(() => {
    if (open) {
      // Blocca lo scroll del body
      document.body.style.overflow = "hidden";
    } else {
      // Riabilita lo scroll
      document.body.style.overflow = "";
    }

    // Cleanup in caso di smontaggio
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!mounted || !open) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-[2147483647] bg-black/20 backdrop-blur-[4px] flex flex-col items-center justify-center px-4"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg p-4 bg-gray-600 rounded-lg shadow-2xl flex flex-col gap-2">
        <Cross1Icon 
          className="cursor-pointer absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-yellow-400 rounded-full p-1 sm:p-2 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center hover:bg-yellow-300 transition-colors"
          onClick={() => setOpen(false)}
        />
        <div className="flex gap-2">
          <Input
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
              if (e.key === "Escape") {
                setOpen(false);
              }
            }}
            className="ring-yellow-400 text-white border-none bg-gray-700 flex-1 text-sm sm:text-base"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="search assets..."
          />
          <Button
            type="button"
            variant={"outline"}
            className="bg-yellow-400 text-black px-3 sm:px-4"
            onClick={handleSearch}
            disabled={search.length < 1}
          >
            <MagnifyingGlassIcon/>
          </Button>
        </div>
        <AutoSuggestions search={search} setSearch={setSearch} />
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}