"use client";

import { useShopCartContext } from '@/context/ShopCartContext';
import React, { useEffect, useState } from 'react';

function AddToCartBtn({ ItemId }: { ItemId: number }) {
  const {
    getProductQty,
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    cartItems,
  } = useShopCartContext();

  const [qty, setQty] = useState(0);

  useEffect(() => {
    setQty(getProductQty(ItemId));
  }, [cartItems, ItemId, getProductQty]);

  // تابع افزایش — اولین بار محصول رو اضافه می‌کنه
  const handleIncrease = () => {
    if (qty === 0) {
      addToCart(ItemId, 1);  // اولین بار اضافه میشه
    } else {
      increaseQty(ItemId);
    }
  };

  // تابع کاهش — وقتی به ۱ برسه و دوباره - بزنه → کامل حذف بشه
  const handleDecrease = () => {
    if (qty <= 1) {
      removeFromCart(ItemId);  // وقتی ۱ بود و - زد، کامل حذف شه
    } else {
      decreaseQty(ItemId);
    }
  };

  return (
    <div dir="rtl">
      <div className="mt-12 flex items-center gap-2">
        <button
          onClick={handleIncrease}
          className="px-7 py-2 rounded bg-sky-600 text-white hover:bg-sky-700 transition"
        >
          +
        </button>

        <span className="mx-3 text-xl font-semibold">
          {qty > 0 ? qty : 0}
        </span>

        <button
          onClick={handleDecrease}
          className="px-7 py-2 rounded bg-sky-600 text-white hover:bg-sky-700 transition"
        >
          -
        </button>
      </div>

      {qty > 0 && (
        <div className=" mt-2">
          <button
            onClick={() => removeFromCart(ItemId)}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded text-white transition"
          >
            حذف از سبد خرید
          </button>
        </div>
      )}
    </div>
  );
}

export default AddToCartBtn;