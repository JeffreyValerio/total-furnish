'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CreateUpdateBrand } from "@/actions";
import { DeleteBrandButton } from "./DeleteButton";
import { useForm } from "react-hook-form";
import { useToaster } from "@/components/providers/ToastifyContext";
import { X } from "lucide-react";
import Link from "next/link";
import { Brand } from "@prisma/client";
import { BackButton } from "@/components";

interface Props {
  brand: Partial<Brand>
}

interface FormData {
  name: string;
  image: string;
  slug: string;
}

export const BrandForm = ({ brand }: Props) => {

  const router = useRouter()
  const { showToast } = useToaster()
  const [formModified, setFormModified] = useState(false);

  const { handleSubmit, register, formState: { errors }, setValue } = useForm<FormData>();

  const handleInputChange = () => {
    setFormModified(true);
  };

  useEffect(() => {
    if (brand.id) {
      setValue('name', `${brand.name}`)
      setValue('slug', `${brand.slug}`)
      setValue('image', `${brand.image}`)
    }
  }, [brand, setValue])

  const onSubmit = async (data: FormData) => {
    const formData = new FormData()

    const { ...brandToSave } = data
    if (brand.id) {
      formData.append('id', brand.id ?? "")
    }

    formData.append('name', brandToSave.name)
    formData.append('slug', brandToSave.slug)
    const imageFiles = Array.from(brandToSave.image);
    imageFiles.forEach((file) => {
      formData.append('image', file);
    });

    const { ok, message, product: updatedBrand } = await CreateUpdateBrand(formData);

    if (!ok) {
      showToast(`La marca no se pudo actualizar ${message}`, {
        type: 'warning',
      })
      return
    } else {
      showToast(`La marca fue ${brand.id ? 'actualizada' : 'creada'} con éxito.`, {
        type: 'success',
      })
    }

    router.replace(`/admin/store/brands/${updatedBrand?.slug}`)
    setFormModified(false);
  }

  return (
    <div className="form-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={handleInputChange}>
        <div className="flex flex-col mb-2 relative">

          <BackButton />

          <label htmlFor="name" className="input-label">Nombre</label>
          <input
            type="text"
            {...register('name', {
              required: 'El nombre es un valor requerido',
              minLength: 3
            })}
          />
          {errors.name && (
            <p className="input-error">*{errors.name.message || 'Debe usar mínimo 3 caracteres'}</p>
          )}
        </div>

        <div className="flex flex-col mb-2">
          <label htmlFor="image" className="input-label">
            Imagen
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            {...register('image', {
              required: brand.id ? false : true,
            })}
          />
          {errors.image && (
            <p className="input-error">*Por favor, seleccione una imagen.</p>
          )}
          {brand.image && (
            <Image
              src={brand.image?.startsWith('http') ? brand.image : `/images/${brand.image}`}
              width={300}
              height={300}
              alt={`${brand.name}`}
              className="mt-2 w-full h-[100px] object-scale-down rounded"
            />
          )}
        </div>

        <div className="flex gap-x-2 mt-6">
          <button className={`btn-admin w-full h-fit text-sm ${formModified ? '' : 'opacity-50 pointer-events-none'}`} disabled={!formModified}>
            {brand.id ? 'Actualizar' : 'Agregar'}
          </button>

          {brand.id && (
            <DeleteBrandButton brandId={brand.id} text />
          )}
        </div>
      </form>
    </div>
  )
}