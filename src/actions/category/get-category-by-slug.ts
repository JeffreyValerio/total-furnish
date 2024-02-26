'use server'

import prisma from '@/lib/prisma'

export const getCategoryBySlug = async (slug: string) => {
    try {
        const category = await prisma.category.findFirst({
            include: {
                products: {
                    include: {
                        ProductImage: true
                    }
                }
            },
            where: {
                slug
            }
        })

        if (!category) return null

        const productsWithImages = category.products.map((product) => ({
            ...product,
            images: product.ProductImage.map(image => image.url)
        }))

        return {
            ...category,
            products: productsWithImages
        }
    } catch (error) {
        throw new Error(`Error al obtener la marca, error: ${error}`)
    }
}