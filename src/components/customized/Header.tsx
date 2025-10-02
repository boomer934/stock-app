import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { MenuIcon } from 'lucide-react'
import DropDownMenu from './DropDownMenu'
import SearchBar from './SearchBar'
import Link from 'next/link'

export default function Header() {
  return (
    <nav className='flex justify-between items-center p-2 sm:p-4 bg-gray-800 min-h-[60px] sm:min-h-[70px]'>
        <Image src={"/logo-nobg.png"} alt="Signals" width={40} height={40} className="sm:w-[50px] sm:h-[50px]"></Image>
        <div className="flex-1 max-w-md mx-2 sm:mx-4">
          <SearchBar/>
        </div>
        <div className='md:hidden'>
          <DropDownMenu/>
        </div>
        <div className='hidden md:flex gap-2 lg:gap-4 text-yellow-400'>
          <Link href="/dashboard"><Button className="text-xs lg:text-sm px-2 lg:px-4">Dashboard</Button></Link>
          <Link href="/portfolio"><Button className="text-xs lg:text-sm px-2 lg:px-4">Portfolio</Button></Link>
          <Link href="/market"><Button className="text-xs lg:text-sm px-2 lg:px-4">Market</Button></Link>
        </div>
    </nav>
  )
}
