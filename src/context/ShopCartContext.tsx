"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import axios from "axios";

/* ======= Types ======= */
export interface IProduct {
  id: string | number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface ICartItem {
  id: string | number;
  qty: number;
}

/* ======= Context shape ======= */
interface IShopContext {
  products: IProduct[];
  loadingProducts: boolean;
  fetchProducts: () => Promise<void>;
  createProduct: (payload: Omit<IProduct, "id" | "rating"> & { rating?: IProduct["rating"] }) => Promise<void>;
  deleteProduct: (id: string | number) => Promise<void>;
  updateProduct: (product: IProduct) => Promise<void>;

  filter: string;
  setFilter: (v: string) => void;
  editItem: IProduct | null;
  setEditItem: (p: IProduct | null) => void;

  cartItems: ICartItem[];
  totalCartQty: number;
  cartTotalPrice: number;
  addToCart: (productId: string | number, qty?: number) => void;
  removeFromCart: (productId: string | number) => void;
  increaseQty: (productId: string | number) => void;
  decreaseQty: (productId: string | number) => void;
  getProductQty: (productId: string | number) => number;

  discountCode: string;
  setDiscountCode: (c: string) => void;
  discountedPrice: number;
  finalPrice: number;
  applyDiscount: () => Promise<void>;
}

/* ======= Context & Provider ======= */
const ShopCartContext = createContext<IShopContext>({} as IShopContext);

export const ShopCartProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [filter, setFilter] = useState<string>("all");
  const [editItem, setEditItem] = useState<IProduct | null>(null);

  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  const [discountCode, setDiscountCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState(0);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("CartItems");
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch (err) {
        console.error("خطا در خواندن سبد خرید از localStorage", err);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("CartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, mounted]);

  /* ========== Products API ========== */
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await axios.get<IProduct[]>("http://localhost:8001/products");
      setProducts(res.data);
    } catch (err) {
      console.error("خطا در دریافت محصولات:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const createProduct = async (payload: Omit<IProduct, "id" | "rating"> & { rating?: IProduct["rating"] }) => {
    const newItem: IProduct = {
      ...payload,
      id: String(Date.now()),
      rating: payload.rating ?? { rate: 0, count: 0 },
    };
    try {
      await axios.post("http://localhost:8001/products", newItem);
      setProducts((p) => [newItem, ...p]);
    } catch (err) {
      console.error("خطا در ایجاد محصول:", err);
      throw err;
    }
  };

  const deleteProduct = async (id: string | number) => {
    try {
      await axios.delete(`http://localhost:8001/products/${id}`);
      setProducts((p) => p.filter((x) => x.id !== id));
    } catch (err) {
      console.error("خطا در حذف محصول:", err);
      throw err;
    }
  };

  const updateProduct = async (product: IProduct) => {
    try {
      await axios.put(`http://localhost:8001/products/${product.id}`, product);
      setProducts((p) => p.map((it) => (it.id === product.id ? product : it)));
    } catch (err) {
      console.error("خطا در به‌روزرسانی محصول:", err);
      throw err;
    }
  };

  /* ========== Cart helpers ========== */
  const totalCartQty = cartItems.reduce((s, i) => s + i.qty, 0);

  // مهم: مقایسه id با String — چون بعضی string هستن بعضی number!
  const cartTotalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const product = products.find((p) => String(p.id) === String(item.id));
      return sum + (product ? Number(product.price) * item.qty : 0);
    }, 0);
  }, [cartItems, products]);

  // مبلغ نهایی — همیشه درست
  const finalPrice = useMemo(() => {
    return cartTotalPrice - discountedPrice;
  }, [cartTotalPrice, discountedPrice]);

  const addToCart = (productId: string | number, qty = 1) => {
    if (!mounted) return;
    setCartItems((cur) => {
      const found = cur.find((c) => String(c.id) === String(productId));
      if (!found) return [...cur, { id: productId, qty }];
      return cur.map((c) =>
        String(c.id) === String(productId) ? { ...c, qty: c.qty + qty } : c
      );
    });
  };

  const removeFromCart = (productId: string | number) => {
    if (!mounted) return;
    setCartItems((cur) => cur.filter((c) => String(c.id) !== String(productId)));
  };

  const increaseQty = (productId: string | number) => {
    if (!mounted) return;
    setCartItems((cur) =>
      cur.map((c) =>
        String(c.id) === String(productId) ? { ...c, qty: c.qty + 1 } : c
      )
    );
  };

  const decreaseQty = (productId: string | number) => {
    if (!mounted) return;
    setCartItems((cur) =>
      cur
        .map((c) =>
          String(c.id) === String(productId) ? { ...c, qty: Math.max(1, c.qty - 1) } : c
        )
        .filter((c) => c.qty > 0)
    );
  };

  const getProductQty = (productId: string | number) =>
    mounted ? cartItems.find((c) => String(c.id) === String(productId))?.qty || 0 : 0;

  /* ========== Discount ========== */
  const applyDiscount = async () => {
    if (!discountCode.trim()) {
      setDiscountedPrice(0);
      setDiscountCode("");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8001/Discounts?code=${encodeURIComponent(discountCode.trim())}`
      );
      const discounts = res.data as { id: number; code: string; percentage: number }[];

      if (discounts.length > 0) {
        const percentage = discounts[0].percentage;
        const discountAmount = Math.round((cartTotalPrice * percentage) / 100);
        setDiscountedPrice(discountAmount);
        alert(`کد تخفیف ${percentage}% با موفقیت اعمال شد!`);
      } else {
        alert("کد تخفیف معتبر نیست");
        setDiscountedPrice(0);
        setDiscountCode("");
      }
    } catch (err) {
      alert("خطا در اعمال کد تخفیف");
      setDiscountedPrice(0);
      setDiscountCode("");
    }
  };

  /* ======= Provider value ======= */
  const value: IShopContext = {
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

    cartItems,
    totalCartQty,
    cartTotalPrice,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    getProductQty,

    discountCode,
    setDiscountCode,
    discountedPrice,
    finalPrice,
    applyDiscount,
  };

  return <ShopCartContext.Provider value={value}>{children}</ShopCartContext.Provider>;
};

export const useShopCartContext = () => useContext(ShopCartContext);