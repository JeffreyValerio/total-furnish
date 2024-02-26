'use server'

import { revalidatePath } from 'next/cache';
import { Supplier } from '@prisma/client';
import { z } from 'zod'
import prisma from '@/lib/prisma';

const supplierSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    name: z.string().min(3).max(50),
    seller: z.string().min(3).max(50)
})
export const CreateUpdateSupplier = async (formData: FormData) => {
    const data = Object.fromEntries(formData);
    const supplierParsed = supplierSchema.safeParse(data)

    if (!supplierParsed.success) {
        console.log(supplierParsed.error)
        return { ok: false }
    }

    const supplier = supplierParsed.data;
    const { id, ...rest } = supplier

    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            let supplier: Supplier;

            if (id) {
                console.log({ id })
                // UPDATE
                supplier = await prisma.supplier.update({
                    where: { id },
                    data: { ...rest }
                })
            } else {
                // CREATE
                supplier = await prisma.supplier.create({
                    data: { ...rest }
                })
            }

            return { supplier }
        })

        revalidatePath('/admin/suppliers')
        revalidatePath(`/admin/suppliers/${supplier.id}`)
        revalidatePath(`/admin/dashboard`)

        return {
            ok: true,
            supplier: prismaTx.supplier
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: `Revisar los logs, no se pudo actualizar/crear el proveedor`
        }
    }
}