import React from 'react'

import Link from 'next/link'

import { ArrowRightIcon } from 'lucide-react'
import { ProductCard, VerticalText } from '..'
import { IProduct } from '@/interfaces'

interface Props {
    products: IProduct[]
}

export const FeaturesProducts = ({ products }: Props) => {
    return (
        <div className="relative overflow-hidden">

            {/* <VerticalText textLeft='Productos' textRight='destacados' /> */}

            <div className='py-20 max-width'>

                <div className="flex items-center justify-between mb-10">
                    <h2>Productos destacados</h2>
                    <div className="flex flex-wrap justify-between sm:justify-end gap-4 items-center">
                        <Link href={'/about'} className='group rounded-md flex gap-x-2 items-center justify-center px-4 border-2 border-oxfordBlue w-fit hover:bg-oxfordBlue hover:text-white h-fit'>
                            <span className='group-hover:-translate-x-2 transition-all ease-in-out duration-300 uppercase font-light'>Ver todos</span>
                            <ArrowRightIcon
                                strokeWidth={1}
                                size={18}
                                className='group-hover:translate-x-2 transition-all ease-in-out duration-300' />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products?.map((product) => (
                        product.type === 'FEATURE' && (
                            <React.Fragment key={product.id}>
                                <ProductCard product={product ?? {}} />
                            </React.Fragment>
                        )
                    ))}
                </div>
            </div>
        </div>
    )
}