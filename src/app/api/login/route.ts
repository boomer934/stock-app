import { NextResponse } from "next/server";
import prisma from "../../../../prisma/singleton";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function POST(request: Request) {
  try {
    const body: LoginDetails = await request?.json();
    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json(
          { error: "Email e password sono obbligatorie" },
          { status: 400 }
        );
      }
      
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return NextResponse.json(
            { error: "Email non valida" },
            { status: 400 }
        );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utente non trovato" },
        { status: 400 }
      );
    }

    const isPasswordValid = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Email o password non validi" },
        { status: 401 }
      );
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Variabile d'ambiente JWT_SECRET non trovata" },
        { status: 500 }
      );
    }

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600
    });
    return NextResponse.json(
      { message: "Login effettuato con successo", token: token },
      { status: 200 }
    );
  } catch (error) {
    console.error("error: ", error);
    return NextResponse.json(
      { error: "Errore durante il login" },
      { status: 500 }
    );
  }
}
