"use client";

import { CartItem } from "@/components/CartItem";
import ContainerComp from "@/components/ContainerComp";
import { useShopCartContext } from "@/context/ShopCartContext";
import Link from "next/link";

function CartPage() {
  const {
    cartItems,
    totalCartQty,
    cartTotalPrice,
    discountedPrice,
    discountCode,
    setDiscountCode,
    applyDiscount,
  } = useShopCartContext();

  // مهم: finalPrice رو خودمون حساب کنیم (چون تو کانتکست useMemo هست)
  const finalPrice = cartTotalPrice - discountedPrice;
  const hasDiscount = discountedPrice > 0;

  return (
    <ContainerComp>
      <div className="min-h-screen py-10 px-4 md:mt-14 bg-gradient-to-b from-blue-50 via-white to-purple-50">
        {/* عنوان */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            سبد خرید شما
          </h1>
          <p className="text-xl text-gray-600 mt-4">
            {totalCartQty > 0
              ? `${totalCartQty} کالا در سبد شما موجود است`
              : "هنوز محصولی به سبد اضافه نکردید"}
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">

          {/* لیست محصولات */}
          <div className="lg:col-span-2">
            {totalCartQty > 0 ? (
              <div className="space-y-6 bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
                {cartItems.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200">
                <div className="text-8xl mb-8">سبد خرید خالیه</div>
                <p className="text-2xl text-gray-600 mb-10">
                  هنوز هیچ محصولی انتخاب نکردی!
                </p>
                <Link
                  href="/store"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-xl px-10 py-5 rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-110"
                >
                  بریم خرید کنیم
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </div>

          {/* جمع کل و پرداخت */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">جمع کل سبد خرید</h2>

              {/* قیمت کل */}
              <div className="flex justify-between text-lg mb-4">
                <span className="text-gray-600">قیمت کالاها ({totalCartQty} قلم)</span>
                <span className="font-bold">{cartTotalPrice.toLocaleString("fa-IR")} تومان</span>
              </div>

              {/* کد تخفیف */}
              {!hasDiscount ? (
                <div className="mt-6 p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="کد تخفیف دارید؟"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="flex-1 px-1 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 transition"
                    />
                    <button
                      onClick={applyDiscount}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-3 rounded-xl transition shadow-md"
                    >
                      اعمال
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-6 p-5 bg-green-100 rounded-2xl border-2 border-green-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-800 font-bold text-lg">تخفیف اعمال شد!</p>
                      <p className="text-green-700">سود شما از این خرید</p>
                    </div>
                    <p className="text-2xl font-extrabold text-green-600">
                      {discountedPrice.toLocaleString("fa-IR")} تومان
                    </p>
                  </div>
                </div>
              )}

              {/* خط جداکننده */}
              <div className="my-6 border-t-2 border-dashed border-gray-300"></div>

              {/* مبلغ نهایی */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-2xl font-bold text-gray-800">مبلغ قابل پرداخت:</span>
                <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {finalPrice.toLocaleString("fa-IR")} تومان
                </span>
              </div>

              {/* دکمه پرداخت */}
              <button
                disabled={totalCartQty === 0}
                className={`w-full py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-xl ${
                  totalCartQty > 0
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {totalCartQty > 0 ? "ادامه و پرداخت" : "سبد خرید خالی است"}
              </button>

              {/* نکته کوچک */}
              {totalCartQty > 0 && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  ارسال رایگان برای خرید بالای ۵۰۰,۰۰۰ تومان
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </ContainerComp>
  );
}

export default CartPage;