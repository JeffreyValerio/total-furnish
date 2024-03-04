import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

export const About = () => {
    return (
        <div className='bg-white sm:h-screen shadow-2xl'>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div
                    className='h-screen bg-cover bg-fixed bg-center bg-no-repeat mb-16 lg:mb-0'
                    style={{ backgroundImage: "url('/images/about.jpg')" }}>
                </div>

                <div className='md:px-12 flex items-center max-width'>
                    <div>
                        <h3 className='heading mb-10'>Nosotros</h3>
                        <p className='mb-6 font-extralight text-lg'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi similique numquam illum, a unde obcaecati nobis sunt aspernatur doloremque molestiae cumque. Omnis voluptas sit, laudantium repellat rerum molestiae cupiditate? Blanditiis?</p>
                        <p className='mb-6 font-extralight text-lg'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit nemo illum minima velit sint ipsam beatae officia quo. </p>
 
                        <Link href={'/about'} className='mt-10 group flex gap-x-2 items-center justify-center px-8 py-4 border-2 border-blue-900 w-fit rounded-md hover:bg-blue-900 hover:text-white'>
                            <span className='group-hover:-translate-x-2 transition-all ease-in-out duration-300 uppercase text-xl font-extralight'>Ver más</span>
                            <ArrowRightIcon
                                strokeWidth={1}
                                size={24}
                                className='group-hover:translate-x-2 transition-all ease-in-out duration-300' />
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}
