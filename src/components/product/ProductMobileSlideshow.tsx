'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image';

import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

interface Props {
    images: string[],
    title: string,
    className?: string
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {

    return (
        <div className={className}>
            <Swiper
                style={{
                    width: '100vw',
                    height: '400px'
                }}
                pagination={true}
                autoplay={{ delay: 2500 }}
                modules={[FreeMode, Pagination, Thumbs, Autoplay]}
                className=""
            >
                {images.map(image => (
                    <SwiperSlide key={image}>
                        <Image
                            src={image.startsWith('http') ? image : `/images/placeholder.jpg`}
                            fill
                            alt={title}
                            className='max-width'
                        />
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    )
}
