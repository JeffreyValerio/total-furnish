'use server'

import prisma from '@/lib/prisma'
import { PaginationOptions } from '@/interfaces'

export const getPaginatedProducts = async ({
    page = 1,
    take = 5
}: PaginationOptions) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    try {
        // 1. GET PRODUCTS
        const products = await prisma.product.findMany({
            take,
            skip: (page - 1) * take,
            orderBy: {
                name: 'asc'
            },
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true,
                    },
                },
                brand: true,
                category: true,
            }
        })

        // 2. GET TOTAL PAGES AND COUNT
        const totalCount = await prisma.product.count()
        const totalPages = Math.ceil(totalCount / take)

        return {
            totalProducts: totalCount,
            totalPages,
            products
        }
    } catch (error) {
        throw new Error("No se pudo cargar los productos");
    }
}