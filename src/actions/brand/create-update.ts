'use server'

cloudinary.config(process.env.CLOUDINARY_URL ?? '');
import { Brand } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import { z } from 'zod'
import prisma from '@/lib/prisma';
import slugify from 'slugify';

const brandSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    name: z.string().min(3).max(100),
    slug: z.string().min(3).max(255)
})
export const CreateUpdateBrand = async (formData: FormData) => {
    const data = Object.fromEntries(formData);
    const brandParsed = brandSchema.safeParse(data)

    if (!brandParsed.success) {
        console.log(brandParsed.error)
        return { ok: false }
    }

    const brand = brandParsed.data;
    brand.slug = slugify(brand.name, { lower: true, strict: true, trim: true, remove: /[*+~.()'"!:@]/g })

    const { id, ...rest } = brand

    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            let brand: Brand;

            if (id) {
                // UPDATE
                brand = await prisma.brand.update({
                    where: { id },
                    data: { ...rest }
                })
            } else {
                // CREATE
                brand = await prisma.brand.create({
                    data: { ...rest }
                })
            }

            // Handle image upload
            const imageFile = formData.get('image') as File;
            if (formData.get('image')) {
                const imageUrl = await uploadImage(imageFile);
                if (imageUrl) {
                    brand = await prisma.brand.update({
                        where: { id: brand.id },
                        data: { image: imageUrl }
                    });
                }
            }

            return { brand }
        })

        revalidatePath('/admin/store/brands')
        revalidatePath(`/admin/store/brand/${brand.slug}`)
        revalidatePath(`/brand/${brand.slug}`)
        revalidatePath(`/admin/dashboard`)

        return {
            ok: true,
            product: prismaTx.brand
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: `Revisar los logs, no se pudo actualizar/crear la marca`
        }
    }
}

const uploadImage = async (image: File) => {
    try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');

        const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
            folder: 'brands'
        });
        return result.secure_url;
    } catch (error) {
        console.error('Error al subir imagen: ', error);
        return null;
    }
}