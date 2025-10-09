import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/../prisma/singleton";
export async function GET(request: Request) {
  try {
    const cookiesStorage = await cookies();
    const token = cookiesStorage.get("token");
    if (!token) return NextResponse.json({ message: "No token found" });
    const secret = process.env.JWT_SECRET;
    if (!secret) return NextResponse.json({ message: "No secret found" });
    const decodedToken = jwt.verify(token.value, secret) as { id: string };
    if (!decodedToken)
      return NextResponse.json({ message: "Incorrect token" }, { status: 401 });
    const alert = await prisma.alert.findMany({
      where: { user_id: Number(decodedToken.id) },
      orderBy: {
        id: "asc",
      },
    });
    if (!alert)
      return NextResponse.json({ message: "Alert not found" }, { status: 404 });
    return NextResponse.json({ alerts: alert }, { status: 200 });
  } catch (error) {
    console.error({ error: error });
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, target } = body;
    const cookiesStorage = await cookies();
    const token = cookiesStorage.get("token");
    if (!token) return NextResponse.json({ message: "No token found" });
    const secret = process.env.JWT_SECRET;
    if (!secret) return NextResponse.json({ message: "No secret found" });
    try {
      const decodedToken = jwt.verify(token.value, secret) as { id: string };
      if (!decodedToken)
        return NextResponse.json(
          { message: "Incorrect token" },
          { status: 401 }
        );
      const user = await prisma.user.findUnique({
        where: { id: Number(decodedToken.id) },
      });
      if (!user)
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      const alert = await prisma.alert.create({
        data: {
          name,
          description,
          target,
          user_id: Number(decodedToken.id),
        },
      });
      if (!alert)
        return NextResponse.json(
          { message: "Alert not created" },
          { status: 400 }
        );
      return NextResponse.json({ message: "Alert created" }, { status: 200 });
    } catch (error) {
      console.error({ error: error });
      return NextResponse.json({ error: error }, { status: 500 });
    }
  } catch (error) {
    console.error({ error: error });
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const {
      id,
      description,
      target,
      isTriggered,
    }: { id: number; description?: string; target?: string; isTriggered?: boolean } = body;
    const cookiesStorage = await cookies();
    const token = cookiesStorage.get("token");
    if (!token) return NextResponse.json({ message: "No token found" });
    const secret = process.env.JWT_SECRET;
    if (!secret) return NextResponse.json({ message: "No secret found" });
    try {
      const decodedToken = jwt.verify(token.value, secret) as { id: string };
      if (!decodedToken)
        return NextResponse.json(
          { message: "Incorrect token" },
          { status: 401 }
        );
      const user = await prisma.user.findUnique({
        where: { id: Number(decodedToken.id) },
      });
      if (!user)
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      const alert = await prisma.alert.update({
        where: { id: id },
        data: {
          ...(description && { description }),
          ...(target && { target: Number(target) }),
          ...(isTriggered !== undefined && { isTriggered }),
        },
      });
      if (!alert)
        return NextResponse.json(
          { message: "Alert not updated" },
          { status: 400 }
        );
      console.log("Alert updated: ", alert);
      return NextResponse.json({ message: "Alert updated" }, { status: 200 });
    } catch (error) {
      console.error({ error: error });
      return NextResponse.json({ error: error }, { status: 500 });
    }
  } catch (error) {
    console.error({ error: error });
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

