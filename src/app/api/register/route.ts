import { NextResponse } from "next/server";
import prisma from "../../../../prisma/singleton";
import bcrypt from "bcrypt";
export async function POST(request: Request) {
  try {
    // ... validation and request-body parsing code ...
    const body: UserDetails = await request?.json();
    const { name, email, password, nationality, risk } = body;

    // Hash the plaintext password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const insertUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          nationality: nationality,
          risk: risk,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: "Utente gia registrato" },
          { status: 400 }
        );
      }
      throw error;
    }
    return NextResponse.json(
      { message: "Utente registrato correttamente" },
      { status: 200 }
    );
  } catch (error) {
    // ... error handling ...
    console.error("error: ", error);
    return NextResponse.json(
      { error: "Errore durante la registrazione" },
      { status: 500 }
    );
  }
}
