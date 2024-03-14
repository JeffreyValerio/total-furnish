'use client'

import Image from 'next/image'
import { ProductCardSkeleton } from '..'
import { IProduct } from '@/interfaces'
import { useEffect, useState } from 'react'
import { currencyFormat } from '@/utils'
import Link from 'next/link'
import { ShoppingBagIcon } from 'lucide-react'

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
        <div className='w-full group overflow-hidden'>

            <div className="overflow-hidden rounded-md transition-all ease-in-out duration-500">
                <Link href={product.slug}>
                    <Image
                        className='h-[300px] rounded-md bg-slate-100 bg-cover group-hover:scale-[1.2] transition-all ease-in-out duration-500'
                        src={`${product.images[0]}`}
                        width={500} height={900}
                        alt='' />
                </Link>
            </div>

            <h2 className='uppercase py-4 text-2xl text-charcoal'>{product.name}</h2>
            <p className='text-xl font-bold'>{currencyFormat(product.price)}</p>
            {/* <button className='uppercase flex items-center gap-x-2 btn-primary-outline mt-3 justify-center text-sm'>
                <ShoppingBagIcon strokeWidth={1} size={18} /> add to cart
            </button> */}
        </div>
    )
}