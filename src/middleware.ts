export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Se non esiste il token → redirect al login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET non impostata nel .env");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // Verifica validità e integrità del token
    jwt.verify(token, secret);

    // Se tutto ok → continua con la richiesta
    return NextResponse.next();
  } catch (error) {
    console.warn("Token JWT non valido o scaduto:", error);
    // Cancella il cookie se corrotto/scaduto
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
    return response;
  }
}

// Specifica le rotte protette
export const config = {
  matcher: ["/alerts/:path*", "/api/alerts/:path*"],
};
