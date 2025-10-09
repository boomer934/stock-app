import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function SkeletonPlaceHolder() {
  return (
    <div className=' w-full h-full flex flex-col gap-2'>
      <Skeleton className='w-full h-[282px] z-50 bg-gray-700'/>
    </div>
  )
}
