'use client'

import { generatePaginationNumbers } from "@/utils"
import clsx from "clsx"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { redirect, usePathname, useSearchParams } from "next/navigation"


interface Props {
    totalPages: number,
}

export const Pagination = ({ totalPages }: Props) => {

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pageString = searchParams.get('page') ?? 1;
    const currentPage = isNaN(+pageString) ? 1 : +pageString;

    if (currentPage < 1 || isNaN(+pageString)) {
        redirect(pathname);
    }

    const allPages = generatePaginationNumbers(currentPage, totalPages)

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        if (pageNumber === '...') {
            return `${pathname}?${params.toString()}`
        }

        if (+pageNumber <= 0) {
            return `${pathname}` // href='/', href='/women', etc.
        }

        if (+pageNumber > totalPages) {
            return `${pathname}?${params.toString()}`
        }

        params.set('page', pageNumber.toString())

        return `${pathname}?${params.toString()}`
    }

    return (
        <div className={clsx("flex text-center justify-center pt-4", {
            'hidden': totalPages === 0
        })}>
            <nav aria-label="Page navigation example">

                <ul className="flex list-style-none">
                    <li>
                        <Link
                            className={
                                clsx("page-link relative block py-1.5 px-2 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                                    {
                                        'hidden': currentPage === 1
                                    }
                                )}
                            href={createPageUrl(currentPage - 1)}>
                            <ChevronLeft strokeWidth={1} />
                        </Link>
                    </li>

                    {allPages.map((page, index) => (
                        <li key={page + '-' + index}>
                            <Link
                                className={
                                    clsx("relative block py-1.5 mx-[2px] px-3 border-0 outline-none transition-all duration-300 ease-in-out !text-white rounded bg-slate-600 hover:bg-slate-900 focus:shadow-none",
                                        {
                                            'bg-slate-800 !text-white': page === currentPage
                                        }
                                    )}
                                href={createPageUrl(page)}>
                                {page}
                            </Link>
                        </li>

                    ))}

                    <li>
                        <Link
                            className={
                                clsx("page-link relative block py-1.5 px-2 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                                    {
                                        'hidden': currentPage === totalPages
                                    }
                                )}
                            href={createPageUrl(currentPage + 1)}>
                            <ChevronRight strokeWidth={1} />
                        </Link>
                    </li>
                </ul>

            </nav>

        </div>
    )
}
