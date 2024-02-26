'use client'

import { DicesIcon, FactoryIcon, LayoutDashboard, LayoutDashboardIcon, RssIcon, ShieldCheckIcon, ShoppingBagIcon, StoreIcon, SunIcon, TagsIcon } from "lucide-react"
import Link from "next/link"
import { SidebarMenuItem } from "./SidebarMenuItem"

const menuItems = [
  {
    path: '/dashboard',
    icon: <LayoutDashboardIcon size={40} strokeWidth={1} />,
    title: 'Dashboard',
    subTitle: 'Modulo principal'
  },
  {
    path: '/store',
    icon: <StoreIcon size={40} strokeWidth={1} />,
    title: 'Tienda',
    subTitle: 'Módulo de tienda'
  },
  {
    path: '/blog',
    icon: <RssIcon size={40} strokeWidth={1} />,
    title: 'Blog',
    subTitle: 'Módulo de blogs'
  },
]


export const AdminSidebar = () => {

  return (
    <div className="bg-slate-100 m-4 rounded-2xl shadow-2xl drop-shadow-2xl sticky top-4">
      <div className="z-10 w-80 left-0 overflow-hidden h-fit text-black">

        <div className="my-4 px-6">
          <h1 className="flex items-center font-semibold text-lg md:text-4xl">
            <LayoutDashboard size={36} strokeWidth={2} className="mr-2 w-8 text-blue-800" />
            <span className="text-blue-800">E</span>
            <span>Admin</span>
          </h1>
        </div>

        <div className="px-6 py-5">
          <p className="flex items-center gap-x-2"><SunIcon size={24} strokeWidth={1} /> Hola de nuevo</p>
          <Link href={'/profile'}>
            <span className="text-sm md:text-base font-bold ml-8">Jeffrey Valerio</span>
          </Link>
        </div>

        <div className="w-full px-2 mt-4">
          {
            menuItems.map(item => (
              <SidebarMenuItem key={item.path} {...item} />
            ))
          }
        </div>

      </div>
    </div>
  )
}