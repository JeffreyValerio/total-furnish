import { getProductBySlug } from "@/actions";
import { Metadata, ResolvingMetadata } from "next";
import { metadata } from '@/lib/SEO'
import { notFound, redirect } from "next/navigation";
import { ProductMobileSlideshow, ProductSlideshow } from "@/components";
import { ArrowRight, ChevronDown, Hash, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { currencyFormat } from "@/utils";

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const slug = params.slug

  const product = await getProductBySlug(slug)

  return metadata(slug, product)
}

export default async function ProductDetailsPage({ params }: Props) {

  const { slug } = params

  const product = await getProductBySlug(slug)

  if (!product) {
    redirect('/catalogo');
  }

  if (!product) return notFound()

  const priceIncludingTax = (product.price * Number(process.env.NEXT_PUBLIC_TAX_RATE))
  const formattedPrice = currencyFormat(Number(priceIncludingTax));
  const priceParts = formattedPrice.split(',');

  return (
    <div className="max-width py-10">

      <div className="relative grid grid-cols-1 md:grid-cols-2 justify-center">

        <div className="md:sticky top-0 w-full">
          {/* MOBILE SLIDESHOW */}
          <ProductMobileSlideshow
            title={product.name}
            images={product.images}
            className="block md:hidden !mb-6" />
          {/* DESKTOP SLIDESHOW */}
          <ProductSlideshow
            title={product.name}
            images={product.images}
            className="md:block hidden" />
        </div>

        <div className="pb-6 md:py-0 px-6 md:px-20">
          <div className="border-b border-gray-200 pb-6">
            <p className="text-sm leading-none text-gray-600">
              <span className={clsx("font-bold text-blue-700 uppercase", {
                'mr-1': product.name !== 'sin marca'
              })}>
                {/* <Link href={`/catalog/brand/${product.Brand.slug}`}
                  title={`Ver más productos ${product.Brand.name}`}
                  className="text-blue-600 underline">
                  {product.Brand.name !== 'sin marca' ? product.Brand.name : ''}
                </Link> */}
              </span>
              {product.model}
            </p>
            <h1 className="mb-4 lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2 uppercase">{product.name}</h1>

            <div className="flex items-center mt-2.5">
              {/* <StarRating rating={product.rating} /> */}
            </div>
          </div>

          <div>
            {/* <Markdown className="line-clamp-6 markdown lg:leading-tight leading-normal text-gray-600 mt-2">{product.description}</Markdown> */}
            {/* <div className="line-clamp-6 markdown text-base lg:leading-tight leading-normal text-gray-600 mt-2"
              dangerouslySetInnerHTML={{ __html: `${product.description || product.features}` }}></div> */}
            <Link href={`${product.slug}#detalles`}
              className="ml-4 my-2 flex items-center opacity-50 text-gray-900 hover:opacity-100 text-xs leading-none">
              VER MÁS
              <ArrowRight size={18} strokeWidth={1} />
            </Link>
          </div>

          {/* STOCK LABEL */}
          {/* <StockLabel slug={product.slug} /> */}
          <div className="mb-8">
            <strong className="font-bold text-sm">Categoría: </strong>
            <Link href={`/catalog/category/${product.category.slug}`}
              className="text-blue-600 underline uppercase text-sm ml-2 font-bold">
              {product.category.name}
            </Link>
            {product.tags.length > 1 && (
              <div className="mb-4 flex gap-2 flex-wrap text-base leading-4 mt-2 text-gray-600 items-center">
                {product.tags.map((keyword, index) => (
                  <span key={index} className="bg-slate-200 hover:shadow-2xl text-xs px-4 py-1 rounded-full capitalize flex items-center hover:text-blue-700 cursor-pointer">
                    <Hash strokeWidth={1} size={14} />
                    {keyword.trim()}{index !== product.tags.length - 1 ? '' : ''}
                  </span>
                ))}
              </div>
            )}
          </div>
          {product.price !== 0 && (
            <div className="py-4 my-4 border-b border-slate-300 flex items-center justify-between">
              <div className="flex items-baseline">
                <span className="text-xl leading-none align-baseline mr-1">CRC</span>
                <span className="font-bold text-5xl leading-none align-baseline text-slate-800">
                  {Math.floor(priceIncludingTax)
                    .toLocaleString('es-CR', {
                      currency: 'CRC',
                      maximumFractionDigits: 0
                    })}
                </span>
                <span className="text-xl leading-none align-baseline">.{priceParts[1]} ivai</span>
              </div>
            </div>
          )}

          {/* {(product.inStock > 0 && product.price > 0) ? <AddToCart product={product} /> : ( */}
          <div className='w-full flex items-center'>
            <Link
              href={`https://wa.me/50660522398?text=Hola, me interesa comprar el producto: ${product.name} %0A${process.env.NEXT_PUBLIC_URL}/${encodeURIComponent(product.slug)}`} target='_blank'
              className={`btn-primary`}
            >
              {/* <Image className='w-[25px] h-[25px]' src={'/icons/Whatsapp.svg'} width={25} height={25} alt={''} /> */}
              Consultar
            </Link>
          </div>
          {/* )} */}
          <div>
            {/* 
                        <p className="text-base leading-4 mt-4 text-gray-600"><strong>Profundidad:</strong> {product.depth}</p>
                        <p className="text-base leading-4 mt-4 text-gray-600"><strong>Frente:</strong> {product.front}</p>
                        <p className="text-base leading-4 mt-4 text-gray-600"><strong>Altura:</strong> {product.heigth}</p>
                        <p className="md:w-96 text-base leading-normal text-gray-600 mt-4"><strong>Peso:</strong> {product.weigth}</p> 
                        */}
          </div>

          <div className='pt-12 hidden'>
            <div className="border-b py-4 border-gray-200">
              <div data-menu className="flex justify-between items-center cursor-pointer">
                <p className="text-base leading-4 text-gray-800 flex gap-1 items-center">
                  <Shield strokeWidth={1} color='green' /> Garantía de proveedor
                </p>
                <button className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded" aria-label="show or hide">
                  <ChevronDown size={18} color="gray" strokeWidth={1} />
                </button>
              </div>
              {/* <div className="pt-4 text-sm leading-normal pr-12 mt-4 text-gray-600" id="sect">{product.warranty}</div> */}
            </div>
          </div>
        </div>
      </div>
      {/* <pre>
        {JSON.stringify(product, null, 2)}
      </pre> */}
    </div>
  );
}