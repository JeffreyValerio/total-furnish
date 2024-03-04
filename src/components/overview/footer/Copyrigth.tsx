import { Data } from '@/data/data'
import React from 'react'

export const Copyrigth = () => {
    const year = new Date().getFullYear()
    return (
        <div className='bg-oxfordBlue text-white py-4'>
            <div className="max-width flex justify-center items-center gap-x-2 flex-col">
                <p className='font-bold uppercase'>&copy; {year} | <Data.name /> </p>
                <p className='text-xs'>Design by <span className='font-bold tracking-wide'>Jeffrey Valerio</span></p>
            </div>
        </div>
    )
}
