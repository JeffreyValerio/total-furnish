'use server'

cloudinary.config(process.env.CLOUDINARY_URL ?? '');
import { Product } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
import { z } from 'zod'
import prisma from '@/lib/prisma';
import slugify from 'slugify';

const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    slug: z.string().min(3).max(255),
    name: z.string().min(3).max(100),
    model: z.string().min(3).max(100),
    description: z.string(),
    tags: z.string(),

    features: z.string(),
    advantages: z.string(),

    front: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),
    depth: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),
    height: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),
    weight: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),

    cost: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
    price: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
    specialPrice: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
    rating: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
    
    type: z.enum(['BESTSELLER', 'FEATURE', 'GENERAL', 'TRENDING']),

    brandId: z.string().uuid(),
    categoryId: z.string().uuid(),
    supplierId: z.string().uuid(),
    warrantyId: z.string().uuid(),
})
export const CreateUpdateProduct = async (formData: FormData) => {

    const data = Object.fromEntries(formData)
    const productParsed = productSchema.safeParse(data);

    if (!productParsed.success) {
        console.log(productParsed.error)
        return { ok: false }
    }

    const product = productParsed.data;
    product.slug = slugify(product.name, { lower: true, strict: true, trim: true, remove: /[*+~.()'"!:@]/g })

    const { id, ...rest } = product

    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            let product: Product;
            const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase());

            if (id) {
                // UPDATE
                product = await prisma.product.update({
                    where: { id },
                    data: {
                        ...rest,
                        tags: {
                            set: tagsArray
                        }
                    }
                })
            } else {
                // CREATE
                product = await prisma.product.create({
                    data: {
                        ...rest,
                        tags: {
                            set: tagsArray
                        }
                    }
                })
            }

            // SI SON ARCHIVOS DE IMAGEN  
            if (formData.getAll('images')) {
                const imageFiles: any = formData.getAll('images')
                const images = await uploadImages(imageFiles as File[]);
                if (images) {
                    await prisma.productImage.createMany({
                        data: images.map(image => ({
                            url: image!,
                            productId: product.id,
                        }))
                    });
                }
            }

            // SI SON URLS 
            if (formData.getAll('imageUrls')) {
                const imageFiles: any = formData.getAll('imageUrls')
                const images = await uploadImages(imageFiles as File[]);
                if (images) {
                    await prisma.productImage.createMany({
                        data: images.map(image => ({
                            url: image!,
                            productId: product.id,
                        }))
                    });
                }
            }

            return { product }
        })

        revalidatePath('/admin/store/products')
        revalidatePath(`/admin/store/products/${product.slug}`)
        revalidatePath(`/products/${product.slug}`)
        revalidatePath(`/admin/dashboard`)

        return {
            ok: true,
            product: prismaTx.product
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: `Revisar los logs, no se pudo actualizar/crear el producto`
        }
    }
}

const uploadImages = async (filesOrURLs: any) => {
    try {
        // Verificar si es una cadena de texto (URL única)
        if (typeof filesOrURLs === 'string') {
            const result = await cloudinary.uploader.upload(filesOrURLs);
            console.log('URL CLOUDINARY ---: ' + result.secure_url);
            return [result.secure_url];  // Devolver un array con la URL
        }

        // Asegúrate de que filesOrURLs sea un array antes de mapearlo
        if (!Array.isArray(filesOrURLs)) {
            console.error('Input is not an array or a string');
            return null;
        }

        const uploadPromises = filesOrURLs.map(async (fileOrURL) => {
            try {
                if (typeof fileOrURL === 'string') {
                    // Si es una URL, sube la imagen remota a Cloudinary
                    const result = await cloudinary.uploader.upload(fileOrURL, {
                        folder: 'products'
                    });
                    console.log('URL CLOUDINARY: ' + result.secure_url);
                    return result.secure_url;
                } else {
                    // Si es un archivo local, sube la imagen a Cloudinary
                    const buffer = await fileOrURL.arrayBuffer();
                    const base64Image = Buffer.from(buffer).toString('base64');

                    const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
                        folder: 'products'
                    });
                    console.log('URL CLOUDINARY: ' + result.secure_url);
                    return result.secure_url;
                }
            } catch (error) {
                console.error('Error al subir imagen: ', error);
                return null;
            }
        });

        const uploadedImages = await Promise.all(uploadPromises);
        return uploadedImages;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};