'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Warranty } from "@prisma/client";
import { CreateUpdateWarranty } from "@/actions";
import { useForm } from "react-hook-form";
import { useToaster } from "@/components/providers/ToastifyContext";
import { DeleteWarrantyButton } from "./DeleteButton";
import Link from "next/link";
import { X } from "lucide-react";
import { BackButton } from "@/components";

interface Props {
  warranty: Partial<Warranty>
}

interface FormInputs {
  code: string;
  description: string;
}

export const WarrantyForm = ({ warranty }: Props) => {

  const router = useRouter()
  const { showToast } = useToaster()
  const [formModified, setFormModified] = useState(false);

  const { handleSubmit, register, formState: { errors }, setValue } = useForm<FormInputs>();

  const handleInputChange = () => {
    setFormModified(true);
  };

  useEffect(() => {
    if (warranty.id) {
      setValue('code', `${warranty.code}`)
      setValue('description', `${warranty.description}`)
    }
  }, [warranty, setValue])

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData()

    const { ...warrantyToSave } = data
    if (warranty.id) {
      formData.append('id', warranty.id ?? "")
    }

    formData.append('code', warrantyToSave.code)
    formData.append('description', warrantyToSave.description)

    const { ok, message, warranty: updatedWarranty } = await CreateUpdateWarranty(formData);

    if (!ok) {
      showToast(`La marca no se pudo actualizar ${message}`, {
        type: 'warning',
      })
      return
    }

    showToast(`La garantía fue ${warranty.id ? 'actualizada' : 'creada'} con éxito.`, {
      type: 'success',
    })

    router.replace(`/admin/store/warranties/${updatedWarranty?.code}`)
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
            <label htmlFor="name" className="input-label">Código</label>
            <input
              type="text"
              {...register('code', {
                required: 'El código es un valor requerido',
                minLength: 3
              })}
            />
            {errors.code && (
              <p className="input-error">*{errors.code.message || 'Debe usar mínimo 3 caracteres'}</p>
            )}
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="description" className="input-label">Descripción</label>
            <textarea
              rows={5}
              className="bg-slate-200 outline-none focus:ring-1 p-2 rounded text-sm"
              {...register('description', {
                required: 'La descripción es un valor requerido',
                minLength: 3
              })}
            />
            {errors.description && (
              <p className="input-error">*{errors.description.message || 'Debe usar mínimo 3 caracteres'}</p>
            )}
          </div>

          <button className={`btn-admin w-full h-fit mt-2 ${formModified ? '' : 'opacity-50 pointer-events-none'}`} disabled={!formModified}>
            {warranty.id ? 'Actualizar garantía' : 'Agregar garantía'}
          </button>
          {warranty.id && (
            <DeleteWarrantyButton warrantyId={warranty.id} text />
          )}
        </div>
      </form>
    </div>
  )
}