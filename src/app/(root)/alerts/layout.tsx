import Header from '@/components/customized/Header'
import Footer from '@/components/customized/Footer'
import React from 'react'

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='w-full min-h-screen flex flex-col'>
        <Header/>
        <div className='p-4 w-full flex-1'>
            {children}
        </div>
        <Footer/>
    </div>
  )
}
