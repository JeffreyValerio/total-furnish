import React from "react";

import Link from "next/link";

import { CalendarIcon, ClockIcon, EditIcon, KeyIcon, Ruler, RulerIcon, WeightIcon } from "lucide-react";
import { DeleteProductButton } from "./ui/DeleteButton";
import { getPaginatedProducts } from "@/actions";
import { Heading, Pagination, ProductImage } from "@/components";
import { IProduct } from "@/interfaces";


export const metadata = {
    title: 'Mantenimientos de productos',
    description: 'Mantenimientos de productos',
};

interface Props {
    searchParams: {
        page?: string;
    };
}
export default async function ProductsPage({ searchParams }: Props) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const { products, totalPages } = await getPaginatedProducts({ page })

    return (
        <div className="p-8">
            <Heading heading="productos" subheading="mantenimiento de" />

            <div className="bg-slate-100 p-8 rounded-md">
                <div className="w-full flex justify-end mx-auto items-center gap-2 mb-4">
                    <Link href={'/admin/store/products/new'} className="btn-admin">
                        Nuevo producto
                    </Link>
                </div>
                <table>
                    <tbody>
                        {products.length === 0 ? (
                            <tr className="border">
                                <td className="py-4 text-center" colSpan={6}>
                                    No hay ningún producto
                                </td>
                            </tr>
                        ) :
                            (
                                <>
                                    {products.map((product: any) => (
                                        <React.Fragment key={product.id}>
                                            <tr tabIndex={0}>
                                                <td>
                                                    <ProductImage
                                                        src={product.ProductImage[0]?.url}
                                                        width={80}
                                                        height={80}
                                                        alt={product.name}
                                                        className="px-2 object-scale-down"
                                                    />
                                                </td>

                                                <td className="pl-5">{product.name}</td>
                                                <td className="pl-5">{product.model}</td>
                                                <td className="pl-5 cursor-help">
                                                    <div className="flex justify-start items-center gap-x-1" title={`Palabras clave [${product.tags}]`}>
                                                        <KeyIcon strokeWidth={1} size={18} /> {product.tags.length}
                                                    </div>
                                                </td>
                                                <td className="pl-5 cursor-help">
                                                    <div className="flex justify-start items-center gap-x-1" title={`Ancho x Largo x Alto`}>
                                                        <RulerIcon strokeWidth={1} size={18} /> A{product.front} x L{product.depth} x H{product.height}
                                                    </div>
                                                </td>
                                                <td className="pl-5 cursor-help">
                                                    <div className="flex justify-start items-center gap-x-1" title={`Peso`}>
                                                        <WeightIcon strokeWidth={1} size={18} /> {product.weight}
                                                    </div>
                                                </td>
                                                <td className="pl-5 text-xs">
                                                    <label className="text-green-700">CREATED AT</label>
                                                    <pre>
                                                        <div className="flex gap-x-1 items-center">
                                                            <CalendarIcon strokeWidth={1} size={16} /> {new Date(`${product.createdAt}`).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex gap-x-1 items-center">
                                                            <ClockIcon strokeWidth={1} size={16} /> {new Date(`${product.createdAt}`).toLocaleTimeString()}
                                                        </div>
                                                    </pre>
                                                </td>

                                                <td className="pl-5 text-xs">
                                                    <label className="text-blue-700">UPDATED AT</label>
                                                    <pre>
                                                        <div className="flex gap-x-1 items-center">
                                                            <CalendarIcon strokeWidth={1} size={16} /> {new Date(`${product.updatedAt}`).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex gap-x-1 items-center">
                                                            <ClockIcon strokeWidth={1} size={16} /> {new Date(`${product.updatedAt}`).toLocaleTimeString()}
                                                        </div>
                                                    </pre>
                                                </td>

                                                <td>
                                                    <div className="flex justify-around items-center">
                                                        <Link
                                                            href={`/admin/store/products/${product.slug}`}
                                                            title={`Editar producto ${product.name}`}>
                                                            <EditIcon strokeWidth={1} size={18} />
                                                        </Link>
                                                        <DeleteProductButton productId={product.id} />
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
            </div>


            <Pagination totalPages={totalPages} />
        </div>
    );
}