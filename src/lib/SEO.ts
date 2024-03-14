import { IProduct } from "@/interfaces";
import { currencyFormat } from "@/utils";

export const metadata = (canonical: string, product?: Partial<IProduct | null>) => {
    const keywordsArray = product?.tags?.join(',')
    const metadata = {
        metadataBase: new URL('https://total-furnish.com'),
        alternates: {
            canonical: canonical,
        },
        title: `▷ ${product?.title ? product?.title.toUpperCase() : 'Página principal'}` || 'Total Furnish',
        description: product?.description || product?.features || '¡Una tienda virtual para tu proyecto real!',
        keywords: keywordsArray,
        category: product?.category?.name || '',
        openGraph: {
            title: `▷ ${product?.title ? product?.title.toUpperCase() : 'Página principal'}` || 'Total Furnish',
            description: product?.description || product?.features || '¡Una tienda virtual para tu proyecto real!',
            images: [product?.images[0]],
            siteName: 'Total Furnish',
            type: 'website',
            emails: 'ventas@total-furnish.com',
            phoneNumbers: '(506) 60522398',
            url: product?.slug || 'https://total-furnish.com',
        },
        twitter: {
            card: 'summary_large_image',
            title: `▷ ${product?.title ? product?.title.toUpperCase() : 'Página principal'} | Total Furnish` || 'Total Furnish',
            description: product?.description || '¡Una tienda virtual para tu proyecto real!',
            creator: 'Total Furnish',
            images: [product?.images[0]],
        },
        formatDetection: {
            url: true,
            email: false,
            address: false,
            telephone: false,
        },
        robots: {
            index: true,
            follow: true,
            nocache: true,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: false,
                'max-video-preview': -1,
                // 'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        icons: {
            icon: '/favicon.ico',
            shortcut: '/favicon.ico',
            apple: '/favicon.ico',
            other: {
                rel: 'favicon',
                url: '/favicon.ico',
            },
        },
        other: {
            price: currencyFormat((Number(product?.price)) * 1.13) || '',
            rating: product?.rating || 5
        },
    };

    return metadata;
}