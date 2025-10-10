"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function EmailVerification() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Imposta il cookie lato client
    const timer = setTimeout(() => {
      Cookies.set("verified_email", "true", {
        expires: 1 / 1440,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
      router.push("/login");
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [router]);

  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        {/* Floating orbs */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-green-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-green-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>

        {/* Main card */}
        <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl transform transition-all duration-500 hover:shadow-green-400/20 hover:bg-white/10 bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 overflow-hidden">
          
          {/* Success icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent">
              Email Verified Successfully!
            </h1>
            
            <p className="text-gray-300 text-lg mb-6">
              Your email has been confirmed. You will be redirected to the login page shortly.
            </p>
          </div>

          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                Redirecting in <span className="text-green-400 font-bold text-lg">{countdown}</span> seconds...
              </p>
            </div>
          </div>

          {/* Manual redirect button */}
          <div className="text-center">
            <button
              onClick={() => router.push("/login")}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-green-400/30 hover:scale-105 active:scale-95 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Go to Login Now
            </button>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-green-400/20 rounded-full animate-ping"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 bg-green-400/30 rounded-full animate-pulse delay-700"></div>
        </div>
      </div>
    </div>
  );
}
