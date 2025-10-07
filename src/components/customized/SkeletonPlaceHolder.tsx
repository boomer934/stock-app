import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonPlaceHolder() {
  return (
    <div className=' w-full h-full flex flex-col gap-2'>
      <div className='flex gap-2'>
        <Skeleton className='w-[120px] h-[20px] z-50 bg-gray-700'/>
        <Skeleton className='w-[60px] h-[20px] z-50 bg-gray-700'/>
      </div>
      <Skeleton className='w-[188px] h-[100px] z-50 bg-gray-700'/>
    </div>
  )
}
