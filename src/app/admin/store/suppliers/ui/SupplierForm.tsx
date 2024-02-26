'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { useToaster } from "@/components/providers/ToastifyContext";
import { DeleteSupplierButton } from "./DeleteButton";
import { CreateUpdateSupplier } from "@/actions";
import Link from "next/link";
import { X } from "lucide-react";
import { Supplier } from "@prisma/client";
import { BackButton } from "@/components";

interface Props {
  supplier: Partial<Supplier>
}

interface FormInputs {
  name: string;
  seller: string;
}

export const SupplierForm = ({ supplier }: Props) => {

  const router = useRouter()
  const { showToast } = useToaster()
  const [formModified, setFormModified] = useState(false);

  const { handleSubmit, register, formState: { errors }, setValue } = useForm<FormInputs>();

  const handleInputChange = () => {
    setFormModified(true);
  };

  useEffect(() => {
    if (supplier.id) {
      setValue('name', `${supplier.name}`)
      setValue('seller', `${supplier.seller}`)
    }
  }, [supplier, setValue])

  // email: string[],
  // telephone: string[],
  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData()

    const { ...supplierToSave } = data
    if (supplier.id) {
      formData.append('id', supplier.id ?? "")
    }

    formData.append('name', supplierToSave.name)
    formData.append('seller', supplierToSave.seller)

    const { ok, message, supplier: updatedSupplier } = await CreateUpdateSupplier(formData);

    if (!ok) {
      showToast(`El proveedor no se pudo actualizar ${message}`, {
        type: 'warning',
      })
      return
    }

    showToast(`El proveedor fue ${supplier.name ? 'actualizado' : 'creado'} con éxito.`, {
      type: 'success',
    })

    router.replace(`/admin/store/suppliers/${updatedSupplier?.id}`)
    setFormModified(false);
  }

  return (
    <div className="form-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={handleInputChange}>

        <div className="flex flex-col mb-2 relative">

          <BackButton />
          
          <div className="flex flex-col mb-2">
            <label htmlFor="name" className="input-label">Nombre</label>
            <input
              type="text"
              {...register('name', {
                required: 'El código es un valor requerido',
                minLength: 3
              })}
            />
            {errors.name && (
              <p className="input-error">*{errors.name.message || 'Debe usar mínimo 3 caracteres'}</p>
            )}
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="seller" className="input-label">Vendedor</label>
            <input
              type="text"
              className="bg-slate-200 outline-none focus:ring-1 p-2 rounded text-sm"
              {...register('seller', {
                required: 'El vendedor es un valor requerido',
                minLength: 3
              })}
            />
            {errors.seller && (
              <p className="input-error">*{errors.seller.message || 'Debe usar mínimo 3 caracteres'}</p>
            )}
          </div>

          <button className={`btn-admin w-full h-fit mt-2 ${formModified ? '' : 'opacity-50 pointer-events-none'}`} disabled={!formModified}>
            {supplier.id ? 'Actualizar proveedor' : 'Agregar proveedor'}
          </button>
          {supplier.id && (
            <DeleteSupplierButton supplierId={supplier.id} text />
          )}
        </div>
      </form>
    </div>
  )
}