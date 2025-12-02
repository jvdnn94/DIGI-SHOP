// components/CategoryFilter.tsx
"use client";

import { CategoryFa } from '@/constants/CategoryFa';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || '';
  const currentTitle = searchParams.get('title') || '';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (currentTitle) params.set('title', currentTitle);
    router.push(`/store?${params.toString()}`);
  };

  return (

    <>
 
        <select
      name="category"
      value={currentCategory}
      onChange={handleChange}
      className="p-2 border rounded-lg bg-white shadow"
    >
      <option value="">همه محصولات</option>
      {Object.keys(CategoryFa).map((key) => (
        <option key={key} value={key}>
          {CategoryFa[key]}
        </option>
      ))}
    </select>
   
    </>
  );
}
