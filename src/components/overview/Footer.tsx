import Link from 'next/link'
import { Logo } from '..'
import Image from 'next/image'

export const Footer = () => {
  return (
    <div className='bg-slate-100 mt-20'>
      <div className='max-width py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 font-light gap-y-8'>

        <div>
          <Logo />

          <p className='pr-10 mt-8'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus laboriosam expedita amet dignissimos quisquam eveniet neque? Laudantium, explicabo quam autem fugiat placeat architecto fuga itaque porro impedit non est necessitatibus.
          </p>

          <p className='mt-4'>
            <span className='font-bold'>Total Furnish</span> &copy; 2024
          </p>

        </div>

        <div>
          <h3 className='font-semibold mb-4 text-2xl'>Quick Links</h3>

          <ul className='flex flex-col gap-y-4 text-lg'>
            <li><Link href={'/'}>Home</Link></li>
            <li><Link href={'/'}>About</Link></li>
            <li><Link href={'/'}>Services</Link></li>
            <li><Link href={'/'}>Blogs</Link></li>
            <li><Link href={'/'}>Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className='font-semibold mb-4 text-2xl'>Social</h3>

          <ul className='flex flex-col gap-y-4 text-lg'>
            <li><Link href={'/'}>Facebook</Link></li>
            <li><Link href={'/'}>Twitter</Link></li>
            <li><Link href={'/'}>Pinterest</Link></li>
            <li><Link href={'/'}>Instagram</Link></li>
            <li><Link href={'/'}>Youtube</Link></li>
          </ul>
        </div>

        <Image
          src={'/images/sillon-footer.png'}
          alt=''
          width={300}
          height={300}
          className='md:absolute right-0 sm:right-[100px] -translate-y-60 hover:rotate-12 transition-all duration-300 ease-in-out hidden md:block'
        />

        <div>
          <h3 className='font-semibold mb-4 text-2xl'>Contáctanos</h3>

          <ul className='flex flex-col gap-y-4 font-light text-lg'>
            <li><Link href={'/'}>+(506) 8765-4321</Link></li>
            <li><Link href={'/'}>ventas@totalfurnish.com</Link></li>
            <li>San José, Costa Rica</li>
          </ul>
        </div>

      </div>
    </div>
  )
}
