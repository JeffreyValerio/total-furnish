import { Brand, Category, ProductType, Supplier, Warranty } from "@prisma/client";

export interface IProduct {
    [x: string]: any
    id: string;
    slug: string;

    name: string;
    model: string;
    description: string
    features: string
    advantages: string
    tags: string[]

    front: number
    depth: number
    height: number
    weight: number

    cost: number
    price: number
    specialPrice: number
    rating: number

    brand: Brand;
    brandId: string;

    category: Category;
    categoryId: string;
    
    supplier?: Supplier;
    supplierId: string;
    
    warranty?: Warranty;
    warrantyId: string;
    
    type: ProductType
    
    ProductImage: ProductImage[];

    updatedAt: Date;
    createdAt: Date;
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
