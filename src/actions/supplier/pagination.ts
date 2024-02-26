'use server'

import prisma from '@/lib/prisma'
import { PaginationOptions } from '@/interfaces'

export const getPaginatedSuppliers = async ({
    page = 1,
    take = 5
}: PaginationOptions) => {

    if (isNaN(Number(page))) page = 1
    if (page < 1) page = 1

    try {
        // GET SUPPLIERS
        const suppliers = await prisma.supplier.findMany({
            take,
            skip: (page - 1) * take,
            orderBy: {
                name: 'asc'
            },
            include: {
                product: true
            }
        })

        // GET TOTAL AND COUNT
        const totalCount = await prisma.supplier.count()
        const totalPages = Math.ceil(totalCount / take)

        return {
            totalSuppliers: totalCount,
            totalPages,
            suppliers
        }

    } catch (error) {
        throw new Error("No se pudo cargar las proveedores");
    }
}