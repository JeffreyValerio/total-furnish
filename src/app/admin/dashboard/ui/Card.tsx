import clsx from 'clsx';
import { LinkIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface Props {
    name: string,
    icon: JSX.Element,
    count: number,
    href: string
}
export const Card = ({ name, icon, count, href }: Props) => {
    return (
        <div className={clsx("relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-2xl hover:drop-shadow-2xl",
            { 'hidden': count < 0 })
        }>
            <div className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-950 to-blue-500 text-white shadow-blue-500/40 shadow-md absolute -mt-4 grid h-14 w-14 place-items-center`}>
                {icon}
            </div>
            <div className="p-4 text-right">
                <p className="block antialiased font-sans text-sm leading-normal font-bold text-blue-gray-600 capitalize">{name}</p>
                <h4 className="block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-blue-gray-900">{count}</h4>
            </div>
            <div className="border-t border-blue-gray-50 px-4 py-2">
                <Link href={'/admin/store/' + href}
                    className='antialiased font-sans leading-relaxed font-semibold flex items-center gap-x-2 text-sm'>
                    <LinkIcon strokeWidth={1} size={16} /> Administrar {name}
                </Link>
            </div>
        </div> 
    )
}