'use client';

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    path: string;
    icon: JSX.Element;
    title: string;
    subTitle: string;
    variant?: string
}

export const SidebarMenuItem = ({ path, icon, title, subTitle }: Props) => {

    const currentPath = usePathname();

    return (
        <Link href={`/admin${path}`}
            className={
                clsx("bg-slate-200 mb-2 rounded-md w-full px-2 flex space-x-2 items-center py-3 ease-in-out bg-gradient-to-tr hover:from-blue-700 hover:to-blue-900 hover:text-white",
                    { '!bg-blue-900 text-white': currentPath.startsWith(`/admin${path}`) }
                )
            }>
            <div>
                {icon}
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-bold leading-5">{title}</span>
                <span className="text-sm hidden md:block">{subTitle}</span>
            </div>
        </Link >
    )
}