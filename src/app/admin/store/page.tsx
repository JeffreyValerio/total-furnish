import { Heading } from "@/components";
import { SidebarMenuItem } from "@/components/admin/ui/SidebarMenuItem";
import clsx from "clsx";
import { DicesIcon, FactoryIcon, ShieldCheckIcon, ShoppingBagIcon, TagsIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const menuItems = [
    {
        path: '/brands',
        icon: <DicesIcon size={40} strokeWidth={1} />,
        title: 'Marcas',
        subTitle: 'Módulo de marcas'
    },
    {
        path: '/categories',
        icon: <TagsIcon size={40} strokeWidth={1} />,
        title: 'Categorías',
        subTitle: 'Módulo de categorías'
    },
    {
        path: '/suppliers',
        icon: <FactoryIcon size={40} strokeWidth={1} />,
        title: 'Proveedores',
        subTitle: 'Módulo de proveedores'
    },
    {
        path: '/warranties',
        icon: <ShieldCheckIcon size={40} strokeWidth={1} />,
        title: 'Garantías',
        subTitle: 'Módulo de garantías'
    },
    {
        path: '/products',
        icon: <ShoppingBagIcon size={40} strokeWidth={1} />,
        title: 'Productos',
        subTitle: 'Módulo de productos'
    },
]
export default function StorePage() {
    return (
        <div className="p-8">
            <Heading heading="de la tienda" subheading="Módulo administrativo" />
            <div className="p-8 rounded-md bg-slate-100 h-fit">
                <div className="grid grid-cols-2 gap-4 h-full">
                    {
                        menuItems.map(item => (
                            <React.Fragment key={item.path}>
                                <Link href={`/admin/store${item.path}`}
                                    className={"bg-slate-200 mb-2 rounded-md w-full px-2 flex space-x-2 justify-center items-center py-3 ease-in-out bg-gradient-to-tr hover:from-blue-700 hover:to-blue-900 hover:text-white hover:shadow-xl"}>
                                    <div>
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold leading-5">{item.title}</span>
                                        <span className="text-sm hidden md:block">{item.subTitle}</span>
                                    </div>
                                </Link >
                            </React.Fragment>
                        ))
                    }

                </div>
            </div>
        </div>
    );
}