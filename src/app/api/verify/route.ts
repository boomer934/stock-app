import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/singleton";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  console.log("Token ricevuto:", token);

  if (!token) {
    return new NextResponse(JSON.stringify({ error: "Token is required" }), {
      status: 400,
    });
  }

  const secret = process.env.JWT_SECRET;
  console.log("JWT_SECRET disponibile:", !!secret);

  if (!secret) {
    return new NextResponse(
      JSON.stringify({ error: "JWT_SECRET not configured" }),
      {
        status: 500,
      }
    );
  }

  try {
    const decodedToken = jwt.verify(token, secret) as {
      email: string;
    };

    console.log("Token decodificato con successo:", decodedToken);

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://stock-alerts.vercel.app"
        : "http://localhost:3000";

    if (url.searchParams.get("method") === "PUT") {
      const prevEmail = url.searchParams.get("prevEmail");
      if (!prevEmail) {
        return new NextResponse(
          JSON.stringify({ error: "prevEmail is required" }),
          {
            status: 400,
          }
        );
      }
      const update = await prisma.user.update({
        where: { email: prevEmail },
        data: { email: decodedToken.email },
      });
      console.log("Utente aggiornato con successo:", update);
      const res = NextResponse.redirect(`${baseUrl}/profile`);
      return res;
    }

    const response = NextResponse.redirect(`${baseUrl}/email-verification`);

    return response;
  } catch (error) {
    console.error("Errore nella verifica del token:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Invalid token",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 401,
      }
    );
  }
}
