'use server'

import prisma from '@/lib/prisma'
import { PaginationOptions } from '@/interfaces'

export const getPaginatedWarranties = async ({
    page = 1,
    take = 5
}: PaginationOptions) => {

    if (isNaN(Number(page))) page = 1
    if (page < 1) page = 1

    try {
        // GET WARRANTIES
        const warranties = await prisma.warranty.findMany({
            take,
            skip: (page - 1) * take,
            orderBy: {
                code: 'asc'
            },
            include: {
                product: true
            }
        })

        // GET TOTAL AND COUNT
        const totalCount = await prisma.warranty.count()
        const totalPages = Math.ceil(totalCount / take)

        return {
            totalWarranties: totalCount,
            totalPages,
            warranties
        }

    } catch (error) {
        throw new Error("No se pudo cargar las garantías");
    }
}