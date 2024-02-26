'use server'

import prisma from '@/lib/prisma'

export const getBrandBySlug = async (slug: string) => {
    try {
        const brand = await prisma.brand.findFirst({
            include: {
                product: {
                    include: {
                        ProductImage: true
                    }
                }
            },
            where: {
                slug
            }
        })

        if (!brand) return null

        const productsWithImages = brand.product.map((product) => ({
            ...product,
            images: product.ProductImage.map(image => image.url)
        }))

        return {
            ...brand,
            product: productsWithImages
        }
    } catch (error) {
        throw new Error(`Error al obtener la marca, error: ${error}`)
    }
}