import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { SearchSchema } from "@/lib/types/generic";
import AutoSuggestions from "./AutoSuggestions";

export default function BgCoverSearchBar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const handleSearch = () => {
    const parsed = SearchSchema.safeParse({ search });
    if (!parsed.success) {
      console.error(parsed.error);
      return;
    }

    router.push("/assets?value=" + encodeURIComponent(parsed.data.search));
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
  return (
    <div className="flex flex-col gap-2">
      <div className="fixed top-0 left-0 w-full min-h-screen min-w-screen z-0 bg-black/20 backdrop-blur-[4px] scroll-hidden flex flex-col items-center">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-full max-w-md p-4 bg-gray rounded-lg shadow-lg z-10 flex gap-1 -translate-y-[250px] bg-gray-600 ">
          <X
            className="cursor-pointer absolute -top-8 right-3 bg-yellow-400 rounded-full p-[3px]"
            onClick={() => setOpen(false)}
          />
          <Input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
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
            onClick={handleSearch}
            disabled={search.length < 1}
          >
            <Search />
          </Button>
        </div>
        <AutoSuggestions search={search} setSearch={setSearch} />
      </div>
    </div>
  );
}
