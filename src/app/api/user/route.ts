import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "@/../prisma/singleton";
import bcrypt from "bcryptjs";

export async function GET() {
try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if (!token) {
        return NextResponse.json(
            { error: "Token non trovato" },
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
    const decodedToken = jwt.verify(token.value,secret) as { id: string };
    const user = await prisma.user.findUnique({
        where: { id: Number(decodedToken.id) },
    });
    return NextResponse.json({ user }, { status: 200 });
} catch (error) {
    console.error("error: ", error);
    return NextResponse.json(
        { error: "Errore durante il rucupero dell' utente" },
        { status: 500 }
    );
}   
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, nationality, risk } = body;

    if (!name || !email || !password || !nationality || !risk) {
      return NextResponse.json(
        { error: "Tutti i campi sono obbligatori" },
        { status: 400 }
      );
    }

    // Verifica se l'utente esiste già
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Utente già registrato con questa email" },
        { status: 400 }
      );
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea l'utente
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        nationality,
        risk,
      },
    });

    return NextResponse.json(
      { message: "Utente creato con successo", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Errore durante la creazione dell'utente:", error);
    return NextResponse.json(
      { error: "Errore durante la registrazione" },
      { status: 500 }
    );
  }
}