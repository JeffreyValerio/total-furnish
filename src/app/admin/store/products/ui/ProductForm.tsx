'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Brand, Category, ProductType, Supplier, Warranty } from "@prisma/client";
import { CreateUpdateProduct, deleteProductImage } from "@/actions";
import { useForm } from "react-hook-form";
import { useToaster } from "@/components/providers/ToastifyContext";
import { DeleteProductButton } from "./DeleteButton";
import { BackButton, ProductImage } from "@/components";
import { IProduct, ProductImage as ProductWithImage } from '@/interfaces/Product.interface'
import { currencyFormat } from "@/utils";
import { Circle, X } from "lucide-react";
import clsx from "clsx";

interface Props {
  product: Partial<IProduct> & { ProductImage?: ProductWithImage[] }
  brands: Brand[]
  categories: Category[]
  suppliers: Supplier[]
  warranties: Warranty[]
}

interface FormData {
  slug: string

  name: string
  model: string
  description: string
  features: string
  advantages: string
  tags: string

  front: number
  depth: number
  height: number
  weight: number

  cost: number
  price: number
  specialPrice: number
  rating: number

  images?: FileList;
  imageUrls?: string;

  type: ProductType;

  brandId: string
  categoryId: string
  supplierId: string
  warrantyId: string
}

