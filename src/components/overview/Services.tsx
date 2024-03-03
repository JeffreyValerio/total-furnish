import { BoxIcon, RotateCwIcon, ShieldIcon, TruckIcon } from 'lucide-react'
import React from 'react'

const services = [
    {
        icon: <TruckIcon size={32} strokeWidth={1} />,
        title: 'Entrega',
        subTitle: 'gratis'
    },
    {
        icon: <ShieldIcon size={32} strokeWidth={1} />,
        title: 'Garantía',
        subTitle: 'de fabrica'
    },
    {
        icon: <BoxIcon size={32} strokeWidth={1} />,
        title: 'Embalaje',
        subTitle: 'especial'
    },
    {
        icon: <RotateCwIcon size={32} strokeWidth={1} />,
        title: 'POLÍTICA DE ',
        subTitle: 'DEVOLUCIÓN'
    },
]

export const Services = () => {
    return (
        <section className="bg-antiflashWhite">
            <div className='max-width py-20'>
                <div className="grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:justify-between">
                    {services.map((item) => (
                        <React.Fragment key={item.title}>
                            <div className='flex items-center gap-x-4 bg-white py-4 px-8 rounded-md shadow-md hover:shadow-xl'>
                                <div className="border p-4 rounded-full border-slate-400 flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <p className='text-lg md:text-xl uppercase flex-shrink-0'>{item.title} <br className='hidden md:block' />{item.subTitle}</p>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    )
}
