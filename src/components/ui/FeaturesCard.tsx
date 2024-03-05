import { PlusIcon, ShoppingBagIcon } from 'lucide-react'
import Image from 'next/image'

export const FeaturesCard = () => {
    return (
        <div className='w-full group'>
            <div className="overflow-hidden group-hover:scale-[.97] transition-all ease-in-out duration-500">
                <Image
                    className='h-96 object-cover group-hover:scale-[1.2] transition-all ease-in-out duration-500'
                    src={'/images/silla.webp'}
                    width={500} height={900}
                    alt='' />
            </div>

            <h2 className='uppercase py-4 text-2xl text-charcoal'>Product Name</h2>
            <p className='text-xl font-bold'>$200</p>
            <button className='uppercase flex items-center gap-x-2 btn-primary-outline mt-3 justify-center text-sm'>
                <ShoppingBagIcon strokeWidth={1} size={18} /> add to cart
            </button>
        </div>
    )
}