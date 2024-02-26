import { BoxIcon, RotateCwIcon, ShieldIcon, TruckIcon } from 'lucide-react'
import React from 'react'

const services = [
    {
        icon: <TruckIcon size={40} strokeWidth={1} />,
        title: 'Entrega',
        subTitle: 'gratis'
    },
    {
        icon: <ShieldIcon size={40} strokeWidth={1} />,
        title: 'Garantía',
        subTitle: 'de fabrica'
    },
    {
        icon: <BoxIcon size={40} strokeWidth={1} />,
        title: 'Embalaje',
        subTitle: 'especial'
    },
    {
        icon: <RotateCwIcon size={40} strokeWidth={1} />,
        title: 'POLÍTICA DE ',
        subTitle: 'DEVOLUCIÓN'
    },
]

export const Services = () => {
    return (
        <div className='max-width py-20'>
            <div className="grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:justify-between">
                {services.map((item) => (
                    <React.Fragment key={item.title}>
                        <div className='flex items-center gap-x-4'>
                            <div className="border p-5 rounded-full border-slate-400 flex items-center justify-center">
                                {item.icon}
                            </div>
                            <p className='text-xl md:text-2xl uppercase'>{item.title} <br />{item.subTitle}</p>
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}
