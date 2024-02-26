import { getWarrantyBySlug } from "@/actions";
import { redirect } from "next/navigation";
import { WarrantyForm } from "../ui/WarrantyForm";
import { Heading } from "@/components";

interface Props {
  params: {
    slug: string;
  }
}

export const metadata = {
  title: `Create or update Warranty`,
  description: 'Create or update Warranty',
};

export default async function WarrantyPage({ params }: Props) {

  const { slug } = params;

  const title = (slug === 'new') ? 'Nueva garantía' : 'Editar garantía'
  const warranty = await getWarrantyBySlug(slug)

  if (!warranty && slug !== 'new') {
    redirect('/admin/store/warranties')
  }

  return (
    <div className="p-8">
      <Heading heading={warranty?.code ?? ''} subheading={title} />

      <div className="p-8 rounded-md bg-slate-100 h-fit">
        <WarrantyForm warranty={warranty ?? {}} />
      </div>
    </div>
  );
} 