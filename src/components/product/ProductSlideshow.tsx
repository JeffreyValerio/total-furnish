'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image';

import { Swiper as SwiperObject } from 'swiper'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useState } from 'react';

interface Props {
    images: string[], 
    title: string,
    className?: string
}

export const ProductSlideshow = ({ images, title, className }: Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

    return (
        <div className={className}>
            <Swiper
                style={{
                    height: '500px',
                    borderRadius: '1rem',
                    '--swiper-navigation-color': '#ccc',
                    '--swiper-pagination-color': '#ccc',
                } as React.CSSProperties}
                spaceBetween={10}
                navigation={true}
                autoplay={{ delay: 3500 }}
                thumbs={{
                    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            >
                {images.map(image => (
                    <SwiperSlide key={image}>
                        <Image
                            className='!bg-cover rounded-2xl border border-500-red '
                            src={image.startsWith('http') ? image : `/images/placeholder.jpg`}
                            fill
                            quality={25}
                            alt={title} />
                    </SwiperSlide>
                ))} 
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper !h-[180px] !py-3"
            >
                {images.map(image => (
                    <SwiperSlide key={image} className='!h-24 hover:shadow-md hover:drop-shadow-md bg-slate-100 rounded-2xl'>
                        <Image className='rounded-md !h-24'
                            src={image.startsWith('http') ? image : `/images/placeholder.jpg`}
                            width={200}
                            height={200}
                            alt={title}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}