import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function POST(request: Request){
    try {
        const cookieStore = await cookies();
        const res:ResponseCookies = cookieStore.delete("token");
        if(res){
            console.log("Logout effettuato con successo");
            return new Response("Logout effettuato con successo", { status: 200 });
        }else{
            console.log("Logout non effettuato");
            return new Response("Logout non effettuato", { status: 400 });
        }
    } catch (error) {
        console.error("Error logging out:", error);
        return new Response("Error logging out", { status: 500 });
    }
}