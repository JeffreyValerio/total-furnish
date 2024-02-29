import React from 'react'
import { Logo } from '..'
import Link from 'next/link'

export const Header = () => {
  return (
    <div className='grid sm:grid-cols-2 justify-center sm:justify-between py-5 border-b'>

      <Logo />

      <nav className='hidden sm:block'>
        <ul className='flex justify-between uppercase px-6'>
          <li><Link href={''}>Inicio</Link> </li>
          <li><Link href={''}>Tienda</Link> </li>
          <li><Link href={''}>Nosotros</Link> </li>
          <li><Link href={''}>Blog</Link> </li>
          <li><Link href={''}>Contacto</Link> </li>
        </ul>
      </nav>


    </div>
  )
}
