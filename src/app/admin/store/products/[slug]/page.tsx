import { getPaginatedBrands, getPaginatedCategories, getPaginatedSuppliers, getPaginatedWarranties, getProductBySlug } from "@/actions";
import { Heading } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "../ui/ProductForm";

interface Props {
    params: {
        slug: string;
    }
}
export default async function ProductPage({ params }: Props) {
    const { slug } = params;

    const [product, { brands }, { categoriesWithParent }, { warranties }, { suppliers }] = await Promise.all([
        getProductBySlug(slug),
        getPaginatedBrands({}),
        getPaginatedCategories({}),
        getPaginatedWarranties({}),
        getPaginatedSuppliers({})
    ])

    if (!product && slug !== 'new' && slug !== 'capris') {
        redirect('/admin/store/products')
    }
    const title = (slug === 'new') ? 'Nuevo producto' : 'Editar producto'

    return (
        <div className="p-8">
            <Heading heading={product?.name ?? ''} subheading={title} />

            <div className="p-8 rounded-md bg-slate-100 h-fit">
                <ProductForm
                    product={product ?? {}}
                    brands={brands}
                    categories={categoriesWithParent}
                    suppliers={suppliers}
                    warranties={warranties}
                />
            </div>

        </div>
    );
}