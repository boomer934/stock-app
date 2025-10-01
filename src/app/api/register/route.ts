import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
export async function POST(request: Request) {
    try {
        // ... validation and request-body parsing code ...
        const body : UserDetails = (await request?.json())
        const {id ,name, email, password, nationality, risk} = body

        const user = await prisma?.user.findUnique({
            where: { id: id }
        })
        if (user) {
            return NextResponse.json({ "error": "Utente gia registrato" })
        }

       // Hash the plaintext password before storing
       const hashedPassword = await bcrypt.hash(password, 10)

        const insertUser = await prisma?.user.create({
            data: {
                name: name,
                email: email,
               password: hashedPassword,
                nationality: nationality,
                risk: risk
            }
        })
        return NextResponse.json({message:"Utente registrato correttamente"},{status:200})

    } catch (error) {
        // ... error handling ...
        console.error("error: ", error)
    return NextResponse.json(
        { error: "Errore durante la registrazione" },
        { status: 500 }
    )
    }
}
