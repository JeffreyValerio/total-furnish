'use server'

import prisma from '@/lib/prisma'

export const getSupplierById = async (id: string) => {
    try {
        const supplier = await prisma.supplier.findFirst({
            where: {
                id
            }
        })

        if (!supplier) return null

        return supplier
        
    } catch (error) {
        throw new Error(`Error al obtener el proveedor, error: ${error}`)
    }
}