import { NextResponse } from "next/server";
import prisma from "../../../../prisma/singleton";
import bcrypt from "bcrypt";
export async function POST(request: Request) {
  try {
    const body: LoginDetails = await request?.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Password non valida" }, { status: 401 });
    }
    return NextResponse.json(
      { message: "Login effettuato con successo" },
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
