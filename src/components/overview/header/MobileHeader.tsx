'use client'

import { useEffect, useState } from 'react'
import { useUIStore } from '@/store/ui/ui-store'
import { AlignRight } from 'lucide-react'
import { Logo } from '@/components'

export const MobileHeader = () => {

    const [isSticky, setSticky] = useState(false);

    const openSideMenu = useUIStore(state => state.openSideMenu)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 400) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* <Topbar /> */}

            <div className={`${isSticky ? 'sticky top-0 z-50 bg-white transition-all ease-in-out duration-700' : ''}`}>

                <header className='max-width grid sm:grid-cols-2 justify-center items-center sm:justify-between py-5 border-b '>
                    <nav className=''>
                        <ul className="flex justify-start pl-4 items-center">
                            <li className='flex items-center justify-center gap-x-4'>
                                <Logo />
                            </li>
                        </ul>
                    </nav>
                </header>

                <button
                    onClick={openSideMenu}
                    className='absolute top-2.5 right-0 mx-2 p-2 rounded-md transition-all duration-300 ease-in-out hover:bg-slate-300 flex items-center gap-x-1'>
                    <AlignRight strokeWidth={1} size={32} />
                </button>
            </div>
        </>
    )
}