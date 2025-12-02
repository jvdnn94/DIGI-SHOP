import ContainerComp from '@/components/ContainerComp';
import Pagination from '@/components/Pagination';
import ProductComp, { IProductItemes } from '@/components/ProductComp';
import SearchComp from '@/components/Search';
import axios from 'axios';
import Link from 'next/link';
import React from 'react';
import CategoryFilter from '@/components/FilterComp';

export interface IProductListData {
  data: IProductItemes[];
  first: number | null;
  items: number | null;
  last: number | null;
  next: number | null;
  pages: number;
  prev: number | null;
}

interface IStoreProps {
  searchParams: Promise<{
    page?: string;
    per_page?: string;
    q?: string;
    category?: string;
    
  }>;
}

const Store = async ({ searchParams }: IStoreProps) => {
  const resolvedParams = await searchParams;
  const PageNumber = resolvedParams?.page ?? "1";
  const Per_pageNumber = resolvedParams?.per_page ?? "12";

  // مقدار سرچ
  const Title_Params = resolvedParams?.q ?? "";
  
  // مقدار دسته
  const Category_Params = resolvedParams?.category ?? "";

  console.log("📋 Store Params:", { Title_Params, Category_Params, PageNumber });

  const GetProductsData = async (): Promise<IProductListData> => {
    try {
      // اگر جستجو داریم، باید همه محصولات رو بگیریم و خودمون فیلتر کنیم
      const isSearching = Title_Params.length > 0;
      
      // ساخت URL با پارامترهای صحیح
      const params = new URLSearchParams({
        _page: isSearching ? "1" : PageNumber,
        _per_page: isSearching ? "1000" : Per_pageNumber, // در حالت جستجو، همه رو بگیر
      });

      // اضافه کردن فیلتر دسته‌بندی (فقط اگر مقدار داشته باشد)
      if (Category_Params) {
        params.append('category', Category_Params);
      }

      const finalUrl = `http://localhost:8001/products?${params.toString()}`;
      console.log("🌐 API Call:", finalUrl);

      const Response = await axios.get<IProductListData>(finalUrl);
      
      let filteredData = Response.data.data;
      
      // اگر جستجو داریم، فیلتر کن
      if (isSearching) {
        const searchLower = Title_Params.toLowerCase();
        filteredData = filteredData.filter(product => {
          const titleEn = product.title_en?.toLowerCase() || '';
          const titleFa = product.title?.toLowerCase() || ''; // title همون فارسی هست
          const desc = product.description?.toLowerCase() || '';
          
          return titleEn.includes(searchLower) || 
                 titleFa.includes(searchLower) || 
                 desc.includes(searchLower);
        });
        
        console.log(`🔍 Filtered ${filteredData.length} products from ${Response.data.data.length}`);
        console.log(`🔍 Search term: "${Title_Params}"`);

        
        // صفحه‌بندی دستی
        const startIndex = (Number(PageNumber) - 1) * Number(Per_pageNumber);
        const endIndex = startIndex + Number(Per_pageNumber);
        const paginatedData = filteredData.slice(startIndex, endIndex);
        
        return {
          data: paginatedData,
          first: 1,
          items: filteredData.length,
          last: Math.ceil(filteredData.length / Number(Per_pageNumber)),
          next: endIndex < filteredData.length ? Number(PageNumber) + 1 : null,
          pages: Math.ceil(filteredData.length / Number(Per_pageNumber)),
          prev: Number(PageNumber) > 1 ? Number(PageNumber) - 1 : null,
        };
      }
      
      console.log("✅ Products received:", Response.data.data.length);
      
      return Response.data;
    } catch (error) {
      console.error("❌ خطا در دریافت محصولات:", error);
      return {
        data: [],
        first: null,
        items: null,
        last: null,
        next: null,
        pages: 1,
        prev: null,
      };
    }
  };

  const productsData = await GetProductsData();
  const ProductItems = productsData.data;

  return (
    <ContainerComp>
      <div className="min-h-screen md:mt-14 py-10 px-4 relative overflow-hidden bg-gradient-to-br from-amber-50 via-stone-50 to-emerald-50">

        {/* هدر */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-amber-600 to-emerald-600 bg-clip-text text-transparent">
            فروشگاه ما
          </h1>
          <p className="text-xl text-gray-700 mt-4 font-medium">
            بهترین محصولات با بهترین قیمت — فقط برای شما
          </p>
        </div>

        {/* سرچ + فیلتر */}
        <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <SearchComp />
          </div>
          <CategoryFilter />
        </div>

        {/* لیست محصولات */}
        {ProductItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {ProductItems.map((item) => (
              <Link
                key={item.id}
                href={`/store/${item.id}`}
                className="group block transform transition-all duration-500 hover:-translate-y-4"
              >
                <div className="
                  bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl
                  transition-all duration-500
                  h-full flex flex-col hover:border-amber-200
                ">
                  <ProductComp {...item} />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="text-6xl mb-6 text-gray-400">
              {Title_Params || Category_Params ? '🔍' : '📦'}
            </div>
            <p className="text-xl text-gray-600 font-bold mb-2">محصولی یافت نشد</p>
            <p className="text-lg text-gray-500">
              {Title_Params || Category_Params 
                ? 'جستجوی خود را تغییر دهید یا فیلترها را بردارید' 
                : 'در حال حاضر محصولی موجود نیست'}
            </p>
          </div>
        )}

        {/* صفحه‌بندی */}
        {ProductItems.length > 0 && (
          <div className="mt-20 flex justify-center">
            <Pagination
              pageCount={productsData.pages || 1}
              currentPage={Number(PageNumber)}
            />
          </div>
        )}
      </div>
    </ContainerComp>
  );
};

export default Store;