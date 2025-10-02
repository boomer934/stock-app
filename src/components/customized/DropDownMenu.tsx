"use client"
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button'

export default function DropDownMenu() {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
            className='bg-yellow-400 text-black p-2 sm:p-3 text-xs sm:text-sm'>
                Menu
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='border-none outline-none bg-gray-700 text-yellow-400 mr-2 sm:mr-4 min-w-[120px]'>
            <DropdownMenuItem className='text-right text-sm hover:bg-gray-600 cursor-pointer'>Dashboard</DropdownMenuItem>
            <DropdownMenuItem className='text-right text-sm hover:bg-gray-600 cursor-pointer'>Portfolio</DropdownMenuItem>
            <DropdownMenuItem className='text-right text-sm hover:bg-gray-600 cursor-pointer'>Market</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
