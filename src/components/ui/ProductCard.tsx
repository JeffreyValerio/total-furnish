'use client'

import Image from 'next/image'
import { ProductCardSkeleton } from '..'
import { IProduct } from '@/interfaces'
import { useEffect, useState } from 'react'
import { currencyFormat } from '@/utils'

interface Props {
    product: IProduct
}
export const ProductCard = ({ product }: Props) => {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true)
        }, 1000);
    }, [loaded])

    if (!loaded) {
        return <ProductCardSkeleton />
    }
    
    return (
        <div className='w-full group'>
            <div className="overflow-hidden group-hover:scale-[.97] transition-all ease-in-out duration-500">
                <Image
                    className='h-96 object-cover group-hover:scale-[1.2] transition-all ease-in-out duration-500'
                    src={`${product.images[0]}`}
                    width={500} height={900}
                    alt='' />
            </div>

            <h2 className='uppercase py-4 text-2xl text-charcoal'>{product.name}</h2>
            <p className='text-xl font-bold'>{currencyFormat(product.price)}</p>
            {/* <button className='uppercase flex items-center gap-x-2 btn-primary-outline mt-3 justify-center text-sm'>
                <ShoppingBagIcon strokeWidth={1} size={18} /> add to cart
            </button> */}
        </div>
    )
}