'use server'

import prisma from '@/lib/prisma'

export const getProductBySlug = async (slug: string) => {
    try {
        const product = await prisma.product.findFirst({
            include: {
                brand: true,
                category: true,
                warranty: true,
                supplier: true,
                ProductImage: true,
            },
            where: {
                slug: slug
            }
        })

        if (!product) return null

        return {
            ...product,
            images: product.ProductImage.map(image => image.url),
        }

    } catch (error) {
        throw new Error(`Error al obtener el producto por error: ${error}`)
    }
} 