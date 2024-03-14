'use client'

import React from 'react'

import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export const Hero = () => {
  return (
    <div className='w-full sm:h-screen'>

      <Swiper
        loop
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        spaceBetween={0}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper">

        <SwiperSlide>
          <div className="hero min-h-screen bg-base-200 !bg-cover !bg-center"
            style={{
              background: "url('/images/hero.png')",
            }}>
            <div className='w-full max-width'>
              <h1 className="text-5xl font-bold">Box Office News!</h1>
              <p className="py-6 w-1/4">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
              <button className="btn btn-primary">Catálogo</button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="hero min-h-screen bg-base-200 !bg-cover !bg-center"
            style={{
              background: "url('/images/hero2.png')",
            }}>
            <div className='w-full max-width'>
              <h1 className="text-5xl font-bold">Box Office News!</h1>
              <p className="py-6 w-1/4">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
              <button className="btn btn-primary border-none">Catálogo</button>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>

    </div>
  )
}