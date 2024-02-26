import { Product } from "@prisma/client";

export interface ISupplier {
    id: string,
    name: string,
    seller: string,
    email: string[],
    telephone: string[],
    createdAt: Date,
    updatedAt: Date,
    product: Product[]
}