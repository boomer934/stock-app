import { SearchProps } from "@/lib/types/generic";
import { useRouter } from "next/router";
import { SearchSchema } from "@/lib/types/generic";

export default function HandleSearch({search,setSearch}:SearchProps){

    const parsed = SearchSchema.safeParse({search})
    if(!parsed.success){
        console.error(parsed.error)
        return
    }
    
    const router = useRouter()
    router.push({
        pathname: "/search",
        query: { value: parsed.data.search },
      });
      console.log(parsed.data.search)
    setSearch(""); // reset search value after submitting it
}