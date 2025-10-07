"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { registerSchema } from "@/lib/validation/auth";

export default function RegisterForm() {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      password: formData.get("password")?.toString() || "",
      nationality: formData.get("nationality")?.toString() || "",
      risk: formData.get("risk")?.toString() || "",
    };

    const parsed = registerSchema.safeParse(data);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/register", parsed.data);
      form.reset();
      router.push("/login");
    } catch (err) {
      console.error("Errore durante la registrazione:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Animated background with floating elements */}
      <div className="absolute inset-0 rounded-3xl shadow-2xl overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-8 left-8 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-8 right-8 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-yellow-400/15 rounded-full blur-xl animate-pulse delay-300"></div>
        <div className="absolute bottom-1/3 left-1/4 w-28 h-28 bg-yellow-400/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      {/* Enhanced glass morphism effect */}
      <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 p-6 sm:p-8  transform transition-all duration-500 hover:shadow-yellow-400/20 hover:bg-white/10 bg-gradient-to-br from-slate-900 via-yellow-900 to-slate-900 rounded-3xl shadow-2xl overflow-hidden">
        {/* Enhanced header with icon */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 via-yellow-400 to-yellow-400 bg-clip-text text-transparent">
            Crea il tuo Account
          </h1>
          <p className="text-gray-300 text-sm">Unisciti alla nostra community di investitori</p>
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
        <form className="space-y-4 sm:space-y-5 " onSubmit={handleSubmit}>
          {/* Enhanced name field */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-yellow-400">
              Nome completo
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Mario Rossi"
                className="w-full h-12 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-gray-100 placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none focus:bg-white/10 transition-all duration-300 hover:bg-white/5"
                required
              />
            </div>
          </div>

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
                name="email"
                type="email"
                placeholder="mario@example.com"
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
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full h-12 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-gray-100 placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none focus:bg-white/10 transition-all duration-300 hover:bg-white/5"
                required
              />
            </div>
            <p className="text-xs text-gray-400 mt-1 flex items-center">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Minimo 8 caratteri
            </p>
          </div>

          {/* Enhanced nationality field */}
          <div className="space-y-2">
            <label htmlFor="nationality" className="block text-sm font-medium text-yellow-400">
              Nazionalità
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <Input
                id="nationality"
                name="nationality"
                type="text"
                placeholder="Italia"
                className="w-full h-12 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-gray-100 placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none focus:bg-white/10 transition-all duration-300 hover:bg-white/5"
                required
              />
            </div>
          </div>

          {/* Enhanced risk profile field */}
          <div className="space-y-2">
            <label htmlFor="risk" className="block text-sm font-medium text-yellow-400">
              Profilo di rischio
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <select
                id="risk"
                name="risk"
                className="w-full h-12 pl-10 pr-4 bg-white/5 border border-white/10 rounded-xl text-gray-100 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 hover:bg-white/5 appearance-none cursor-pointer"
                defaultValue="LOW"
                required
              >
                <option value="LOW" className="bg-gray-800 text-gray-100">🟢 Basso - Investimenti conservativi</option>
                <option value="MEDIUM" className="bg-gray-800 text-gray-100">🟡 Medio - Bilanciato</option>
                <option value="HIGH" className="bg-gray-800 text-gray-100">🔴 Alto - Investimenti aggressivi</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Enhanced submit button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 mt-6 sm:mt-8 bg-gradient-to-r from-yellow-500 via-pink-500 to-yellow-600 text-white font-bold rounded-xl shadow-xl hover:shadow-yellow-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
            variant={"destructive"}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Registrazione in corso...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Crea Account
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
              <span className="bg-transparent px-2 text-gray-400">oppure</span>
            </div>
          </div>
          <p className="text-sm text-gray-300 mt-4">
            Hai già un account?{" "}
            <a href="/login" className="text-yellow-400 hover:text-yellow-300 transition-all duration-200 font-medium hover:underline">
              Accedi ora
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
