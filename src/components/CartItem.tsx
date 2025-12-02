import React, { useEffect, useState } from 'react';
import AddToCartBtn from './AddToCartBtn';
import axios from 'axios';
import { IProductItemes } from './ProductComp';
import { ICartItems } from '@/context/ShopCartContext';

export function CartItem({ id, qty }: ICartItems) {
  const [Pdata, setPData] = useState<IProductItemes>({} as IProductItemes);

  useEffect(() => {
    axios.get(`http://localhost:8001/products/${id}`).then((result) => {
      setPData(result.data);
    }).catch(() => {
      console.error("محصول یافت نشد:", id);
    });
  }, [id]);

  // اگه محصول هنوز لود نشده باشه
  if (!Pdata.title) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
        <div className="flex gap-6">
          <div className="bg-gray-200 rounded-xl w-32 h-32" />
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4" />
            <div className="h-5 bg-gray-200 rounded w-1/2" />
            <div className="h-8 bg-gray-200 rounded w-32" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="
      group relative bg-white rounded-2xl overflow-hidden
      shadow-lg hover:shadow-2xl border border-gray-100
      transition-all duration-500 transform hover:-translate-y-2
      mb-6
    ">
      {/* خط گرادیان بالای کارت */}
      <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600" />

      <div className="p-6 flex flex-col md:flex-row gap-6 items-center">

        {/* تصویر محصول */}
        <div className="flex-shrink-0">
          <div className="relative w-32 h-32 md:w-40 md:h-40 bg-gray-50 rounded-2xl overflow-hidden shadow-inner">
            <img
              src={Pdata.image || "/placeholder.jpg"}
              alt={Pdata.title}
              className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>

        {/* اطلاعات محصول */}
        <div className="flex-1 text-right space-y-4">

          {/* عنوان */}
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition line-clamp-2">
            {Pdata.title}
          </h3>

          {/* تعداد و قیمت */}
          <div className="flex flex-wrap items-center justify-between gap-4 text-lg">
            <div className="flex items-center gap-3">
              <span className="text-gray-600">تعداد:</span>
              <span className="font-bold text-2xl text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">
                {qty}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-600">قیمت واحد:</span>
              <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {Number(Pdata.price).toLocaleString()} تومان
              </span>
            </div>
          </div>

          {/* قیمت کل این آیتم */}
          <div className="text-left pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-500">جمع این ردیف:</p>
            <p className="text-2xl font-bold text-green-600">
              {(Number(Pdata.price) * qty).toLocaleString()} تومان
            </p>
          </div>
        </div>

        {/* دکمه‌های کنترل */}
        <div className="flex flex-col gap-3">
          <AddToCartBtn ItemId={id} />
          {/* اگه بخوای بعداً دکمه حذف هم بذاری */}
          {/* <button className="text-red-500 hover:text-red-700 font-medium text-sm">
            حذف از سبد
          </button> */}
        </div>
      </div>

      {/* افکت شناور زیر کارت */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}