"use client";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function SearchComp() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    // دریافت مقدار q از URL
    setSearchWord(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = () => {
    const trimmed = searchWord.trim();
    
    // ساخت URLSearchParams جدید با حفظ پارامترهای قبلی
    const params = new URLSearchParams();
    
    // اضافه کردن category اگر وجود داشته باشد
    const currentCategory = searchParams.get("category");
    if (currentCategory) {
      params.set("category", currentCategory);
    }
    
    // اضافه کردن q اگر مقدار داشته باشد
    if (trimmed) {
      params.set("q", trimmed);
    }

    // ساخت URL نهایی
    const newUrl = params.toString() ? `/store?${params.toString()}` : "/store";
    
    console.log("🔍 Searching for:", trimmed);
    console.log("🌐 New URL:", newUrl);
    console.log("📝 Encoded:", encodeURIComponent(trimmed));
    
    router.push(newUrl);
  };

  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl shadow-sm border border-gray-200 focus-within:border-amber-400 transition-all w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="جستجو در محصولات..."
        className="flex-1 py-4 bg-transparent outline-none text-right font-medium placeholder:text-gray-400"
      />
      <button
        onClick={handleSearch}
        className="bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all"
      >
        جستجو
      </button>
    </div>
  );
}