// components/MobileDrawer.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  totalCartQty: number;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const links = [
  { title: "خانه", href: "/" },
  { title: "فروشگاه", href: "/store" },
  { title: "پنل ادمین", href: "/dashboard" },
];

export default function MobileDrawer({ isOpen, onClose, totalCartQty, isLoggedIn, onLogout }: Props) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 w-75 h-[86vh] bg-white shadow-2xl z-50 flex flex-col rounded-bl mt-16">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 transition">
            <i className="fas fa-times text-xl text-gray-600"></i>
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 px-6 py-8">
          <ul className="space-y-1">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`block px-5 py-4 rounded-xl text-lg font-medium transition-all ${
                    pathname === item.href
                      ? "bg-amber-50 text-amber-700 font-bold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t space-y-4">
          <Link
            href="/cart"
            onClick={onClose}
            className="flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition"
          >
            <div className="flex items-center gap-4">
              <i className="fas fa-shopping-cart text-xl text-gray-700"></i>
              <span className="font-medium">سبد خرید</span>
            </div>
            {totalCartQty > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {totalCartQty > 99 ? "99+" : totalCartQty}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition"
            >
              خروج از حساب
            </button>
          ) : (
            <Link
              href="/login"
              onClick={onClose}
              className="block text-center w-full py-4 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-600 hover:to-emerald-600 text-white font-medium rounded-xl transition"
            >
              ورود / ثبت نام
            </Link>
          )}
        </div>
      </div>
    </>
  );
}