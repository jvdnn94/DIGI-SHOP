"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import ProductCard from "./SliderComp";
import { IProductItemes } from "./ProductComp";
import Link from "next/link";

interface ProductSliderProps {
  products: IProductItemes[];
}

export default function ProductSlider({ products }: ProductSliderProps) {
  return (
    <div className="my-16 -mx-4 md:-mx-8 lg:-mx-12 px-12">
      <Swiper
        loop={true}
        slidesPerView={1}
        spaceBetween={16}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active !bg-gradient-to-r !from-blue-600 !to-purple-600",
        }}
        modules={[Pagination]}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 5 },
          768: { slidesPerView: 1, spaceBetween: 5 },
          1024: { slidesPerView: 2, spaceBetween: 6 },
          1280: { slidesPerView: 3, spaceBetween: 6 },
        }}
        className="w-full h-full"
      >
        {products.slice(0, 6).map((item) => (
          <SwiperSlide key={item.id} className="h-full px-2">
            <Link href={`/store/${item.id}`} className="block h-full">
              <ProductCard
                title={item.title}
                image={item.image}
                price={item.price}
                description={item.description}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}