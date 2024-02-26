import Link from "next/link";

import { CalendarIcon, ClockIcon, EditIcon, ShoppingBagIcon } from "lucide-react";
import { getPaginatedWarranties } from "@/actions";
import { Heading, Pagination } from "@/components";
import { IWarranty } from "@/interfaces";
import { DeleteWarrantyButton } from "./ui/DeleteButton";
import React from "react";


export const metadata = {
    title: 'Mantenimiento de garantías',
    description: 'Mantenimiento de garantías',
};
interface Props {
    searchParams: {
        page?: string;
    };
}

export default async function WarrantiesPage({ searchParams }: Props) {
    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const { warranties, totalPages } = await getPaginatedWarranties({ page })

    return (
        <div className="p-8">

            <Heading heading="garantías" subheading="mantenimiento de" />

            <div className="bg-slate-100 p-8 rounded-md">

                <div className="w-full flex justify-end mx-auto items-centergap-2 mb-4">
                    <Link href={'/admin/store/warranties/new'} className="btn-admin">
                        Nueva garantía
                    </Link>
                </div>

                <table className="w-full whitespace-nowrap text-sm">
                    <tbody>
                        {warranties.length === 0 ? (
                            <tr className="border">
                                <td className="py-4 text-center" colSpan={6}>
                                    No hay ninguna garantía en este momento
                                </td>
                            </tr>
                        ) :
                            ( 
                                <>
                                    {warranties.map((warranty: IWarranty) => (
                                        <React.Fragment key={warranty.id}>
                                            <tr tabIndex={0} className="focus:outline-none h-16 border-b border-gray-100 shadow-md hover:shadow-lg bg-white">
                                                <td className="pl-5">[{warranty.code}]</td>
                                                <td className="pl-5">{warranty.description}</td>
                                                <td>
                                                    <div className="flex justify-start items-center gap-x-1"
                                                        title={`Productos con la garantía [${warranty.code}]`}>
                                                        <ShoppingBagIcon strokeWidth={1} size={18} /> {warranty.product.length}
                                                    </div>
                                                </td>
                                                <td className="pl-5 text-xs">
                                                    <label className="text-green-700">CREATED AT</label>
                                                    <pre>
                                                        <div className="flex gap-x-1 items-center">
                                                            <CalendarIcon strokeWidth={1} size={16} /> {new Date(`${warranty.createdAt}`).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex gap-x-1 items-center">
                                                            <ClockIcon strokeWidth={1} size={16} /> {new Date(`${warranty.createdAt}`).toLocaleTimeString()}
                                                        </div>
                                                    </pre>
                                                </td>
                                                <td className="pl-5 text-xs">
                                                    <label className="text-blue-700">UPDATED AT</label>
                                                    <pre>
                                                        <div className="flex gap-x-1 items-center">
                                                            <CalendarIcon strokeWidth={1} size={16} /> {new Date(`${warranty.updatedAt}`).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex gap-x-1 items-center">
                                                            <ClockIcon strokeWidth={1} size={16} /> {new Date(`${warranty.updatedAt}`).toLocaleTimeString()}
                                                        </div>
                                                    </pre>
                                                </td>

                                                <td>
                                                    <div className="flex gap-x-2 px-2 justify-around items-center">
                                                        <Link
                                                            href={`/admin/store/warranties/${warranty.code}`}
                                                            title={`Editar marca ${warranty.code}`}>
                                                            <EditIcon strokeWidth={1} size={18} />
                                                        </Link>
                                                        <DeleteWarrantyButton warrantyId={warranty.id} />
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