'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const deleteSupplier = async (supplierId: string) => {
    try {
        const supplier = await prisma.supplier.findUnique({
            where: { id: supplierId },
            include: {
                product: true
            }
        });

        if (supplier && supplier?.product.length < 0) {
            return {
                ok: false,
                message: 'No se puede eliminar el proveedor porque tiene productos asociados.'
            };
        }
        
        await prisma.supplier.delete({
            where: { id: supplierId }
        })

        revalidatePath(`/admin/suppliers`)

        return {
            ok: true,
            message: 'Proveedor eliminado con éxito.'
        }

    } catch (error) {
        return {
            ok: false,
            message: `Error: ${error}`
        }
    }
}