import { inngest } from "@/inngest/client";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, verified } = body;
  
  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
    });
  }

  const secret = process.env.JWT_SECRET;
  console.log("JWT_SECRET disponibile:", !!secret);
  
  if (!secret) {
    return new Response(JSON.stringify({ error: "JWT_SECRET not configured" }), {
      status: 500,
    });
  }

  try {
    const token = jwt.sign({ email }, secret, {
      expiresIn: "15m",
    });
    
    console.log("Token generato per email:", email);
    
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://your-domain.com' 
      : 'http://localhost:3000';
    
    const link = `${baseUrl}/api/verify?token=${encodeURIComponent(token)}`;
    
    console.log("Link di verifica generato:", link);

    const response = await inngest.send({
      name: "api/verify-email.send-email",
      data: {
        email,
        link,
      },
    });
    
    return new Response(
      JSON.stringify({
        message: "Email inviata con successo",
        response,
        verified: "pending",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Errore durante l'invio email:", error);
    return new Response(
      JSON.stringify({
        error: "Si è verificato un errore durante l'invio dell'email",
        message: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
      }
    );
  }
}
