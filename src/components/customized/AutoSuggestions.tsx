import React, { useEffect, useState } from 'react'
import symbols from "@/../fetch/symbols-full.json"
import { Button } from '../ui/button'
import Link from 'next/link';
export default function AutoSuggestions({search,setSearch}: {search: string,setSearch: React.Dispatch<React.SetStateAction<string>>}) {

  type SymbolItem = { symbol: string; name: string; exchange: string }
  const [filtered_symbols,setFilteredSymbols] = useState<SymbolItem[]>([])

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      if (!search) {
        setFilteredSymbols([])
        return
      }
      const list = (symbols as { symbols: SymbolItem[] }).symbols
      const filtered = list.filter((s)=>
        s.symbol.toLowerCase().startsWith(search.toLowerCase())
      )
      const top10 = filtered.slice(0,10)
      setFilteredSymbols(top10)
    },400)
    return ()=> clearTimeout(timeout)
  },[search])

  return (
    <div className='absolute top-[200px] left-1/2 -translate-x-1/2 w-full max-w-md max-h-[260px] bg-gray-700/90 rounded-md shadow-lg overflow-y-auto overflow-x-hidden p-2'>
      <div className='w-full flex flex-col space-y-2 mt-6'>
        {filtered_symbols.map((s)=>{
          return(
            <Button
            key={s.symbol}
            variant="default"
            onClick={()=>setSearch(s.symbol)}
            className='w-full justify-start h-auto py-2 px-3 text-yellow-400'
            >
              <Link href={`/assets?value=${s.symbol}`} className='flex flex-col w-full'>
                <span className='text-left'>{s.symbol} - {s.exchange}</span>
                <span className='text-left whitespace-pre-wrap break-words'>{s.name}</span>
              </Link>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
