import AddToCartBtn from '@/components/AddToCartBtn';
import ContainerComp from '@/components/ContainerComp';
import { IProductItemes } from '@/components/ProductComp';
import axios from 'axios';
import React from 'react';

interface IProductProps {
  params: Promise<{ id: string }>;
}

async function ProductPage(props: IProductProps) {
  const { id } = await props.params;

  const GetProduct = async (): Promise<IProductItemes> => {
    const response = await axios.get<IProductItemes>(`http://localhost:8001/products/${id}`);
    return response.data;
  };

  const ProductItem = await GetProduct();

  return (
    <ContainerComp>
      <div className="min-h-screen py-12 md:mt-2 md:py-20 bg-gradient-to-b from-blue-50 via-white to-purple-50">

      
        <div className="max-w-7xl mx-auto px-4">
          <div className="
            bg-white rounded-3xl shadow-2xl overflow-hidden
            border border-gray-100
            grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12
            p-6 md:p-10
          ">

            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative group">
                <div className="bg-gray-50 rounded-3xl overflow-hidden shadow-inner p-8 md:p-12">
                  <img
                    src={ProductItem.image || "/placeholder.jpg"}
                    alt={ProductItem.title}
                    className="
                      w-full max-w-md mx-auto object-contain
                      transition-all duration-700
                      group-hover:scale-110
                    "
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">

              {/* عنوان و توضیحات */}
              <div className="text-right">
                  <h1 className="text-3xl md:text-5xl font-extrabold text-sky-800 leading-tight mb-6">
                  {ProductItem.category}
                </h1>
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-6">
                  {ProductItem.title}
                </h1>

                <div className="text-lg text-gray-700 leading-relaxed space-y-4">
                  <p>{ProductItem.description}</p>
                </div>
              </div>

              {/* قیمت و کلید افزودن محصول */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 shadow-inner">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">

                  {/* قیمت */}
                  <div className="text-right">
                    <p className="text-xl text-gray-600 mb-2">قیمت محصول</p>
                    <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      {Number(ProductItem.price).toLocaleString()} تومان
                    </p>
                  </div>

                  {/* دکمه افزودن به سبد */}
                  <div className="w-full md:w-auto">
                    <AddToCartBtn ItemId={parseInt(id)} />
                  </div>
                </div>
              </div>

              {/*اطلاعات انتخابی/اضافی*/}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm">
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-gray-600">ارسال رایگان</p>
                  <p className="font-bold text-green-600">بالای ۵۰۰ هزار تومان</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-gray-600">گارانتی اصالت</p>
                  <p className="font-bold text-blue-600">۱۰۰٪ اصل</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-gray-600">ضمانت بازگشت</p>
                  <p className="font-bold text-purple-600">۷ روزه</p>
                </div>
                <div className="bg-gray-50 rounded-2xl p-4">
                  <p className="text-gray-600">پشتیبانی</p>
                  <p className="font-bold text-indigo-600">۲۴ ساعته</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContainerComp>
  );
}

export default ProductPage;