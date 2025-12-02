"use client"
import ContainerComp from '@/components/ContainerComp'
import cookie from "js-cookie"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface IErrors {
  username: string;
  pass: string;
  email: string;
  phone: string;
}

function LogInPage() {
  const [UserName, setUserName] = useState("");
  const [Pass, setPass] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumb, setPhoneNumb] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<IErrors>({
    username: "",
    pass: "",
    email: "",
    phone: ""
  });

  const router = useRouter();

  // اعتبارسنجی فیلدها
  const validateForm = (): boolean => {
    const newErrors: IErrors = {
      username: "",
      pass: "",
      email: "",
      phone: ""
    };

    // چک نام کاربری
    if (!UserName.trim()) {
      newErrors.username = "نام کاربری الزامی است";
    } else if (UserName.length < 3) {
      newErrors.username = "نام کاربری باید حداقل 3 کاراکتر باشد";
    }

    // چک رمز عبور
    if (!Pass.trim()) {
      newErrors.pass = "رمز عبور الزامی است";
    } else if (Pass.length < 6) {
      newErrors.pass = "رمز عبور باید حداقل 6 کاراکتر باشد";
    }

    // اگر حالت ثبت‌نام است
    if (!isLogin) {
      // چک ایمیل
      if (!Email.trim()) {
        newErrors.email = "ایمیل الزامی است";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(Email)) {
          newErrors.email = "فرمت ایمیل صحیح نیست";
        }
      }

      // چک شماره موبایل
      if (!PhoneNumb.trim()) {
        newErrors.phone = "شماره موبایل الزامی است";
      } else if (!/^09\d{9}$/.test(PhoneNumb)) {
        newErrors.phone = "شماره باید 11 رقم و با 09 شروع شود";
      }
    }

    setErrors(newErrors);

    // اگر هیچ خطایی نبود true برمی‌گرداند
    return !Object.values(newErrors).some(error => error !== "");
  };

  const HandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // اعتبارسنجی
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // شبیه‌سازی تاخیر API
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (isLogin) {
      // ورود
      const response = {
        status: "success",
        token: "sjkbdbmzklkMLSMLRGLSSL:RBMlbmflmlGGSMLGMLGlg9SLKglr6l4kwgmlM",
        expire: 7
      }
      cookie.set("token", response.token, { expires: response.expire });
      setLoading(false);
      router.push("/dashboard");
    } else {
      // ثبت‌نام
      setLoading(false);
      alert("ثبت‌نام با موفقیت انجام شد! حالا وارد شوید");
      toggleMode();
    }
  }

  // تغییر حالت ورود/ثبت‌نام
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setUserName("");
    setPass("");
    setEmail("");
    setPhoneNumb("");
    setShowPass(false);
    setErrors({
      username: "",
      pass: "",
      email: "",
      phone: ""
    });
  }

  return (
    <ContainerComp>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <p className='text-red-500 text-center'>توجه:این یک پروژه آزمایشی است، با هر یوزر و پسوردی وارد شوید</p>

        {/* کارت اصلی */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

          {/* هدر رنگی */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-10 text-center">
            <h1 className="text-3xl font-bold text-white">
              {isLogin ? "خوش آمدید!" : "حساب جدید بسازید"}
            </h1>
            <p className="text-blue-100 mt-2 text-sm">
              {isLogin ? "برای ادامه وارد شوید" : "فقط چند ثانیه تا شروع!"}
            </p>
          </div>

          {/* فرم */}
          <form onSubmit={HandleSubmit} className="px-8 py-10 space-y-6">

            {/* نام کاربری */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نام کاربری <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full px-4 py-3 border rounded-xl focus:ring-4 focus:ring-blue-200 outline-none transition ${errors.username
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                  }`}
                value={UserName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  if (errors.username) setErrors({ ...errors, username: "" });
                }}
                type="text"
                placeholder="مثال: ali123"
                disabled={loading}
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.username}
                </p>
              )}
            </div>

            {/* ایمیل — فقط در ثبت‌نام */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ایمیل <span className="text-red-500">*</span>
                </label>
                <input
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-4 focus:ring-blue-200 outline-none transition ${errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                    }`}
                  value={Email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: "" });
                  }}
                  type="email"
                  placeholder="example@gmail.com"
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <i className="fas fa-exclamation-circle"></i>
                    {errors.email}
                  </p>
                )}
              </div>
            )}

            {/* شماره موبایل — فقط در ثبت‌نام */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  شماره موبایل <span className="text-red-500">*</span>
                </label>
                <input
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-4 focus:ring-blue-200 outline-none transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${errors.phone
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                    }`}
                  value={PhoneNumb}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 11) {
                      setPhoneNumb(value);
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }
                  }}
                  type="tel"
                  maxLength={11}
                  placeholder="09123456789"
                  disabled={loading}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <i className="fas fa-exclamation-circle"></i>
                    {errors.phone}
                  </p>
                )}
              </div>
            )}

            {/* رمز عبور */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                رمز عبور <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-4 focus:ring-blue-200 outline-none transition ${errors.pass
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300 focus:border-blue-500"
                    }`}
                  value={Pass}
                  onChange={(e) => {
                    setPass(e.target.value);
                    if (errors.pass) setErrors({ ...errors, pass: "" });
                  }}
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                  disabled={loading}
                >
                  <i className={showPass ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                </button>
              </div>
              {errors.pass && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.pass}
                </p>
              )}
            </div>

            {/* دکمه اصلی */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-lg py-4 rounded-xl transition transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fas fa-spinner fa-spin"></i>
                  در حال پردازش...
                </span>
              ) : (
                isLogin ? "ورود به حساب" : "ایجاد حساب جدید"
              )}
            </button>

            {/* سوییچ ورود/ثبت‌نام */}
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={toggleMode}
                disabled={loading}
                className="text-blue-600 hover:text-blue-800 font-medium underline underline-offset-4 transition disabled:opacity-50"
              >
                {isLogin
                  ? "حساب ندارید؟ همین حالا ثبت‌نام کنید"
                  : "قبلاً ثبت‌نام کردید؟ وارد شوید"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </ContainerComp>
  )
}

export default LogInPage