'use server'

import { revalidatePath } from 'next/cache';
import { Warranty } from '@prisma/client';
import { z } from 'zod'
import prisma from '@/lib/prisma';

const warrantySchema = z.object({
    id: z.string().uuid().optional().nullable(),
    code: z.string().min(3).max(20),
    description: z.string().min(3).max(255)
})
export const CreateUpdateWarranty = async (formData: FormData) => {
    const data = Object.fromEntries(formData);
    const warrantyParsed = warrantySchema.safeParse(data)

    if (!warrantyParsed.success) {
        console.log(warrantyParsed.error)
        return { ok: false }
    }

    const warranty = warrantyParsed.data;
    const { id, ...rest } = warranty

    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            let warranty: Warranty;

            if (id) {
                console.log({ id })
                // UPDATE
                warranty = await prisma.warranty.update({
                    where: { id },
                    data: { ...rest }
                })
            } else {
                // CREATE
                warranty = await prisma.warranty.create({
                    data: { ...rest }
                })
            }

            return { warranty }
        })

        revalidatePath('/admin/warranties')
        revalidatePath(`/admin/warranties/${warranty.code}`)
        revalidatePath(`/admin/dashboard`)

        return {
            ok: true,
            warranty: prismaTx.warranty
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: `Revisar los logs, no se pudo actualizar/crear la marca`
        }
    }
}