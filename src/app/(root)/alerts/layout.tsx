import Header from '@/components/customized/Header'
import Footer from '@/components/customized/Footer'
import React from 'react'

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='w-full min-h-screen'>
        <Header/>
        <div className='p-4 w-full'>
            {children}
        </div>
        <Footer/>
    </div>
  )
}
