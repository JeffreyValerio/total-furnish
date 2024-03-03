import Image from 'next/image'
import React from 'react'

export const BestSellers = () => {
    return (
        <section className='max-width 2xl:h-screen py-20 2xl:py-0 xl:grid grid-cols-4 gap-4 items-center justify-center mb-20 xl:mb-0'>

            <div className="sm:col-start-1 sm:col-end-2  overflow-hidden">

                <h2 className='text-oxfordBlue font-bold text-6xl sm:pr-4 pb-4'>Materiales de alta calidad</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure laboriosam repellat voluptas, sint quam vero quos est amet accusamus reprehenderit excepturi</p>

                <button className='btn-primary mt-8 w-1/2 translate-x-1/2 rounded-md'>Ver más</button>
            </div>

            <div className="sm:col-start-2 sm:col-end-5 responsive-grid-3 mt-20 xl:mt-0">
                <div className="text-center relative overflow-hidden group rounded-md pb-8 mx-auto">
                    <div className="absolute top-0 left-0 right-0 h-96 bg-slateGray/20 content-[''] translate-y-96 group-hover:translate-y-48 transition-all ease-in-out duration-500 -z-10 rounded-md" />
                    <Image src={'/images/chair.png'} alt='chair' width={300} height={300} />
                    <p className='mb-2'>Product name</p>
                    <p className='font-bold text-xl'>$75</p>
                </div>
                <div className="text-center relative overflow-hidden group rounded-md pb-8 mx-auto">
                    <div className="absolute top-0 left-0 right-0 h-96 bg-slateGray/20 content-[''] translate-y-96 group-hover:translate-y-48 transition-all ease-in-out duration-500 -z-10 rounded-md" />
                    <Image src={'/images/chair.png'} alt='chair' width={300} height={300} />
                    <p className='mb-2'>Product name</p>
                    <p className='font-bold text-xl'>$75</p>
                </div>
                <div className="text-center relative overflow-hidden group rounded-md pb-8 mx-auto">
                    <div className="absolute top-0 left-0 right-0 h-96 bg-slateGray/20 content-[''] translate-y-96 group-hover:translate-y-48 transition-all ease-in-out duration-500 -z-10 rounded-md" />
                    <Image src={'/images/chair.png'} alt='chair' width={300} height={300} />
                    <p className='mb-2'>Product name</p>
                    <p className='font-bold text-xl'>$75</p>
                </div>
            </div>
        </section>
    )
}
