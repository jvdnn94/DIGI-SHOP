// components/NavComp.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import ContainerComp from "./ContainerComp";
import MobileDrawer from "./MobileDrawer";
import { useShopCartContext } from "@/context/ShopCartContext";
import cookie from "js-cookie";
import Image from "next/image";

const links = [
  { title: "خانه", href: "/" },
  { title: "فروشگاه", href: "/store" },
  { title: "پنل ادمین", href: "/dashboard" },
];

export default function NavComp() {
  const { totalCartQty } = useShopCartContext();
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  //   setIsLoggedIn(!!cookie.get("token"));
  // }, []);
useEffect(() => {
  setMounted(true);
  setIsLoggedIn(!!cookie.get("token"));
}, [totalCartQty, pathname]);

  useEffect(() => setDrawerOpen(false), [pathname]);

  const handleLogout = () => {
    cookie.remove("token");
    setIsLoggedIn(false);
    router.push("/");
    router.refresh();
  };

  if (!mounted) return <div className="h-16 md:h-20" />;

  return (
    <div dir="rtl">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-md border-b border-gray-100">
        <ContainerComp>
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* لوگو */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/download.svg"
                alt="GOLDSHOP"
                width={180}
                height={70}
                className="object-contain"
              />
            </Link>

            {/* منوی دسکتاپ */}
            <ul className="hidden md:flex items-center gap-10">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-lg font-medium transition-all px-4 py-2 rounded-lg ${pathname === item.href
                        ? "text-amber-600 bg-amber-50"
                        : "text-gray-700 hover:text-amber-600"
                      }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              {/* سبد خرید */}
              <Link
                href="/cart"
                className="relative hidden md:flex border-2 border-gray-200 items-center gap-3 px-5 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition"
              >
                <i className="fas fa-shopping-cart text-xl"></i>
                {totalCartQty > 0 && (
                  <span className="absolute -top-2 -left-2 border-red-800 border-4 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {totalCartQty > 99 ? "99+" : totalCartQty}
                  </span>
                )}
              </Link>

              {/* ورود/خروج */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="hidden md:block px-8 py-3 bg-red-400 hover:bg-red-600 text-white font-medium rounded-xl transition"
                >
                  خروج
                </button>
              ) : (
                <Link
                  href="/login"
                  className="hidden md:block px-7 py-3 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 text-white font-medium rounded-xl transition shadow-md"
                >
                  ورود/ثبت نام
                </Link>
              )}

              {/* همبرگر */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="md:hidden p-3 rounded-lg hover:bg-gray-100 transition"
              >
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </ContainerComp>
      </div>

      {/* دراور موبایل */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        totalCartQty={totalCartQty}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {/* اسپیسر برای محتوای زیر ناوبار */}
      <div className="h-16 md:h-20" />
    </div>
  );
}