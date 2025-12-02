// components/DashboardEditModal.tsx
import React from "react";
import { IProduct } from "@/context/ShopCartContext";

const categories = [
  { value: "electronics", label: "الکترونیک" },
  { value: "jewelery", label: "جواهرات" },
  { value: "men's clothing", label: "پوشاک مردانه" },
  { value: "women's clothing", label: "پوشاک زنانه" },
  { value: "other", label: "سایر" },
];

interface Props {
  product: IProduct;
  onClose: () => void;
  onSave: () => void;
  onChange: (product: IProduct) => void;
}

export default function DashboardEditModal({ product, onClose, onSave, onChange }: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-amber-200 w-full max-w-2xl p-10">
        <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-amber-600 to-emerald-600 bg-clip-text text-transparent">
          ویرایش محصول
        </h2>

        <div className="space-y-6">
          <input className="w-full p-4 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none transition-all text-lg"
            value={product.title}
            onChange={(e) => onChange({ ...product, title: e.target.value })}
            placeholder="عنوان محصول" />

          <input className="w-full p-4 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none transition-all"
            value={product.image}
            onChange={(e) => onChange({ ...product, image: e.target.value })}
            placeholder="لینک تصویر" />

          <input className="w-full p-4 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none transition-all"
            value={String(product.price)}
            onChange={(e) => onChange({ ...product, price: Number(e.target.value) || 0 })}
            placeholder="قیمت (تومان)" />

          {/* سلکت دسته‌بندی در ویرایش */}
          <select
            value={product.category}
            onChange={(e) => onChange({ ...product, category: e.target.value })}
            className="w-full p-4 rounded-xl border border-amber-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all bg-white text-lg"
          >
            <option value="">دسته‌بندی را انتخاب کنید</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>

          <textarea className="w-full p-4 rounded-xl border border-amber-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none transition-all resize-none" rows={5}
            value={product.description}
            onChange={(e) => onChange({ ...product, description: e.target.value })}
            placeholder="توضیحات کامل محصول..." />
        </div>

        <div className="flex gap-6 mt-10 justify-center">
          <button onClick={onClose}
            className="px-12 py-4 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-xl transition-all transform hover:scale-105">
            انصراف
          </button>
          <button onClick={onSave}
            className="px-12 py-4 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            ذخیره تغییرات
          </button>
        </div>
      </div>
    </div>
  );
}