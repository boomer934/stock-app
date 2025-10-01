import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const body : UserDetails = (await request?.json())
    const {id ,name, email, password, nationality, risk} = body
    if(!name || !email || !password || !nationality){
        return NextResponse.json({"error":`${!email ? "email is missing" : !name ? "name is missing" : !password ? "password is missing" : !nationality && "nationality is missing"}`})
    }

    const user = await prisma?.user.findUnique({
        where:{id:id}
    })
    if(user) return NextResponse.json({"error":"Utente gia registrato"})
    const insertUser = await prisma?.user.create({
        data:{
            name:name,
            email:email,
            password:password,
            nationality:nationality,
            risk:risk
        }
    })
    return NextResponse.json({message:"Utente registrato correttamente"})
    } catch (error) {
        console.error("error: ",error)
        return NextResponse.json({error:error})
    }
}