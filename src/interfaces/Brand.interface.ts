import { Product } from "@prisma/client";

export interface IBrand {
    id:        string;
    name:      string;
    slug:      string;
    image:     string;
    product:   Product[];
    createdAt: Date;
    updatedAt: Date;
}