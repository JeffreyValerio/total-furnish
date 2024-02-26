import Image from "next/image";
import Link from "next/link";

import { DeleteCategoryButton } from "./ui/DeleteButton";
import { CalendarIcon, ClockIcon, EditIcon, ShoppingBagIcon, TagIcon, TagsIcon } from "lucide-react";
import { getPaginatedCategories } from "@/actions";
import { Heading, Pagination } from "@/components";
import clsx from "clsx";
import React from "react";

export const metadata = {
    title: 'Mantenimiento de marcas',
    description: 'Mantenimiento de marcas',
};
interface Props {
    searchParams: {
        page?: string;
    };
}

export default async function CategoryPage({ searchParams }: Props) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const take = 200

    const { categoriesWithParent, totalPages } = await getPaginatedCategories({ page, take })

    return (
        <div className="p-8">
            <Heading heading="categorías" subheading="mantenimiento de" />

            <div className="bg-slate-100 p-8 rounded-md">

                <div className="w-full flex justify-end mx-auto items-centergap-2 mb-4">
                    <Link href={'/admin/store/categories/new'} className="btn-admin">
                        Nueva categoría
                    </Link>
                </div>

                <table>
                    <tbody>
                        {categoriesWithParent.length === 0
                            ? (
                                <tr className="border">
                                    <td className="py-4 text-center" colSpan={6}>
                                        No hay ninguna categoría
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    {categoriesWithParent.map((category: any) => (
                                        <React.Fragment key={category.id}>
                                            <tr tabIndex={0}>
                                                <td>
                                                    <Image
                                                        src={category.image?.startsWith('http') ? category.image : `/images/placeholder.webp`}
                                                        width={80}
                                                        height={80}
                                                        alt={category.name}
                                                        className="px-2 object-scale-down"
                                                    />
                                                </td>

                                                <td className="">
                                                    <div className="flex items-center pl-5">
                                                        <p className="font-medium leading-none text-gray-700 mr-2">
                                                            <small className={clsx("bg-blue-900 px-2 w-5 h-5 text-white rounded-full", {
                                                                'bg-green-900': category.parentId
                                                            })}>
                                                                {category.parentId ? 'SUB' : 'CAT'}
                                                            </small> {category.name}
                                                        </p>
                                                    </div>
                                                </td>

                                                <td className="pl-5">
                                                    <Link
                                                        href={`/admin/store/categories/${category.parentSlug}`}
                                                        className="flex justify-start items-center gap-x-1" title={`Pertenece a ${category.name}`}>
                                                        <TagIcon strokeWidth={1} size={18} className={clsx("", { 'hidden': !category.parentName })} />
                                                        {category.parentName ? `${category.parentName}` : ''}
                                                    </Link>
                                                </td>
                                                <td className="pl-5">
                                                    <div className="flex justify-start items-center gap-x-1" title={`Subcategorías de ${category.name}`}>
                                                        <TagsIcon strokeWidth={1} size={18} /> {category.children.length}
                                                    </div>
                                                </td>
                                                <td className="pl-5">
                                                    <div className="flex justify-start items-center gap-x-1"
                                                        title={`Productos en la categoría ${category.name}`}>
                                                        <ShoppingBagIcon strokeWidth={1} size={18} /> {category.products.length}
                                                    </div>
                                                </td>
                                                <td className="pl-5 text-xs">
                                                    <label className="text-green-700">CREATED AT</label>
                                                    <pre>
                                                        <div className="flex gap-x-1 items-center">
                                                            <CalendarIcon strokeWidth={1} size={16} /> {new Date(`${category.createdAt}`).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex gap-x-1 items-center">
                                                            <ClockIcon strokeWidth={1} size={16} /> {new Date(`${category.createdAt}`).toLocaleTimeString()}
                                                        </div>
                                                    </pre>
                                                </td>
                                                <td className="pl-5 text-xs">
                                                    <label className="text-blue-700">UPDATED AT</label>
                                                    <pre>
                                                        <div className="flex gap-x-1 items-center">
                                                            <CalendarIcon strokeWidth={1} size={16} /> {new Date(`${category.updatedAt}`).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex gap-x-1 items-center">
                                                            <ClockIcon strokeWidth={1} size={16} /> {new Date(`${category.updatedAt}`).toLocaleTimeString()}
                                                        </div>
                                                    </pre>
                                                </td>
                                                <td className="pl-5">
                                                    <div className="flex gap-x-2 px-2 justify-around items-center">
                                                        <Link href={`/admin/store/categories/${category.slug}`} title={`Editar marca ${category.name}`}>
                                                            <EditIcon strokeWidth={1} size={18} />
                                                        </Link>
                                                        <DeleteCategoryButton categoryId={category.id} />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="h-2 shadow-none"></tr>
                                        </React.Fragment>
                                    ))}

                                </>
                            )}

                    </tbody>
                </table>

                <Pagination totalPages={totalPages} />

            </div>

        </div>
    );
}