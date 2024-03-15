'use client'

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
                <div className="hero h-full bg-base-200 !bg-cover !bg-center border grid sm:grid-cols-2"
                  style={{
                    background: "url('/images/hero.png')",
                  }}>
                  <div className='w-full max-width'>
                    <div className="bg-oxfordBlue/40 p-8 text-center rounded-box">
                      <h1 className="text-4xl font-bold">Tendencia 2024</h1>
                      <p className="p-8 text-center text-white">Exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                      <button className="btn-primary">Ver más</button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="hero h-full bg-base-200 !bg-cover !bg-center border grid sm:grid-cols-2"
                  style={{
                    background: "url('/images/hero2.png')",
                  }}>
                  <div className='w-full max-width'>
                    <div className="bg-oxfordBlue/40 p-8 text-center rounded-box">
                      <h1 className="text-4xl font-bold">Tendencia 2024</h1>
                      <p className="p-8 text-center text-white">Exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                      <button className="btn-primary">Ver más</button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

            </Swiper>
          </div>

          <div className="sm:col-start-4 sm:col-end-5">

            <div className="carousel rounded-box h-full">
              <div className="carousel-item w-full">
                <img src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
              </div>
              <div className="carousel-item w-full">
                <img src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
              </div>
              <div className="carousel-item w-full">
                <img src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
              </div>
              <div className="carousel-item w-full">
                <img src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
              </div>
              <div className="carousel-item w-full">
                <img src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
              </div>
              <div className="carousel-item w-full">
                <img src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
              </div>
              <div className="carousel-item w-full">
                <img src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg" className="w-full" alt="Tailwind CSS Carousel component" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}