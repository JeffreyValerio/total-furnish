'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteBrand = async (brandId: string) => {
    try {

        const brand = await prisma.brand.findUnique({
            where: { id: brandId },
            include: {
                product: true
            }
        });

        if (brand && brand.product.length < 0) {
            return {
                ok: false,
                message: 'No se puede eliminar la marca porque tiene productos asociados.'
            };
        }

        const res = await prisma.brand.delete({
            where: { id: brandId }
        })

        const imageName = `${res.image}`
            .split('/')
            .pop()
            ?.split('.')[0] ?? '';

        // DELETING CLOUDINARY IMAGE
        await cloudinary.uploader.destroy('brands/' + imageName);

        revalidatePath(`/admin/brands`)

        return {
            ok: true,
            message: 'Marca y logo eliminados con éxito.'
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo eliminar el logo'
        }
    }
}