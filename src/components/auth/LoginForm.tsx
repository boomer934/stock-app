"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/lib/validation/auth";
import { useUserContext } from "@/components/contextProvider/AppProvider";

export default function LoginForm() {
  const {user, setUser} = useUserContext()
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      email: (formData.get("email") || "").toString(),
      password: (formData.get("password") || "").toString(),
    };

    const parsed = loginSchema.safeParse(data);
    if (!parsed.success) {
      setError("Email o password non validi");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post("/api/login", parsed.data);
      if (response.status === 200) {
        form.reset();
        router.push("/");
        setUser(response.data.user)
      }
    } catch (err) {
      setError("Email o password non validi");
      // Production: remove or use proper error tracking service
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative w-[15vw]flex flex-col justify-center items-center h-auto w-full max-w-xl mx-auto">
      {/* Floating orbs */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-yellow-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
     

      {/* Enhanced glass morphism effect */}
      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl transform transition-all duration-500 hover:shadow-yellow-400/20 hover:bg-white/10 bg-gradient-to-br from-slate-900 via-yellow-900 to-slate-900 overflow-hidden">
        {/* Enhanced header with icon */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
            Welcome Back!
          </h1>
          <p className="text-gray-300 text-sm">Sign in to your account to continue</p>
        </div>

        {/* Enhanced error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-sm animate-shake">
            <div className="flex items-center justify-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Enhanced form */}
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Enhanced email field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-yellow-400">
              Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="john@example.com"
                className="w-full h-12 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-gray-100 placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none focus:bg-white/10 transition-all duration-300 hover:bg-white/5"
                required
              />
            </div>
          </div>

          {/* Enhanced password field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-yellow-400">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full h-12 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-gray-100 placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none focus:bg-white/10 transition-all duration-300 hover:bg-white/5"
                required
              />
            </div>
          </div>

          {/* Enhanced submit button */}
          <Button
            type="submit"
            variant={"destructive"}
            className="w-full h-12 mt-6 sm:mt-8 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-gray-900 font-bold rounded-xl shadow-xl hover:shadow-yellow-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
            disabled={loading}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </div>
              )}
            </span>
          </Button>
        </form>

        {/* Enhanced footer */}
        <div className="mt-6 sm:mt-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-transparent px-2 text-gray-400">or</span>
            </div>
          </div>
          <p className="text-sm text-gray-300 mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-yellow-400 hover:text-yellow-300 transition-all duration-200 font-medium hover:underline">
              Register now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
