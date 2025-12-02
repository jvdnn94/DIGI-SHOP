"use client";

import React from "react";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTelegram, 
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaTruck,
  FaCreditCard,
  FaRegCopyright
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-300 mt-20">

      {/* بخش اصلی فوتر */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* ۱. لوگو + توضیحات + خبرنامه */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                GOLD-SHOP
              </h2>
              <p className="text-gray-400 mt-3 leading-relaxed">
                فروشگاه آنلاین تخصصی تکنولوژی، مد و لوازم دیجیتال با بهترین قیمت و اصالت کالا
              </p>
            </div>

            {/* خبرنامه */}
            <div className="mt-8">
              <p className="text-white font-semibold mb-3">عضویت در خبرنامه</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="ایمیل شما" 
                  className="flex-1 px-5 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
                />
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-purple-500/50 transition transform hover:scale-105">
                  عضویت
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">تخفیف‌ها و محصولات جدید رو زودتر از همه دریافت کن!</p>
            </div>
          </div>

          {/* ۲. دسته‌بندی‌ها */}
          <div>
            <h3 className="text-lg font-bold text-white mb-5 border-b border-gray-700 pb-2">دسته‌بندی‌ها</h3>
            <ul className="space-y-3 text-gray-400">
              {["موبایل و تبلت", "لپ‌تاپ", "هدفون و هندزفری", "ساعت هوشمند", "لوازم جانبی", "پوشاک"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-400 transition flex items-center gap-2">
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ۳. لینک‌های مفید */}
          <div>
            <h3 className="text-lg font-bold text-white mb-5 border-b border-gray-700 pb-2">لینک‌های مفید</h3>
            <ul className="space-y-3 text-gray-400">
              {["درباره ما", "تماس با ما", "سوالات متداول", "شرایط و قوانین", "حریم خصوصی", "بلاگ"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-purple-400 transition flex items-center gap-2">
                    <span className="w-1 h-1 bg-purple-500 rounded-full"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ۴. پشتیبانی و اطلاعات تماس + شبکه‌های اجتماعی */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-5 border-b border-gray-700 pb-2">پشتیبانی و تماس</h3>
              <div className="space-y-4 text-sm text-gray-400">
                <div className="flex items-center gap-3">
                  <FaPhone className="text-blue-500" />
                  <span>021-28425678</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-purple-500" />
                  <span>support@goldshop.ir</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-green-500" />
                  <span>تهران، میدان ونک</span>
                </div>
              </div>
            </div>

            {/* شبکه‌های اجتماعی */}
            <div>
              <p className="text-white font-semibold mb-4">ما را دنبال کنید</p>
              <div className="flex gap-3">
                <a href="#" className="p-3 bg-gray-800 rounded-xl hover:bg-blue-600 hover:scale-110 transition transform">
                  <FaInstagram className="text-xl" />
                </a>
                <a href="#" className="p-3 bg-gray-800 rounded-xl hover:bg-blue-400 hover:scale-110 transition transform">
                  <FaTelegram className="text-xl" />
                </a>
                <a href="#" className="p-3 bg-gray-800 rounded-xl hover:bg-green-500 hover:scale-110 transition transform">
                  <FaWhatsapp className="text-xl" />
                </a>
                <a href="#" className="p-3 bg-gray-800 rounded-xl hover:bg-blue-700 hover:scale-110 transition transform">
                  <FaFacebookF className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* بخش اعتماد و نمادها */}
        <div className="mt-16 pt-10 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-gray-800/50 px-5 py-3 rounded-xl">
              <FaShieldAlt className="text-green-500 text-2xl" />
              <span className="text-sm text-gray-300">پرداخت امن</span>
            </div>
            <div className="flex items-center gap-3 bg-gray-800/50 px-5 py-3 rounded-xl">
              <FaTruck className="text-blue-500 text-2xl" />
              <span className="text-sm text-gray-300">ارسال سریع</span>
            </div>
            <div className="flex items-center gap-3 bg-gray-800/50 px-5 py-3 rounded-xl">
              <FaCreditCard className="text-purple-500 text-2xl" />
              <span className="text-sm text-gray-300">درگاه بانکی معتبر</span>
            </div>
          </div>

          {/* کپی‌رایت */}
          <div className="text-center text-gray-500 text-sm flex items-center gap-2">
            <FaRegCopyright />
            <span>{currentYear} GOLD-SHOP — تمامی حقوق محفوظ است.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}