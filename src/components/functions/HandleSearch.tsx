import { SearchProps } from "@/lib/types/generic";
import { SearchSchema } from "@/lib/types/generic";

export default function HandleSearch({search,setSearch}:SearchProps){

    const parsed = SearchSchema.safeParse({search})
    if(!parsed.success){
        console.error(parsed.error)
        return
    }
    
    // Navigate to assets page directly with proper Next.js 13+ routing
    const targetUrl = `/assets?value=${encodeURIComponent(parsed.data.search)}`;
    
    // Use window.location.href for immediate navigation with refresh
    window.location.href = targetUrl;
    
    console.log(parsed.data.search)
    setSearch(""); // reset search value after submitting it
}