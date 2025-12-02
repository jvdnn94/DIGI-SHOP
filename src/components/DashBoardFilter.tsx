// components/DashboardFilter.tsx
import React from "react";

interface Props {
  filter: string;
  onFilterChange: (value: string) => void;
}

export default function DashboardFilter({ filter, onFilterChange }: Props) {
  return (
    <div className="bg-white/90 backdrop-blur-sm border border-amber-100 rounded-2xl shadow-xl p-6 flex flex-wrap items-center gap-6">
      <span className="font-bold text-gray-800 text-lg">فیلتر دسته‌بندی:</span>
      <select value={filter} onChange={(e) => onFilterChange(e.target.value)}
        className="p-4 rounded-xl border border-amber-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all text-lg min-w-64">
        <option value="all">همه محصولات</option>
        <option value="electronics">الکترونیک</option>
        <option value="jewelery">جواهرات</option>
        <option value="men's clothing">پوشاک مردانه</option>
        <option value="women's clothing">پوشاک زنانه</option>
        <option value="other">سایر</option>
      </select>
    </div>
  );
}