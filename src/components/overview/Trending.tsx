import React from "react"
import { FeaturesCard, VerticalText } from ".."
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"

export const Trending = () => {
    return (
        <div className="relative">
            <VerticalText textLeft="Tendencias" textRight="2024" />
            <div className='py-20 max-width'>

                <h2 className='sm:hidden'>Tendencias 2024</h2>
                <div className="flex flex-wrap justify-between sm:justify-end gap-4 items-center mb-10">
                    <Link href={'/about'} className='group rounded-md flex gap-x-2 items-center justify-center px-4 border-2 border-blue-900 w-fit hover:bg-blue-900 hover:text-white h-fit'>
                        <span className='group-hover:-translate-x-2 transition-all ease-in-out duration-300 uppercase font-extralight'>Ver todos</span>
                        <ArrowRightIcon
                            strokeWidth={1}
                            size={18}
                            className='group-hover:translate-x-2 transition-all ease-in-out duration-300' />
                    </Link>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <React.Fragment>
                        <FeaturesCard />
                        <FeaturesCard />
                        <FeaturesCard />
                        <FeaturesCard />
                    </React.Fragment>
                </div>
            </div>
        </div>
    )
}
