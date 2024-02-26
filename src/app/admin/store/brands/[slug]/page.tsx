import { BrandForm } from "../ui/BrandForm";
import { getBrandBySlug } from "@/actions";
import { Heading } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  params: {
    slug: string;
  }
}

export const metadata = {
  title: `Create or update brand`,
  description: 'Create or update brand',
};

export default async function BrandPage({ params }: Props) {

  const { slug } = params;

  const title = (slug === 'new') ? 'Nueva marca' : 'Editar marca'
  const brand = await getBrandBySlug(slug)

  if (!brand && slug !== 'new') {
    redirect('/admin/store/brands')
  }

  return (
    <div className="p-8">
      <Heading heading={brand?.name ?? ''} subheading={title} />

      <div className="p-8 rounded-md bg-slate-100 h-fit">
          <BrandForm brand={brand ?? {}} />
      </div>
    </div>
  );
} 