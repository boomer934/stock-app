import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { MenuIcon } from 'lucide-react'
import DropDownMenu from './DropDownMenu'
import SearchBar from './SearchBar'
import Link from 'next/link'

export default function Header() {
  return (
    <nav className='flex justify-between items-center p-4 bg-gray-800'>
        <Image src={"/logo-nobg.png"} alt="Signals" width={50} height={50}></Image>
        <SearchBar/>
        <div className='md:hidden'>
          <DropDownMenu/>
        </div>
        <div className='hidden md:flex gap-4 text-yellow-400'>
          <div className='hidden md:flex gap-4 text-yellow-400'>
          <Link href="/dashboard"><Button>Dashboard</Button></Link>
          <Link href="/portfolio"><Button>Portfolio</Button></Link>
          <Link href="/market"><Button>Market</Button></Link>
          </div>
        </div>
    </nav>
  )
}
