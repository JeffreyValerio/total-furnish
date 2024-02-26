import React from "react";

import Image from "next/image";
import Link from "next/link";

import { DeleteBrandButton } from "./ui/DeleteButton";
import { CalendarIcon, ClockIcon, EditIcon, ShoppingBagIcon } from "lucide-react";
import { getPaginatedBrands } from "@/actions";
import { Heading, Pagination } from "@/components";

export const metadata = {
    title: 'Mantenimiento de marcas',
    description: 'Mantenimiento de marcas',
};
interface Props { 
    searchParams: {
        page?: string;
    };
}

export default async function BrandsPage({ searchParams }: Props) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const { brands, totalPages } = await getPaginatedBrands({ page })

    return (
        <div className="p-8">

            <Heading heading="marcas" subheading="mantenimiento de" />

            <div className="bg-slate-100 p-8 rounded-md">

                <div className="w-full flex justify-end mx-auto items-centergap-2 mb-4">
                    <Link href={'/admin/store/brands/new'} className="btn-admin">
                        Nueva marca
                    </Link>
                </div>

                <table>
                    <tbody>
                        {brands.length === 0 ? (
                            <tr className="border">
                                <td className="py-4 text-center" colSpan={6}>
                                    No hay ninguna marca
                                </td>
                            </tr>
                        ) :
                            (
                                <>
                                    {brands.map((brand: any) => (
                                        <React.Fragment key={brand.id}>
                                            <tr tabIndex={0}>

                                                <td>
                                                    <Image
                                                        src={brand.image?.startsWith('http') ? brand.image : `/images/placeholder.webp`}
                                                        width={80}
                                                        height={80}
                                                        alt={brand.name}
                                                        className="p-2 object-scale-down"
                                                    />
                                                </td>

                                                <td className="pl-5">{brand.name}</td>

                                                <td className="pl-5 cursor-help">
                                                    <div className="flex justify-start items-center gap-x-1" title={`Productos en la marca ${brand.name}`}>
                                                        <ShoppingBagIcon strokeWidth={1} size={18} /> {brand.product.length}
                                                    </div>
                                                </td>

                                                <td className="pl-5 text-xs">
                                                    <label className="text-green-700">CREATED AT</label>
                                                    <pre>
                                                        <div className="flex gap-x-1 items-center">
                                                            <CalendarIcon strokeWidth={1} size={16} /> {new Date(`${brand.createdAt}`).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex gap-x-1 items-center">
                                                            <ClockIcon strokeWidth={1} size={16} /> {new Date(`${brand.createdAt}`).toLocaleTimeString()}
                                                        </div>
                                                    </pre>
                                                </td>

                                                <td className="pl-5 text-xs">
                                                    <label className="text-blue-700">UPDATED AT</label>
                                                    <pre>
                                                        <div className="flex gap-x-1 items-center">
                                                            <CalendarIcon strokeWidth={1} size={16} /> {new Date(`${brand.updatedAt}`).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex gap-x-1 items-center">
                                                            <ClockIcon strokeWidth={1} size={16} /> {new Date(`${brand.updatedAt}`).toLocaleTimeString()}
                                                        </div>
                                                    </pre>
                                                </td>

                                                <td>
                                                    <div className="flex justify-around items-center">
                                                        <Link
                                                            href={`/admin/store/brands/${brand.slug}`}
                                                            title={`Editar marca ${brand.name}`}>
                                                            <EditIcon strokeWidth={1} size={18} />
                                                        </Link>
                                                        <DeleteBrandButton brandId={brand.id} />
                                                    </div>
                                                </td>
                                            </tr>

                                            <tr className="h-2 shadow-none"></tr>
                                        </React.Fragment>
                                    ))}
                                </>
                            )
                        }
                    </tbody>
                </table>
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}