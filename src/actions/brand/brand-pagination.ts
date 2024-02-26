'use server'

import prisma from '@/lib/prisma'
import { PaginationOptions } from "@/interfaces"

export const getPaginatedBrands = async ({
    page = 1,
    take = 5,
}: PaginationOptions) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    try {
        // 1. GET BRANDS
        const brands = await prisma.brand.findMany({
            take: take,
            skip: (page - 1) * take,
            orderBy: {
                name: 'asc'
            }, 
            include: {
                product: true
            }
        })

        // 2. GET TOTAL PAGES AND COUNT
        const totalCount = await prisma.brand.count()
        const totalPages = Math.ceil(totalCount / take)

        return {
            totalBrands: totalCount,
            totalPages,
            brands
        }

    } catch (error) {
        throw new Error("No se pudo cargar las marcas");
    }
}