import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "@/../prisma/singleton";
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
        { error: "Errore durante il login" },
        { status: 500 }
    );
}   
}