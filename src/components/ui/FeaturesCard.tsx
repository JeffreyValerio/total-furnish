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

            <h3 className='uppercase py-4 text-2xl text-[#787d62]'>Product Name</h3>
            <p>$200</p>
            <p className='uppercase'>add to cart</p>
        </div>
    )
}