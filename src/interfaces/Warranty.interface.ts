import { Product } from "@prisma/client";

export interface IWarranty {
    id: string,
    code: string,
    description: string,
    updatedAt: Date,
    createdAt: Date,
    product: Product[]
} 