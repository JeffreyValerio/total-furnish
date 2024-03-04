'use client'

import { useUIStore } from '@/store/ui/ui-store'
import clsx from 'clsx'
import { AtSignIcon, HomeIcon, InfoIcon, LogIn, PhoneIcon, Shirt, Ticket, User, Users, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Logo } from '..'
import Image from 'next/image'
import { Data } from '@/data/data'

export const Sidebar = () => {

    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen)
    const closeMenu = useUIStore(state => state.closeSideMenu)

    return (
        <div className='relative !z-50'>
            {/* BACKGROUND */}
            {isSideMenuOpen && (
                <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30' />
            )}

            {/* BLUR */}
            {isSideMenuOpen && (
                <div onClick={closeMenu}
                    className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm' />
            )}

            {/* SIDEMENU */}
            <nav className={
                clsx('fixed p-5 right-0 top-0 w-[90%] sm:w-[400px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 ease-in-out',
                    {
                        'translate-x-full': !isSideMenuOpen
                    }
                )}>

                <div className='flex items-center justify-center gap-x-4 mt-8'>
                    <Logo />
                </div>

                <button onClick={closeMenu} className='absolute top-0 right-5 cursor-pointer mx-2 my-4 p-2 rounded-md transition-all duration-300 ease-in-out hover:bg-slate-300 flex items-center gap-x-1'>
                    <X strokeWidth={1} className='w-5 h-5' />
                </button>

                {/* MENU */}

                <>
                    <Link href={'/'}
                        onClick={closeMenu}
                        className='flex items-center mt-10 p-2 hover:bg-slate-100 rounded transition-all'>
                        <HomeIcon size={18} strokeWidth={1} />
                        <span className='ml-2'>Inicio</span>
                    </Link>

                    <Link href={'/servicios'}
                        onClick={closeMenu}
                        className='flex items-center mt-5 p-2 hover:bg-slate-100 rounded transition-all'>
                        <Ticket size={18} strokeWidth={1} />
                        <span className='ml-2'>Servicios</span>
                    </Link>
                </>

                <>
                    <div className="w-full h-px bg-slate-200 my-5" />
                    <Link href={'/nosotros'}
                        onClick={closeMenu}
                        className='flex items-center p-2 hover:bg-slate-100 rounded transition-all'>
                        <InfoIcon size={18} strokeWidth={1} />
                        <span className='ml-2'>Nosotros</span>
                    </Link>

                    <Link href={'/contacto'}
                        onClick={closeMenu}
                        className='flex items-center p-2 mt-5 hover:bg-slate-100 rounded transition-all'>
                        <PhoneIcon size={18} strokeWidth={1} />
                        <span className='ml-2'>Contacto</span>
                    </Link>
                </>

                <div className="absolute left-0 bottom-0 bg-[#038497] px-4 py-2 w-full h-fit">
                    <div className="flex flex-col justify-center gap-y-1 items-center w-full text-white text-sm">
                        <div className='flex items-center gap-x-2'>
                            <PhoneIcon strokeWidth={1} size={18} />
                            <Data.phone />
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <AtSignIcon strokeWidth={1} size={18} />
                            <Data.email />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
} 
