import { ArrowRightIcon, CheckCircleIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
    title: string,
    description: string,
    image: string,
    features: string[]
    url: string
}

export const CollectionCard = ({ title, description, features, image, url }: Props) => {
    return (
        <div className='w-full group relative overflow-hidden'>

            <h2 className='text-2xl mb-2 font-medium uppercase mt-4 sm:mt-0'>
                <Link href={`${url}`}>
                    {title}
                </Link>
            </h2>

            <div className="overflow-hidden transition-all ease-in-out duration-500">
                <Image
                    className='object-cover group-hover:scale-[1.2] transition-all ease-in-out duration-500'
                    src={`${image}`}
                    width={500} height={900}
                    alt='' />
            </div>

            <div className='absolute p-6 bottom-0 overflow-hidden translate-y-full group-hover:translate-y-0 transition-all ease-in-out duration-1000 bg-white'>
                <div className="text-content p-5 bg-light">
                    <h3 className='text-xl sm:text-2xl font-light mb-3 sm:mb-6 uppercase'>Sobre {title}</h3>
                    <p className='text-sm'>{description}</p>
                    <ul className='list-disc ml-4 my-4 text-sm'>
                        {features.map((feature, index) => (
                            <li key={index} className='flex items-center gap-x-1'>
                                <CheckCircleIcon size={18} className='flex-shrink-0' strokeWidth={1} color='green' />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <Link href={`${url}`} className='group rounded-md flex gap-x-2 items-center justify-center px-4 border-2 border-blue-900 w-fit hover:bg-blue-900 text-black hover:text-white h-fit'>
                        <span className='group-hover:-translate-x-2 transition-all ease-in-out duration-300 uppercase font-extralight'>Leer más</span>
                        <ArrowRightIcon
                            strokeWidth={1}
                            size={18}
                            className='group-hover:translate-x-2 transition-all ease-in-out duration-300' />
                    </Link>
                </div>
            </div>

        </div>
    )
}