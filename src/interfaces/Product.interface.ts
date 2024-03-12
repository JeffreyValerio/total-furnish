import { Brand, Category, ProductType, Supplier, Warranty } from "@prisma/client";

export interface IProduct {
    [x: string]: any
    id: string;
    slug: string;
    name: string;
    model: string;
    tags: string[];
    front: number;
    depth: number;
    height: number;
    weight: number;
    brandId: string;
    supplierId: string;
    warrantyId: string;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
    brand: Brand;
    category: Category;
    type: ProductType
    ProductImage: ProductImage[];
    supplier?: Supplier;
    warranty?: Warranty;
}

export interface ProductImage {
    id?: number
    url?: string;
}

// export interface IProduct {
//     id: string
//     name: string
//     slug: string
//     model: string
//     tags: string[]

//     front: number
//     depth: number
//     height: number
//     weight: number

//     images: any

//     // ProductImage: ProductImage[]

//     brand?: Brand
//     category?: Category
//     supplier?: Supplier
//     warranty?: Warranty

//     createdAt: Date;
//     updatedAt: Date;
// }
// export interface ProductImage {
//     id: number;
//     url: string;
//     productId: string;
// }
