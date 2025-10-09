import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/../prisma/singleton";
import { cookies } from "next/headers";
export async function DELETE(request: Request,{params}: {params: Promise<{id:number}>}) {
    try {
      const {id} = await params
      if(!id) return NextResponse.json({error:"no id found"},{status:400})
      const cookiesStorage = await cookies();
      const token = cookiesStorage.get("token").value;
      if (!token) return NextResponse.json({ message: "No token found" });
      const secret = process.env.JWT_SECRET;
      if (!secret) return NextResponse.json({ message: "No secret found" });
      const decodedToken = jwt.verify(token, secret) as { id: number };
      if (!decodedToken)
        return NextResponse.json({ message: "Incorrect token" }, { status: 401 });
      const user = await prisma.user.findUnique({
        where:{
          id:decodedToken.id
        }
      })
      if(!user) return NextResponse.json({error:"Unable to delete alert",motivation:"User not allowed"},{status:403})
      const alert = await prisma.alert.delete({
        where:{
          id:Number(id),
        },
      })
      if(!alert) return NextResponse.json({error:"Unable to delete alert",motivation:"Alert not found"},{status:404})
      return NextResponse.json({message:"Alert deleted with success"},{status:200})
    } catch (error) {
      console.error({ error: error });
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
  