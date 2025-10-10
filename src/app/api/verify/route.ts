import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

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
    return new NextResponse(JSON.stringify({ error: "JWT_SECRET not configured" }), {
      status: 500,
    });
  }

  try {
    const decodedToken = jwt.verify(token, secret) as {
      email: string;
    };
    
    console.log("Token decodificato con successo:", decodedToken);
    
    // Redirect assoluto invece di relativo
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://your-domain.com' 
      : 'http://localhost:3000';
    
    const response = NextResponse.redirect(`${baseUrl}/email-verification`);

    return response;
  } catch (error) {
    console.error("Errore nella verifica del token:", error);
    return new NextResponse(
      JSON.stringify({ 
        error: "Invalid token", 
        message: error instanceof Error ? error.message : "Unknown error"
      }), 
      {
        status: 401,
      }
    );
  }
}
