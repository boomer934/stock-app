import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/../prisma/singleton";
import bcrypt from "bcryptjs";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if (!token) {
      return NextResponse.json({ error: "Token non trovato" }, { status: 401 });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Variabile d'ambiente JWT_SECRET non trovata" },
        { status: 500 }
      );
    }
    const decodedToken = jwt.verify(token.value, secret) as { id: string };
    const user = await prisma.user.findUnique({
      where: { id: Number(decodedToken.id) },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Utente non trovato" },
        { status: 404 }
      );
    }
    const valid = await bcrypt.compare(password, user.password);
    return NextResponse.json({ user, valid }, { status: 200 });
  } catch (error) {
    console.error("error: ", error);
    return NextResponse.json(
      { error: "Errore durante il rucupero dell' utente" },
      { status: 500 }
    );
  }
}
