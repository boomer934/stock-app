import { NextResponse } from "next/server";
import prisma from "../../../../prisma/singleton";
import bcrypt from "bcrypt";
import { registerSchema } from "@/lib/validation/auth";
import { inngest } from "@/inngest/client";
export async function POST(request: Request) {
  try {
    const json = (await request.json()) as unknown;
    const parsed = registerSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Dati non validi" }, { status: 400 });
    }
    const { name, email, password, nationality, risk } = parsed.data;

    // Hash the plaintext password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          nationality,
          risk,
        },
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Utente gia registrato" },
          { status: 400 }
        );
      }
      throw error;
    }

    try {
      await inngest.send({
        name: "api/email.send-email",
        data: {
          name,
          email,
        },
      });
    } catch (error) {
      console.error("Errore nell'invio dell'email:", error);
    }

    return NextResponse.json(
      { message: "Utente registrato correttamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("error: ", error);
    return NextResponse.json(
      { error: "Errore durante la registrazione" },
      { status: 500 }
    );
  }
}
