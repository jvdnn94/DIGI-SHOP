// components/DashboardCreateForm.tsx
import React, { ChangeEvent } from "react";

const categories = [
  { value: "electronics", label: "الکترونیک" },
  { value: "jewelery", label: "جواهرات" },
  { value: "men's clothing", label: "پوشاک مردانه" },
  { value: "women's clothing", label: "پوشاک زنانه" },
  { value: "other", label: "سایر" },
];

interface NewProduct {
  title: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

interface Props {
  newProduct: NewProduct;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCreate: () => void;
  onRefresh: () => void;
}

export default function DashboardCreateForm({ newProduct, onChange, onCreate, onRefresh }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-8 mb-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        ایجاد محصول جدید
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        <input
          name="title"
          value={newProduct.title}
          onChange={onChange}
          required
          className="p-4 rounded-xl border border-gray-200 focus:border-gray-400 focus:ring-4 focus:ring-gray-100 transition-all outline-none"
          placeholder="عنوان محصول *"
        />

        <input
          name="image"
          value={newProduct.image}
          onChange={onChange}
          className="p-4 rounded-xl border border-gray-200 focus:border-gray-400 focus:ring-4 focus:ring-gray-100 transition-all outline-none"
          placeholder="لینک تصویر (اختیاری)"
        />

        <input
          name="price"
          value={newProduct.price}
          onChange={onChange}
          required
          type="number"
          className="p-4 rounded-xl border border-gray-200 focus:border-gray-400 focus:ring-4 focus:ring-gray-100 transition-all outline-none"
          placeholder="قیمت (تومان) *"
        />

        <select
          name="category"
          value={newProduct.category}
          onChange={onChange}
          className="p-4 rounded-xl border border-gray-200 focus:border-gray-400 focus:ring-4 focus:ring-gray-100 outline-none transition-all bg-white"
        >
          <option value="">دسته‌بندی را انتخاب کنید</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <textarea
        name="description"
        value={newProduct.description}
        onChange={onChange}
        className="w-full p-4 rounded-xl border border-gray-200 focus:border-gray-400 focus:ring-4 focus:ring-gray-100 transition-all outline-none resize-none"
        placeholder="توضیحات کامل محصول..."
        rows={4}
      />

      <div className="flex gap-4 mt-6">
        <button
          onClick={onCreate}
          className="px-10 py-4 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl transition-all"
        >
          افزودن محصول
        </button>
        <button
          onClick={onRefresh}
          className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-xl transition-all"
        >
          تازه‌سازی لیست
        </button>
      </div>
    </div>
  );
}