'use client'

import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import customers from '@/data/customer.json'
import Image from 'next/image';

export const Customers = () => {
    return (
        <div className='py-20 max-width'>
            <Swiper
                loop
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                slidesPerView={3}
                spaceBetween={30}
                modules={[Autoplay, Pagination, Navigation]}
                breakpoints={{
                    768: {
                        slidesPerView: 4,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 20
                    }
                }}
                className="mySwiper">
                {customers.map((customer, index) => (
                    <SwiperSlide key={index}>
                        <Image src={`${customer.image}`} alt='customer-logo' width={100} height={300}
                            className='grayscale hover:grayscale-0 transition-all ease-in-out duration-1000' />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
