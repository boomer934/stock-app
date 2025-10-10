"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function EmailVerification() {
  const router = useRouter();

  useEffect(() => {
    // Imposta il cookie lato client
    const timer = setTimeout(()=>{
      Cookies.set("verified_email", "true", {
        expires: 1 / 1440, 
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
      router.push("/login");
    },3000)    
    return ()=> clearTimeout(timer)
  }, []);

  return <button className="text-green-400">Email verificata con successo! Reindirizzamento...</button>;
}
