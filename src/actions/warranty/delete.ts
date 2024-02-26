'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const deleteWarranty = async (warrantyId: string) => {
    try {
        const warranty = await prisma.warranty.findUnique({
            where: { id: warrantyId },
            include: {
                product: true
            }
        });

        if (warranty && warranty.product.length < 0) {
            return {
                ok: false,
                message: 'No se puede eliminar una garantia porque tiene productos asociados.'
            };
        }

        await prisma.warranty.delete({
            where: { id: warrantyId }
        })

        revalidatePath(`/admin/warranties`)

        return {
            ok: true,
            message: 'Garantía eliminada con éxito.'
        }

    } catch (error) {
        return {
            ok: false,
            message: `Error: ${error}`
        }
    }
}