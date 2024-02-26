import { Product } from "@prisma/client";

export interface Category {
    id: string;
    name: string;
    slug: string;
    image: string | null;
    parentId: string | null;
    products: Product[];
    children: Category[];
    updatedAt: Date;
    createdAt: Date;
}
