"use client"
import SymbolInfo from '@/components/customized/SymbolInfo'
import React from 'react'
import { useSearchParams } from 'next/navigation'

export default function Assets() {
    const searchParams = useSearchParams()
    const value = searchParams.get("value")
    console.log(value)
  return (
    <div>
        <SymbolInfo symbol={value!}/> 
    </div>
  )
}