export const ProductForm = ({ product, brands, categories, suppliers, warranties }: Props) => {

  const router = useRouter()
  const { showToast } = useToaster()
  const [formModified, setFormModified] = useState(false);
  const [margin, setMargin] = useState(0)
  const [markup, setMarkup] = useState(0)

  const { handleSubmit, register, watch, formState: { errors }, setValue } = useForm<FormData>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      images: undefined,
    }
  });

  const cost = watch("cost");
  const price = watch("price");

  useEffect(() => {
    if (cost && price) {
      const marginValue = ((price - cost) / price) * 100;
      const markupValue = ((price - cost) / cost) * 100

      setMargin(marginValue);
      setMarkup(markupValue);
    }
  }, [cost, price]);

  useEffect(() => {
    if (product.id) {
      setValue('name', `${product.name}`)
      setValue('slug', `${product.slug}`)
      setValue('model', `${product.model}`)
      setValue('description', `${product.description}`)
      setValue('features', `${product.features}`)
      setValue('advantages', `${product.advantages}`)

      setValue("front", Number(product.front))
      setValue("depth", Number(product.depth))
      setValue("height", Number(product.height))
      setValue("weight", Number(product.weight))

      setValue("cost", Number(product.cost))
      setValue("price", Number(product.price))
      setValue("specialPrice", Number(product.specialPrice))
      setValue("rating", Number(product.rating))

      setValue('brandId', `${product.brandId}`)
      setValue('categoryId', `${product.categoryId}`)
      setValue('supplierId', `${product.supplierId}`)
      setValue('warrantyId', `${product.warrantyId}`)
      // setValue('type', `${product.type.}`)
    }
  }, [product, setValue])

  const onSubmit = async (data: FormData) => {

    console.log(data)
    const formData = new FormData()

    const { images, imageUrls, ...productToSave } = data;

    if (product.id) {
      formData.append('id', product.id ?? "")
    }

    formData.append('slug', productToSave.slug)

    formData.append('name', productToSave.name)
    formData.append('model', productToSave.model)
    formData.append('description', productToSave.description)
    formData.append('features', productToSave.features)
    formData.append('advantages', productToSave.advantages)
    formData.append("tags", productToSave.tags)

    formData.append("front", `${productToSave.front}`);
    formData.append("depth", `${productToSave.depth}`);
    formData.append("height", `${productToSave.height}`);
    formData.append("weight", `${productToSave.weight}`);

    formData.append("cost", `${productToSave.cost}`);
    formData.append("price", `${productToSave.price}`);
    formData.append("specialPrice", `${productToSave.specialPrice}`);
    formData.append("rating", `${productToSave.rating}`);

    formData.append('type', productToSave.type)
    formData.append('brandId', productToSave.brandId)
    formData.append("categoryId", productToSave.categoryId)
    formData.append('supplierId', productToSave.supplierId)
    formData.append('warrantyId', productToSave.warrantyId)

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    if (imageUrls) {
      const urls = imageUrls.split('\n').filter(url => url.trim() !== '');
      for (let i = 0; i < urls.length; i++) {
        formData.append('imageUrls', urls[i]);
      }
    }

    const { ok, message, product: updatedProduct } = await CreateUpdateProduct(formData)

    if (!ok) {
      showToast(`El producto no se pudo actualizar ${message}`, {
        type: 'warning',
      })
      return
    } else {
      showToast(`El producto fue ${product.id ? 'actualizado' : 'creado'} con éxito.`, {
        type: 'success',
      })
    }

    router.replace(`/admin/store/products/${updatedProduct?.slug}`)
    setFormModified(false);
  }

  return (
    <div className="form-container px-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => setFormModified(true)}>
        <div className="flex flex-col mb-2 relative">
          <BackButton />
        </div>

        <div className="grid grid-cols-4 gap-x-4">
          {/* FIRST COLUMN */}
          <div>
            <div className="flex flex-col mb-2 relative">
              <label htmlFor="name" className="input-label">Nombre</label>
              <textarea
                rows={3}
                className="h-fit"
                {...register('name', {
                  required: 'El nombre es un valor requerido',
                  minLength: 3
                })}
              />
              {errors.name && (
                <p className="input-error">*{errors.name.message || 'Debe usar mínimo 3 caracteres'}</p>
              )}
            </div>

            <div className="flex flex-col mb-2 relative">
              <label htmlFor="model" className="input-label">Modelo</label>
              <input
                type="text"
                {...register('model', {
                  required: 'El modelo es un valor requerido',
                  minLength: 3
                })}
              />
              {errors.name && (
                <p className="input-error">*{errors.name.message || 'Debe usar mínimo 3 caracteres'}</p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-col mb-2 relative">
              <label htmlFor="description" className="input-label">Descripción</label>
              <textarea
                rows={4}
                className="h-fit"
                {...register('description', {
                  required: 'La descripción es un valor requerido',
                  minLength: 3
                })}
              />
              {errors.name && (
                <p className="input-error">*{errors.name.message || 'Debe usar mínimo 3 caracteres'}</p>
              )}
            </div>

            {/* FEATURES */}
            <div className="flex flex-col mb-2 relative">
              <label htmlFor="features" className="input-label">Características</label>
              <textarea
                rows={4}
                className="h-fit"
                {...register('features', {
                  required: 'La descripción es un valor requerido',
                  minLength: 3
                })}
              />
              {errors.name && (
                <p className="input-error">*{errors.name.message || 'Debe usar mínimo 3 caracteres'}</p>
              )}
            </div>

            {/* ADVANTAGES */}
            <div className="flex flex-col mb-2 relative">
              <label htmlFor="advantages" className="input-label">Ventajas</label>
              <textarea
                rows={4}
                className="h-fit"
                {...register('advantages', {
                  required: 'La descripción es un valor requerido',
                  minLength: 3
                })}
              />
              {errors.name && (
                <p className="input-error">*{errors.name.message || 'Debe usar mínimo 3 caracteres'}</p>
              )}
            </div>

            {/* TAGS */}
            <div className="flex flex-col mb-2">
              <label htmlFor='tags' className='input-label'>Palabras clave</label>
              <input
                type="text"
                {...register("tags")}
                placeholder="keyword-one, keyword-two"
              />
            </div>

          </div>

          {/* SECOND COLUMN */}
          <div>
            <div className="flex flex-col mb-2">
              <label htmlFor='brandId' className='input-label'>Marca</label>
              <select
                className="bg-slate-200 outline-none focus:ring-1 p-2 rounded text-sm"
                {...register("brandId", { required: true })}
              >
                <option value="">[Seleccione]</option>
                {brands?.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor='categoryId' className='input-label'>Categoría</label>
              <select
                className="bg-slate-200 outline-none focus:ring-1 p-2 rounded text-sm"
                {...register("categoryId", { required: true })}
              >
                <option value="">[Seleccione]</option>
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor='warrantyId' className='input-label'>Garantía</label>
              <select
                className="bg-slate-200 outline-none focus:ring-1 p-2 rounded text-sm"
                {...register("warrantyId", { required: true })}
              >
                <option value="">[Seleccione]</option>
                {warranties?.map((warranty) => (
                  <option key={warranty.id} value={warranty.id}>
                    {warranty.code}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor='supplierId' className='input-label'>Proveedor</label>
              <select
                className="bg-slate-200 outline-none focus:ring-1 p-2 rounded text-sm"
                {...register("supplierId", { required: true })}
              >
                <option value="">[Seleccione]</option>
                {suppliers?.map((supplier: Supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col mb-2">

              <label htmlFor='type' className='input-label'>Tipo</label>

              <select
                className="bg-slate-200 outline-none focus:ring-1 p-2 rounded text-sm"
                {...register("type", { required: true })}
              >
                <option value="GENERAL">GENERAL</option>
                <option value="BESTSELLER">BESTSELLER</option>
                <option value="FEATURE">FEATURE</option>
                <option value="TRENDING">TRENDING</option>
              </select>
            </div>
          </div>

          {/* THRID COLUMN */}
          <div>
            <div className="flex flex-col mb-2">
              <label htmlFor='cost' className='input-label'>Costo</label>
              <input
                type="number"
                step={0.01}
                min={0}
                {...register("cost", { required: true, min: 0 })}
              />
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor='price' className='input-label'>Precio <small>Recom: ({currencyFormat(cost / (1 - 0.30))})</small></label>
              <input
                type="number"
                step={0.01}
                min={0}
                {...register("price", { required: true, min: 0 })}
              />
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor='specialPrice' className='input-label'>Precio especial</label>
              <input
                type="number"
                step={0.01}
                min={0}
                {...register("specialPrice", { required: true, min: 0 })}
              />
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor='rating' className='input-label'>Rating</label>
              <input
                type="number"
                step={0.1}
                min={0}
                max={5}
                {...register("rating", { required: true, min: 0 })}
              />
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor='front' className='input-label'>Frente</label>
              <input
                type="number"
                min={0}
                {...register("front", { required: true, min: 0 })}
              />
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor='depth' className='input-label'>Profundidad</label>
              <input
                type="number"
                min={0}
                {...register("depth", { required: true, min: 0 })}
              />
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor='height' className='input-label'>Altura</label>
              <input
                type="number"
                min={0}
                {...register("height", { required: true, min: 0 })}
              />
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor='weight' className='input-label'>Peso</label>
              <input
                type="number"
                min={0}
                {...register("weight", { required: true, min: 0 })}
              />
            </div>
          </div>

          <div>
            <div className="flex flex-col mb-2">
              <label htmlFor='images' className='input-label'>Imágenes</label>
              <input
                multiple
                type="file"
                {...register('images')}
                className="p-2 border rounded-md"
                accept="image/png, image/jpeg, image/avif, image/webp"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {product.ProductImage?.map((image: any) => (
                <div key={image.id}>
                  <ProductImage
                    alt={product.name ?? ""}
                    src={image.url}
                    width={300}
                    height={300}
                    className="bg-slate-300 rounded-t-md h-[50px] bg-cover"
                  />

                  <button
                    type="button"
                    onClick={() => deleteProductImage(image.id, image.url)}
                    className="btn-delete rounded-b-md"
                  >
                    <X className="flex-shrink-0" size={24} strokeWidth={1} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex flex-col mb-2 mt-2">
              <label htmlFor='imageUrls' className='input-label'>URLs de imágenes</label>
              <textarea
                {...register('imageUrls')}
                rows={4}
                placeholder="Ingrese una por línea"
              />
            </div>

            <div className="mt-6 mockup-code !min-w-full text-sm">
              <pre data-prefix=">"
                className={clsx("text-success", {
                  "!text-warning": parseFloat(margin.toFixed(2)) < 40.00,
                  "!text-red-600": parseFloat(margin.toFixed(2)) < 30.00
                })}>
                <code>(% {margin.toFixed(2)}) <span className="font-bold">Margen bruto</span> </code>
              </pre>
              <pre 
              data-prefix=">"
                className={clsx("text-success", {
                  "!text-warning": parseFloat(markup.toFixed(2)) < 66.65,
                  "!text-red-600": parseFloat(markup.toFixed(2)) < 42.86
                })}>
                <code>(% {markup.toFixed(2)}) <span className="font-bold">Markup</span> </code>
              </pre>

              <hr className="my-4" />

              <div>
                <pre className="rounded flex justify-between text-xs">
                  <code className="flex items-center gap-x-1"> <Circle className="bg-red-600 rounded-full text-red-600" size={12} strokeWidth={1} />Bad</code>
                  <code className="flex items-center gap-x-1"> <Circle className="bg-warning rounded-full text-warning" size={12} strokeWidth={1} />Good</code>
                  <code className="flex items-center gap-x-1"> <Circle className="bg-success rounded-full text-success" size={12} strokeWidth={1} />Excellent</code>
                </pre>
              </div>

            </div>

          </div>
        </div>

        <div className="flex gap-x-2 mt-6">
          <button className={`btn-admin w-full h-fit text-sm ${formModified ? '' : 'opacity-50 pointer-events-none'}`} disabled={!formModified}>
            {product.id ? 'Actualizar producto' : 'Agregar producto'}
          </button>

          {product.id && (
            <DeleteProductButton productId={product.id} text />
          )}
        </div>
      </form>
    </div>
  )
} 