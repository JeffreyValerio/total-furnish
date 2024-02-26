import { getCategoryBySlug } from "@/actions";
import { redirect } from "next/navigation";
import { Heading } from "@/components";
import { CategoryForm } from "../ui/CategoryForm";

interface Props {
    params: {
        slug: string;
    }
}

export const metadata = {
    title: `Create or update category`,
    description: 'Create or update category',
};

export default async function CategoryPage({ params }: Props) {

    const { slug } = params;

    const title = (slug === 'new') ? 'Nueva categoría' : 'Editar categoría'
    const category = await getCategoryBySlug(slug)

    if (!category && slug !== 'new') {
        redirect('/admin/store/categories')
    }

    return (
        <div className="p-8">
            <Heading heading={category?.name ?? ''} subheading={title} />

            <div className="p-8 rounded-md bg-slate-100 h-fit">
                <CategoryForm category={category ?? {}} />
            </div>
        </div>
    );
} 