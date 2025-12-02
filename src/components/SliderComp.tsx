"use client";

import { IProductItemes } from "./ProductComp";

export default function ProductCard({
  title,
  image,
  price,
  description,
}: IProductItemes) {
  return (
    <div className="
      group relative h-full flex flex-col
      bg-white rounded-2xl overflow-hidden
      border border-gray-200/70 ring-1 ring-black/5
      shadow-xl hover:shadow-2xl
      transition-all duration-500 transform hover:-translate-y-4
    ">
      {/* تصویر — ارتفاع کاملاً ثابت */}
      <div className="relative w-full h-64 md:h-80 bg-gradient-to-b from-gray-50 to-gray-100">
        <img
          src={image || "https://via.placeholder.com/600x600/f8fafc/6366f1?text=محصول+جدید"}
          alt={title}
          className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-110 p-6"
        />
      </div>

      <div className="p-6 flex flex-col justify-between flex-1 min-h-56">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 h-16">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
          <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {Number(price).toLocaleString()} تومان
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-purple-500/50 transition transform hover:scale-105 whitespace-nowrap">
            افزودن به سبد
          </button>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}