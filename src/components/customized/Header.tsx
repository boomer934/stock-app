import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { MenuIcon } from 'lucide-react'
import DropDownMenu from './DropDownMenu'
import SearchBar from './SearchBar'

export default function Header() {
  return (
    <nav className='flex justify-between items-center p-4 bg-gray-800'>
        <Image src={"/logo-nobg.png"} alt="Signals" width={50} height={50}></Image>
        <SearchBar/>
        <div className='md:hidden'>
          <DropDownMenu/>
        </div>
        <div className='hidden md:flex gap-4 text-yellow-400'>
          <Button>Dashboard</Button>
          <Button>Portfolio</Button>
          <Button>Market</Button>
        </div>
    </nav>
  )
}
