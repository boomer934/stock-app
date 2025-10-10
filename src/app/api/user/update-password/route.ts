import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/../prisma/singleton";
import bcrypt from "bcryptjs";

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;
        if (!password) {
            return NextResponse.json(
                { error: "Password not provided" },
                { status: 400 }
            );
        }

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
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.update({
            where: { id: Number(decodedToken.id) },
            data: { password: hashedPassword },
        });
        return NextResponse.json(
            { message: "Password aggiornata con successo" },
            { status: 200 }
        );
        
    } catch (error) {
        console.error("Errore durante l'aggiornamento della password:", error);
        return NextResponse.json(
            { error: "Errore durante l'aggiornamento della password" },
            { status: 500 }
        );
    }
}