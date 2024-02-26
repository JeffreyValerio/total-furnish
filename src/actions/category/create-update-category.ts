'use server'

cloudinary.config(process.env.CLOUDINARY_URL ?? '');
import { Category } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import { z } from 'zod'
import prisma from '@/lib/prisma';
import slugify from 'slugify';

const categorySchema = z.object({
    id: z.string().uuid().optional().nullable(),
    name: z.string().min(3).max(100),
    slug: z.string().min(3).max(255)
})
export const CreateUpdateCategory = async (formData: FormData) => {
    const data = Object.fromEntries(formData);
    const categoryParsed = categorySchema.safeParse(data)

    if (!categoryParsed.success) {
        console.log(categoryParsed.error)
        return { ok: false }
    }

    const category = categoryParsed.data;
    category.slug = slugify(category.name, { lower: true, strict: true, trim: true, remove: /[*+~.()'"!:@]/g })

    const { id, ...rest } = category

    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            let category: Category;

            if (id) {
                // UPDATE
                category = await prisma.category.update({
                    where: { id },
                    data: { ...rest }
                })
            } else {
                // CREATE
                category = await prisma.category.create({
                    data: { ...rest }
                })
            }

            // Handle image upload
            const imageFile = formData.get('image') as File;
            if (formData.get('image')) {
                const imageUrl = await uploadImage(imageFile);
                if (imageUrl) {
                    category = await prisma.category.update({
                        where: { id: category.id },
                        data: { image: imageUrl }
                    });
                }
            }

            const parentIdForm = formData.get('parentId')
            if (formData.get('parentId')) {
                await prisma.category.update({
                    where: { id: category.id },
                    data: { parentId: parentIdForm as string }
                })
            }

            return { category }
        })

        revalidatePath('/admin/store/categories')
        revalidatePath(`/admin/store/category/${category.slug}`)
        revalidatePath(`/category/${category.slug}`)
        revalidatePath(`/admin/dashboard`)

        return {
            ok: true,
            category: prismaTx.category
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: `Revisar los logs, no se pudo actualizar/crear la categoría`
        }
    }
}

const uploadImage = async (image: File) => {
    try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');

        const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
            folder: 'categories'
        });
        return result.secure_url;
    } catch (error) {
        console.error('Error al subir imagen: ', error);
        return null;
    }
}