'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteCategory = async (categoryId: string) => {
    try {
        const category = await prisma.category.findUnique({
            where: { id: categoryId },
            include: { parent: true } // Incluimos el padre para verificar si existe
        });

        if (category && category.parentId) {
            return { 
                ok: false,
                message: 'No se puede eliminar una subcategoría que tiene una categoría padre.'
            };
        }

        const res = await prisma.category.delete({
            where: { id: categoryId }
        })

        const imageName = `${res.image}`
            .split('/')
            .pop()
            ?.split('.')[0] ?? '';

        // DELETING CLOUDINARY IMAGE
        await cloudinary.uploader.destroy('categories/' + imageName);

        revalidatePath(`/admin/categories`)

        return {
            ok: true,
            message: 'Categoría e imagen eliminados con éxito.'
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo eliminar la imagen'
        }
    }
}