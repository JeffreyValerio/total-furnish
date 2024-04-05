'use client'

import Image from 'next/image';
import React from 'react'

import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export const Hero = () => {
  return (
    <>
      <div className='max-width rounded-box my-8'>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 h-full">
          <div className="hidden sm:flex carousel rounded-2xl sm:col-start-1 sm:col-end-4  h-full">
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
                <div className="hero h-full w-full bg-base-200 !bg-cover !bg-center grid sm:grid-cols-2"
                  style={{
                    background: "url('/images/hero-1.png')",
                  }}>
                  <div className='w-full max-width'>
                    <div className="bg-slate-100/70 !border-none p-8 text-center rounded-box">
                      <h1 className="text-4xl font-bold">Tendencia 2024</h1>
                      <p className="p-8 text-center font-medium">Diseña el espacio perfecto para tu hogar con muebles de calidad y con el mejor estilo.</p>
                      <button className="btn-primary">Ver más</button>
                    </div>
                  </div>
                </div> 
              </SwiperSlide> 

              <SwiperSlide>
                <div className="hero h-full w-full bg-base-200 !bg-cover !bg-center grid sm:grid-cols-2"
                  style={{
                    background: "url('/images/hero-2.png')",
                  }}>
                  <div className='w-full max-width'>
                    <div className="bg-slate-100/70 p-8 text-center rounded-box">
                      <h1 className="text-4xl font-bold">Tendencia 2024</h1>
                      <p className="p-8 text-center font-medium">Renueva tu cocina con muebles que deslumbran, el espacio que te mereces</p>
                      <button className="btn-primary">Ver más</button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

            </Swiper>
          </div>

          <div className="sm:col-start-4 sm:col-end-5 !h-full">
            <Swiper
              loop
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              spaceBetween={0}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper">

              <SwiperSlide>
                <div className="rounded-box bg-slate-200">
                  <Image
                    className="w-full border rounded-box"
                    src="/images/hero-aside-1.png"
                    alt="hero-aside-1"
                    height={480}
                    width={400}
                  />
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="rounded-box bg-slate-200">
                  <Image
                    className="w-full border rounded-box"
                    src="/images/hero-aside-2.png"
                    alt="hero-aside-1"
                    height={480}
                    width={400}
                  />
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="rounded-box bg-slate-200">
                  <Image
                    className="w-full border rounded-box"
                    src="/images/hero-aside-3.png"
                    alt="hero-aside-1"
                    height={480}
                    width={400}
                  />
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="rounded-box bg-slate-200">
                  <Image
                    className="w-full border rounded-box"
                    src="/images/hero-aside-4.png"
                    alt="hero-aside-1"
                    height={480}
                    width={400}
                  />
                </div>
              </SwiperSlide>

            </Swiper>
          </div>
        </div>
      </div>
    </>
  )
}