'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Category } from "@prisma/client";
import { CreateUpdateCategory, getPaginatedCategories } from "@/actions";
import { useForm } from "react-hook-form";
import { useToaster } from "@/components/providers/ToastifyContext";
import Link from "next/link";
import { X } from "lucide-react";
import { BackButton } from "@/components";

interface Props {
    category: Partial<Category>
}

interface FormInputs {
    name: string;
    image: string;
    slug: string;
    parentId?: string;
}

export const CategoryForm = ({ category }: Props) => {

    const router = useRouter()
    const { showToast } = useToaster()
    const [categories, setCategories] = useState<Category[]>([])
    const [formModified, setFormModified] = useState(false);
    const [checked, setChecked] = useState(true)

    const { handleSubmit, register, formState: { errors }, setValue } = useForm<FormInputs>();

    const getCategories = async () => {
        const take = 200
        const { categoriesWithParent } = await getPaginatedCategories({ take })
        setCategories(categoriesWithParent)
    }

    const handleInputChange = () => {
        setFormModified(true);
    };
    const handleCheckbox = (e: any) => {
        setChecked(e.target.checked)
    }

    useEffect(() => {
        getCategories()
        if (category.id) {
            setChecked(category.parentId === undefined || category.parentId === null);
            setValue('name', `${category.name}`)
            setValue('slug', `${category.slug}`)
            setValue('image', `${category.image}`)
            setValue('parentId', `${category.parentId}`)
        }
    }, [category, setValue])

    const onSubmit = async (data: FormInputs) => {
        const formData = new FormData()

        const { ...categoryToSave } = data
        if (category.id) {
            formData.append('id', category.id ?? "")
        }

        formData.append('name', categoryToSave.name)
        formData.append('slug', categoryToSave.slug)
        const imageFiles = Array.from(categoryToSave.image);
        imageFiles.forEach((file) => {
            formData.append('image', file);
        });

        if (categoryToSave.parentId !== undefined) {
            formData.append("parentId", categoryToSave.parentId);
        }

        const { ok, message, category: updatedCategory } = await CreateUpdateCategory(formData);

        if (!ok) {
            showToast(`La categoría no se pudo actualizar ${message}`, {
                type: 'warning',
            })
            return
        }

        showToast(`La categoría fue ${category.id ? 'actualizada' : 'creada'} con éxito.`, {
            type: 'success',
        })

        router.replace(`/admin/store/categories/${updatedCategory?.slug}`)
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
                                required: 'El nombre es un valor requerido',
                                minLength: 3
                            })}
                        />
                        {errors.name && (
                            <p className="input-error">*{errors.name.message || 'Debe usar mínimo 3 caracteres'}</p>
                        )}
                    </div>

                    {category.id && (
                        <div className="flex flex-col mb-2">
                            <label htmlFor="slug" className="input-label">Slug</label>
                            <input type="text"
                                readOnly
                                disabled
                                placeholder="auto-generado-con-el-nombre"
                                title={category.slug}
                                className="not-allowed"
                                {...register('slug')} />
                        </div>
                    )}

                    <div className="flex flex-col mb-2">
                        <label htmlFor="image" className="input-label">
                            Imagen
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            {...register('image', { required: checked ? true : false })}
                            {...register('image')}
                        />
                        {errors.image && (
                            <p className="input-error">*Por favor, seleccione una imagen.</p>
                        )}
                        {category.image && (
                            <Image
                                src={
                                    category.image
                                        ? (category.image.startsWith('http') ? category.image : `/images/${category.image}`)
                                        : '/images/placeholder.jpg'
                                }
                                width={300}
                                height={300}
                                alt={`${category.name}`}
                                className="mt-2 w-full h-[100px] object-scale-down rounded"
                            />
                        )}
                    </div>
                    <div className="flex items-center gap-2 my-4">
                        <input type="checkbox" checked={checked} onChange={handleCheckbox} />
                        <span className='input-label !mb-0'>Categoría principal</span>
                    </div>

                    {!checked && (
                        <>
                            {categories.length > 0 && (
                                <>
                                    <label htmlFor='parentId' className='input-label'>
                                        Categoría Padre
                                    </label>
                                    <select
                                        {...register('parentId')}
                                        className='p-2 rounded block bg-slate-200 w-full'
                                    >
                                        <option value={""}>--- Seleccione ---</option>
                                        {categories?.map((category: Category) => (
                                            <option key={category.id} value={category.id}>
                                                <>{category.name} - {category.parentId ? '[SUB]' : '[CAT]'} </>
                                            </option>
                                        ))}
                                    </select>
                                </>
                            )}
                        </>
                    )}

                    <button className={`btn-admin w-full h-fit mt-2 ${formModified ? '' : 'opacity-50 pointer-events-none'}`} disabled={!formModified}>
                        {category.id ? 'Actualizar categoría' : 'Agregar categoría'}
                    </button>
                </div>
            </form>
        </div>
    )
}