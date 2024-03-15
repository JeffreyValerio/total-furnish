import { BoxIcon, HeadsetIcon, PencilRulerIcon, ShieldCheckIcon, TruckIcon } from 'lucide-react'
import React from 'react'

const services = [
    {
        icon: <HeadsetIcon size={32} strokeWidth={1} />,
        title: 'Atención',
        subTitle: 'personalizada'
    },
    {
        icon: <PencilRulerIcon size={32} strokeWidth={1} />,
        title: 'Diseños a',
        subTitle: 'la medida'
    },
    {
        icon: <TruckIcon size={32} strokeWidth={1} />,
        title: 'ENTREGAS EN',
        subTitle: 'TODO EL PAÍS'
    },
    {
        icon: <ShieldCheckIcon size={32} strokeWidth={1} />,
        title: 'Garantía',
        subTitle: 'de fabrica'
    },
]

export const Services = () => {
    return (
        <section className="bg-antiflashWhite">
            <div className='max-width py-10'>
                <div className="grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:justify-between">
                    {services.map((item) => (
                        <React.Fragment key={item.title}>
                            <div className='animate-transition flex items-center gap-x-4 bg-white hover:bg-gunmetal hover:text-white py-4 px-8 rounded-box shadow-md hover:shadow-xl'>
                                <div className="border p-3 sm:p-4 rounded-full border-slate-400 flex items-center justify-center">
                                    {item.icon}
                                </div>
                                <p className='text-sm md:text-lg uppercase flex-shrink-0 flex-wrap'>{item.title} <br className='hidden lg:block' />{item.subTitle}</p>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </section>
    )
}
