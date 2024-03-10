'use client'

import Image from 'next/image'
import React from 'react'
import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export const Hero = () => {
  return (
    <div className='w-full sm:h-screen overflow-hidden'>

      <Swiper
        loop
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper">
        <SwiperSlide>
          <Image src={'/images/hero.png'} className='object-cover w-full h-screen' alt='hero' width={2000} height={800} />
        </SwiperSlide>
        <SwiperSlide>
          <Image src={'/images/hero2.png'} className='object-cover w-full h-screen' alt='hero' width={2000} height={800} />
        </SwiperSlide>
      </Swiper>

    </div>
  )
} 