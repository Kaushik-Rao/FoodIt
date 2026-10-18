import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  const cartItems = await prisma.cartItem.findMany({
    where: {
      user: {
        email: token.email,
      },
    },
  });

  return new NextResponse(JSON.stringify(cartItems), { status: 200 });
}

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  const body = await request.json();
  const { productId, quantity } = body;

  const cartItem = await prisma.cartItem.upsert({
    where: {
      id: body.id || "none", // This is a simplified upsert logic
    },
    update: { quantity },
    create: {
      productId,
      quantity,
      userId: (await prisma.user.findUnique({ where: { email: token.email } }))?.id || "",
    },
  });

  return new NextResponse(JSON.stringify(cartItem), { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new NextResponse(JSON.stringify({ message: "ID required" }), { status: 400 });
  }

  await prisma.cartItem.delete({
    where: { id },
  });

  return new NextResponse(JSON.stringify({ message: "Deleted" }), { status: 200 });
}
