// app/dashboard/page.tsx
"use client";

import React, { ChangeEvent, useState } from "react";
import ContainerComp from "@/components/ContainerComp";
import DashboardProductCard from "@/components/DashboardComp";
import DashboardCreateForm from "@/components/DashboardCreateForm";
import DashboardFilter from "@/components/DashBoardFilter";
import DashboardEditModal from "@/components/DashBoardEditModal";
import { useShopCartContext} from "@/context/ShopCartContext";
import { CategoryFa } from "@/constants/CategoryFa";

interface INewProduct {
  title: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

export default function DashboardPage() {
  const {
    products,
    loadingProducts,
    fetchProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    filter,
    setFilter,
    editItem,
    setEditItem,
  } = useShopCartContext();

  const [newProduct, setNewProduct] = useState<INewProduct>({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  // درست و بدون ارور — با select هم کار می‌کنه
  const handleChangeNew = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // ساخت محصول با آیدی خودکار (max + 1)
  const handleCreate = async () => {
    if (!newProduct.title.trim() || !newProduct.price) {
      alert("عنوان و قیمت اجباری است");
      return;
    }

    try {
      const productToAdd = {
        title: newProduct.title.trim(),
        price: Number(newProduct.price),
        description: newProduct.description.trim() || "",
        image: newProduct.image.trim() || "https://via.placeholder.com/600x600.png?text=No+Image",
        category: newProduct.category || "other",
        rating: { rate: 0, count: 0 },
      };

      await createProduct(productToAdd as any);

      // فرم رو خالی کن
      setNewProduct({
        title: "",
        price: "",
        description: "",
        image: "",
        category: "",
      });
    } catch (error) {
      alert("خطا در افزودن محصول");
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("آیا از حذف این محصول مطمئن هستید؟")) return;
    try {
      await deleteProduct(id);
    } catch {
      alert("خطا در حذف محصول");
    }
  };

  const filteredProducts = filter === "all" ? products : products.filter(p => p.category === filter);

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 bg-gray-50" dir="rtl">
      <div className="relative z-10 max-w-7xl mx-auto">
        <ContainerComp>

          {/* عنوان */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              مدیریت محصولات
            </h1>
            <p className="text-gray-600 mt-3">همه محصولات در یک نگاه</p>
          </div>

          {/* فرم ساخت محصول */}
          <DashboardCreateForm
            newProduct={newProduct}
            onChange={handleChangeNew}
            onCreate={handleCreate}
            onRefresh={fetchProducts}
          />

          {/* فیلتر */}
          <div className="mb-10">
            <DashboardFilter filter={filter} onFilterChange={setFilter} />
          </div>

          {/* عنوان دسته فعلی */}
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            {filter === "all" ? "همه محصولات" : CategoryFa[filter] || "محصولات"}
          </h2>

          {/* لیست محصولات */}
          {loadingProducts ? (
            <div className="text-center py-20 text-xl text-gray-600">در حال بارگذاری...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-3xl text-gray-400">محصولی یافت نشد</p>
              <p className="text-gray-600 mt-4">محصول جدیدی اضافه کنید</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((item) => (
                <DashboardProductCard
                  key={item.id}
                  product={item}
                  onEdit={setEditItem}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

          {/* مودال ویرایش */}
          {editItem && (
            <DashboardEditModal
              product={editItem}
              onClose={() => setEditItem(null)}
              onSave={async () => {
                await updateProduct(editItem);
                setEditItem(null);
              }}
              onChange={setEditItem}
            />
          )}

        </ContainerComp>
      </div>
    </div>
  );
}