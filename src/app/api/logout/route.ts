import { NextResponse } from "next/server";
export async function POST(request: Request){
    try {
        const response = NextResponse.json({ message: "Logout effettuato con successo" }, { status: 200 }) as NextResponse;
        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 0,
            path: "/",
        });
        console.log("Logout effettuato con successo");
        return response;
    } catch (error) {
        console.error("Error logging out:", error);
        return NextResponse.json({ message: "Error logging out" }, { status: 500 });
    }
}