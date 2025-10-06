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
    <div className="flex flex-col justify-center items-center h-auto w-auto bg-gray-800 text-yellow-400 p-7 rounded-xl">
      <h1 className="text-2xl font-semibold mb-1 ">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-72">
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="mario@example.com"
          className="border-none bg-gray-700 text-gray-500"
          required
        />
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="********"
          className="border-none bg-gray-700 text-gray-500"
          required
        />
        <Button
          type="submit"
          variant={"destructive"}
          className="mt-2 bg-yellow-400 text-gray-600 hover:bg-yellow-500 hover:text-gray-900"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
