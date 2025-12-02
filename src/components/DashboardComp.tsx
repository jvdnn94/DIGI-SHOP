// components/DashboardProductCard.tsx
import React from "react";
import { IProduct } from "@/context/ShopCartContext";
import { CategoryFa } from "@/constants/CategoryFa";

interface Props {
  product: IProduct;
  onEdit: (product: IProduct) => void;
  onDelete: (id: string | number) => void;
}

export default function DashboardProductCard({ product, onEdit, onDelete }: Props) {
  return (
    <div className="group bg-white rounded-2xl shadow hover:shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:border-gray-200 hover:-translate-y-1">
      {/* تصویر محصول */}
      <div className="p-6 bg-gray-50/50 border-b border-gray-100">
        <img
          src={product.image}
          alt
          alt={product.title}
          className="h-52 w-full object-contain mx-auto group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* محتوا */}
      <div className="p-6 space-y-4">
        {/* عنوان */}
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 leading-relaxed">
          {product.title}
        </h3>

        {/* توضیحات */}
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
          {product.description || "توضیحاتی برای این محصول ثبت نشده است."}
        </p>

        {/* دسته‌بندی */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500">دسته:</span>
          <span className="font-medium text-gray-700">
            {CategoryFa[product.category] || "نامشخص"}
          </span>
        </div>

        {/* قیمت و ID */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-2xl font-bold text-gray-900">
            {Number(product.price).toLocaleString()} تومان
          </span>
          <span className="text-xs text-gray-400">ID: {product.id}</span>
        </div>
      </div>

      <div className="px-6 pb-6 pt-3 flex gap-3">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-all duration-200"
        >
          ویرایش
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="flex-1 px-5 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-all duration-200"
        >
          حذف
        </button>
      </div>
    </div>
  );
}