'use server'

import prisma from '@/lib/prisma'

export const getWarrantyBySlug = async (code: string) => {
    try {
        const warranty = await prisma.warranty.findFirst({
            where: {
                code
            }
        })

        if (!warranty) return null

        return warranty
        
    } catch (error) {
        throw new Error(`Error al obtener la garantía, error: ${error}`)
    }
}