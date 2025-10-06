import { NextResponse } from "next/server";
import prisma from "../../../../prisma/singleton";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { loginSchema } from "@/lib/validation/auth";
export async function POST(request: Request) {
  try {
    const json = (await request.json()) as unknown;
    const parsed = loginSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Email o password non validi" }, { status: 400 });
    }
    const { email, password } = parsed.data;

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

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "5h" });
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
    });
    return NextResponse.json(
      { message: "Login effettuato con successo", token, user},
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
