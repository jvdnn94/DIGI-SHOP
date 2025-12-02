// app/page.tsx
import ContainerComp from "@/components/ContainerComp";
import ProductSlider from "@/components/ProductSliderComp";
import ProductComp from "@/components/ProductComp";
import { IProductItemes } from "@/components/ProductComp";
import Link from "next/link";

export default async function Home() {
  let products: IProductItemes[] = [];

  try {
    const res = await fetch("http://localhost:8001/products", {
      cache: "no-cache",
    });
    if (res.ok) products = await res.json();
  } catch (error) {
    console.error("خطا در دریافت محصولات:", error);
  }

  const randomThree = [...products]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return (
    <ContainerComp>
      <main className="md:mt-[2px] bg-gradient-to-br from-amber-50 via-stone-50 to-emerald-50 relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-tr from-amber-100/25 via-transparent to-emerald-100/20 pointer-events-none" />

        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div
            className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-mathematics.png')] 
                 bg-repeat mix-blend-overlay 
                 scale-150 
                 bg-center 
                 opacity-40"
          />
        </div>

        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-amber-100/35 via-amber-50/15 to-transparent pointer-events-none" />

        <div className="absolute top-20 right-10 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl -z-10" />
        <div className="absolute top-60 left-20 w-80 h-80 bg-emerald-300/15 rounded-full blur-3xl -z-10" />

        <div className="relative z-10">
          {/* بنر */}
          <section className="relative w-full h-96 md:h-[600px] mb-16 overflow-hidden rounded-b-3xl rounded-t-xl shadow-2xl">
            <img
              src="https://images.pexels.com/photos/5668471/pexels-photo-5668471.jpeg?w=1920&h=800&fit=crop"
              alt="تخفیف ویژه افتتاحیه"
              className="w-full h-full object-cover brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />

            <div className="absolute bottom-0 right-0 p-8 md:p-16 max-w-2xl text-right">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
                تخفیف‌های ویژه تا 70٪
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 mb-8">
                فقط تا آخر هفته فرصت داری!
              </p>
              <Link
                href="/store"
                className="inline-flex items-center gap-3 bg-white text-blue-600 font-bold text-lg px-10 py-5 rounded-full shadow-2xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-110 hover:shadow-blue-500/50"
              >
                همین حالا خرید کن
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </section>

          {/* اسلایدر اصلی */}
          <div className="mb-16">
            <ProductSlider products={products} />
          </div>

          {/* بخش محصولات پیشنهادی */}
          {products.length > 0 && (
            <section className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-amber-600 to-emerald-600 bg-clip-text text-transparent py-2">
                  محصولات پیشنهادی امروز
                </h2>
                <p className="text-gray-600 text-lg mt-4">
                  بهترین‌ها رو فقط برای تو انتخاب کردیم
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
                {randomThree.map((item) => (
                  <Link
                    key={item.id}
                    href={`/store/${item.id}`}
                    className="group block transform transition-all duration-500 hover:-translate-y-3"
                  >
                    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-amber-100">
                      <ProductComp {...item} />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/store"
                  className="group inline-flex mb-2 items-center gap-3 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 text-white font-bold text-xl py-5 px-12 rounded-full shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-110"
                >
                  مشاهده همه محصولات
                  <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </section>
          )}

          {products.length === 0 && (
            <div className="text-center py-32">
              <div className="text-6xl mb-6">در حال بارگذاری...</div>
              <p className="text-xl text-gray-500">محصولات در حال دریافت از سرور</p>
            </div>
          )}
        </div>
      </main>
    </ContainerComp>
  );
}