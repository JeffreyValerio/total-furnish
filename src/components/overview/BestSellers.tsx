import { ArrowRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const BestSellers = () => {
    return (
        <div className="shadow-2xl drop-shadow-2xl transition-shadow">

            <section className='max-width 2xl:h-screen py-20 2xl:py-0 xl:grid grid-cols-4 gap-4 items-center justify-center xl:mb-0'>
                <div className="sm:col-start-1 sm:col-end-2  overflow-hidden">

                    <h1>Materiales de alta calidad</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure laboriosam repellat voluptas, sint quam vero quos est amet accusamus reprehenderit excepturi</p>

                    <Link href={'/'} className='btn-primary mt-8 justify-center sm:w-1/2 rounded-md group flex items-center gap-x-3'>
                        <span className='group-hover:-translate-x-2 transition-all ease-in-out duration-300 uppercase font-extralight'>Ver más</span>
                        <ArrowRightIcon
                            strokeWidth={1}
                            size={24}
                            className='group-hover:translate-x-2 transition-all ease-in-out duration-300' />
                    </Link>
                </div>

                <div className="sm:col-start-2 sm:col-end-5 responsive-grid-3 mt-20 xl:mt-0">

                    <Link href={'/'} className="text-center relative overflow-hidden group rounded-md pb-8 mx-auto">
                        <div className="absolute top-0 left-0 right-0 h-96 !bg-slateGray/20 content-[''] translate-y-96 group-hover:translate-y-48 transition-all ease-in-out duration-500 -z-10 rounded-md" />
                        <Image src={'/images/chair.png'} alt='chair' width={300} height={300} />
                        <p className='mb-2'>Product name</p>
                        <p className='font-bold text-xl'>$75</p>
                    </Link>

                    <Link href={'/'} className="text-center relative overflow-hidden group rounded-md pb-8 mx-auto">
                        <div className="absolute top-0 left-0 right-0 h-96 bg-slateGray/20 content-[''] translate-y-96 group-hover:translate-y-48 transition-all ease-in-out duration-500 -z-10 rounded-md" />
                        <Image src={'/images/chair.png'} alt='chair' width={300} height={300} />
                        <p className='mb-2'>Product name</p>
                        <p className='font-bold text-xl'>$75</p>
                    </Link>

                    <Link href={'/'} className="text-center relative overflow-hidden group rounded-md pb-8 mx-auto">
                        <div className="absolute top-0 left-0 right-0 h-96 bg-slateGray/20 content-[''] translate-y-96 group-hover:translate-y-48 transition-all ease-in-out duration-500 -z-10 rounded-md" />
                        <Image src={'/images/chair.png'} alt='chair' width={300} height={300} />
                        <p className='mb-2'>Product name</p>
                        <p className='font-bold text-xl'>$75</p>
                    </Link>
                </div>
            </section>
        </div>
    )
} 
