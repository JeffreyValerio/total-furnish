import { getSupplierById, getWarrantyBySlug } from "@/actions";
import { redirect } from "next/navigation";
import { Heading } from "@/components";
import { SupplierForm } from "../ui/SupplierForm";

interface Props {
  params: {
    slug: string;
  }
}

export const metadata = {
  title: `Create or update Suppliers`,
  description: 'Create or update Suppliers',
};

export default async function SupplierPage({ params }: Props) {

  const { slug } = params;

  const title = (slug === 'new') ? 'Nuevo proveedor' : 'Editar proveedor'
  const supplier = await getSupplierById(slug)

  if (!supplier && slug !== 'new') {
    redirect('/admin/store/suppliers')
  }

  return (
    <div className="p-8">
      <Heading heading={supplier?.name ?? ''} subheading={title} />

      <div className="p-8 rounded-md bg-slate-100 h-fit">
        <SupplierForm supplier={supplier ?? {}} />
      </div>
    </div>
  );
}  