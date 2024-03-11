'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Logo } from '../..'
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { MobileHeader } from './MobileHeader';

const menu = [
  { url: '/', label: 'Inicio' },
  { url: '/tienda', label: 'Tienda' },
  { url: '/catalogo', label: 'Catálogo' },
  { url: '/muestrario', label: 'Muestrario' },
]

export const Header = () => {

  const currentPath = usePathname();
  const [isSticky, setSticky] = useState(false);

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
    <div className={`${isSticky ? 'sticky top-0 z-10 bg-white transition-all ease-in-out duration-700' : ''}`}>

      <div className="block xl:hidden">
        <MobileHeader />
      </div>

      <header className='max-width hidden xl:grid sm:grid-cols-2 justify-center items-center sm:justify-between py-5 border-b '>

        <Logo />

        <nav>
          <ul className='flex justify-end uppercase gap-x-2'>
            {menu.map((item) => (
              <li key={item.url}>
                <Link href={item.url}
                  className={clsx("hover:underline px-6 py-2 rounded-md", {
                    "underline font-bold": currentPath === item.url
                  })}>
                  {item.label}
                </Link>
              </li>
            ))}

            <li>
              <Link href={'/cotizar'} className='btn-primary text-base font-bold tracking-wide'>
                Cotizar
              </Link>
            </li>
          </ul>
        </nav>

      </header>
    </div>
  )
}