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
    <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-sm p-6 ">
      <h1 className="text-2xl font-semibold mb-1 text-yellow-400">Register</h1>
      <p className="text-sm mb-6 text-yellow-400">
        Crea un nuovo account compilando i campi sottostanti.
      </p>
      <form className="grid gap-4 " onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <label htmlFor="name" className="text-sm font-medium text-yellow-400">
            Nome
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Mario Rossi"
            className="bg-gray-700 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 border-none text-gray-400"
            required
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="text-sm font-medium text-yellow-400">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="mario@example.com"
            className="bg-gray-700 text-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 border-none"
            required
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="password" className="text-sm font-medium text-yellow-400">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            className="bg-gray-700 text-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 border-none"
            required
          />
          <p className="text-xs text-gray-500">Minimo 8 caratteri.</p>
        </div>

        <div className="grid gap-2">
          <label htmlFor="nationality" className="text-sm font-medium text-yellow-400">
            Nazionalità
          </label>
          <Input
            id="nationality"
            name="nationality"
            type="text"
            placeholder="Italia"
            className="bg-gray-700 text-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 border-none"
            required
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="risk" className="text-sm font-medium text-yellow-400">
            Profilo di rischio
          </label>
          <select
            id="risk"
            name="risk"
            className="h-10 rounded-md border bg-gray-700 px-3 text-sm text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 border-none"
            defaultValue="LOW"
            required
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="mt-2 bg-yellow-400 text-gray-600 hover:bg-yellow-500 hover:text-gray-900"
          variant={"destructive"}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
    </div>
  );
}
