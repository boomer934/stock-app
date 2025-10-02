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
            className='bg-yellow-400 text-black p-3'>
                menu
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='border-none outline-none bg-gray-700 text-yellow-400 mr-[15px]'>
            <DropdownMenuItem className='text-right'>Dashboard</DropdownMenuItem>
            <DropdownMenuItem className='text-right'>Portfolio</DropdownMenuItem>
            <DropdownMenuItem className='text-right'>Market</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
