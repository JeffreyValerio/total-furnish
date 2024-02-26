'use server'

import prisma from '@/lib/prisma'
import { PaginationOptions } from "@/interfaces"
import { Category } from '@prisma/client';

interface CategoryWithParent extends Category {
    parentName?: string;
    children?: CategoryWithParent[]; // Agregar esta línea
}

export const getPaginatedCategories = async ({
    page = 1,
    take = 5
}: PaginationOptions) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    try {
        // GET CATEGORIES
        const categories = await prisma.category.findMany({
            take: take,
            skip: (page - 1) * take,
            orderBy: {
                name: 'asc'
            },
            include: {
                // FIRST LEVEL (category)
                products: true,
                children: {
                    include: {
                        // SECOND LEVEL (subcategory)
                        products: true,
                        children: {
                            include: {
                                // THIRD LEVEL (sub-subcategory)
                                products: true
                            }
                        }
                    }
                },
            }
        })

        const categoriesWithParent: CategoryWithParent[] = categories.map((category: Category) => {
            const parentCategory = categories.find((c: Category) => c.id === category.parentId);
            return {
                ...category,
                parentName: parentCategory ? parentCategory.name : '',
                parentSlug: parentCategory?.slug
            };
        });

        const assignParentName = (categories: CategoryWithParent[]) => {
            categories.forEach((category: CategoryWithParent) => {
                if (category.children && category.children.length > 0) {
                    assignParentName(category.children as CategoryWithParent[]);
                }
                if (category.children) {
                    category.children.forEach((child: CategoryWithParent) => {
                        child.parentName = category.name;
                        if (child.children && child.children.length > 0) {
                            assignParentName(child.children as CategoryWithParent[]);
                        }
                    });
                }
            });
        };

        assignParentName(categoriesWithParent);

        // GET TOTAL PAGES AND COUNT
        const totalCount = await prisma.category.count()
        const totalPages = Math.ceil(totalCount / take)

        return {
            totalCategories: totalCount,
            totalPages,
            categoriesWithParent,
        }

    } catch (error) {
        throw new Error("No se pudo cargar las categorías"); 
    }
}