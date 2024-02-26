import Link from "next/link";

import { AtSignIcon, CalendarIcon, ClockIcon, EditIcon, PhoneIcon, ShoppingBagIcon, UserIcon } from "lucide-react";
import { getPaginatedSuppliers, getPaginatedWarranties } from "@/actions";
import { Heading, Pagination } from "@/components";
import { ISupplier, IWarranty } from "@/interfaces";
import { DeleteSupplierButton } from "./ui/DeleteButton";
import React from "react";


export const metadata = {
    title: 'Mantenimiento de proveedores',
    description: 'Mantenimiento de proveedores',
};
interface Props {
    searchParams: {
        page?: string;
    };
}

export default async function SuppliersPage({ searchParams }: Props) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const { suppliers, totalPages } = await getPaginatedSuppliers({ page })

    return (
        <div className="p-8">

            <Heading heading="proveedores" subheading="mantenimiento de" />

            <div className="bg-slate-100 p-8 rounded-md">

                <div className="w-full flex justify-end mx-auto items-centergap-2 mb-4">
                    <Link href={'/admin/store/suppliers/new'} className="btn-admin">
                        Nuevo proveedor
                    </Link>
                </div>

                <table className="w-full whitespace-nowrap text-sm">
                    <tbody>
                        {suppliers.length === 0 ? (
                            <tr className="border">
                                <td className="py-4 text-center" colSpan={6}>
                                    No hay ningún proveedor en este momento
                                </td>
                            </tr>
                        ) :
                            (
                                <>
                                    {suppliers.map((supplier: ISupplier) => (
                                        <React.Fragment key={supplier.id}>
                                            <tr tabIndex={0} className="focus:outline-none h-16 border-b border-gray-100 shadow-md hover:shadow-lg bg-white">
                                                <td className="pl-5">{supplier.name}</td>
                                                <td className="pl-5">
                                                    <div className="flex justify-start items-center gap-x-1"
                                                        title={`Vendedor del proveedor ${supplier.name}`}>
                                                        <UserIcon strokeWidth={1} size={18} /> {supplier.seller}
                                                    </div>
                                                </td>
                                                <td className="pl-5">
                                                    <div className="flex justify-start items-center gap-x-1"
                                                        title={`Correo del proveedor: ${supplier.email}`}>
                                                        <AtSignIcon strokeWidth={1} size={18} /> {supplier.email}
                                                    </div>
                                                </td>
                                                <td className="pl-5">
                                                    <div className="flex justify-start items-center gap-x-1">
                                                        <PhoneIcon strokeWidth={1} size={18} /> 60265671{supplier.telephone}
                                                    </div>
                                                </td>
                                                <td className="pl-5">
                                                    <div className="flex justify-start items-center gap-x-1"
                                                        title={`Productos del proveedor ${supplier.name}`}>
                                                        <ShoppingBagIcon strokeWidth={1} size={18} /> {supplier.product.length}
                                                    </div>
                                                </td>
                                                <td className="pl-5 text-xs">
                                                    <label className="text-green-700">CREATED AT</label>
                                                    <pre>
                                                        <div className="flex gap-x-1 items-center">
                                                            <CalendarIcon strokeWidth={1} size={16} /> {new Date(`${supplier.createdAt}`).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex gap-x-1 items-center">
                                                            <ClockIcon strokeWidth={1} size={16} /> {new Date(`${supplier.createdAt}`).toLocaleTimeString()}
                                                        </div>
                                                    </pre>
                                                </td>
                                                <td className="pl-5 text-xs">
                                                    <label className="text-blue-700">UPDATED AT</label>
                                                    <pre>
                                                        <div className="flex gap-x-1 items-center">
                                                            <CalendarIcon strokeWidth={1} size={16} /> {new Date(`${supplier.updatedAt}`).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex gap-x-1 items-center">
                                                            <ClockIcon strokeWidth={1} size={16} /> {new Date(`${supplier.updatedAt}`).toLocaleTimeString()}
                                                        </div>
                                                    </pre>
                                                </td>

                                                <td>
                                                    <div className="flex gap-x-2 px-2 justify-around items-center">
                                                        <Link
                                                            href={`/admin/store/suppliers/${supplier.id}`}
                                                            title={`Editar proveedor ${supplier.name}`}>
                                                            <EditIcon strokeWidth={1} size={18} />
                                                        </Link>
                                                        <DeleteSupplierButton supplierId={supplier.id} />
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