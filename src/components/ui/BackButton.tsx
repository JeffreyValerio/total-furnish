'use client'

import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export const BackButton = () => {
    const router = useRouter()
    return (
        <div 
        className='absolute top-0 right-0 mt-[-50px] mr-[-50px] bg-red-800 p-2 rounded-md'
        onClick={() => {
            router.replace('../')
        }}>
            <X color="white" size={24} />
        </div>
    )
} 
