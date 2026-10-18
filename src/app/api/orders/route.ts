import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import { OrderSchema } from "@/utils/validation";
import { ZodError } from "zod";

// FETCH ALL ORDERS
export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (session) {
    try {
      if (session.user.id) {
        const orders = await prisma.order.findMany();
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      }
      const orders = await prisma.order.findMany({
        where: {
          userEmail: session.user.email!,
        },
      });
      return new NextResponse(JSON.stringify(orders), { status: 200 });
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "You are not authenticated!" }),
      { status: 401 }
    );
  }
};

// CREATE ORDER
export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (session) {
    try {
      const body = await req.json();

      // Validate input using Zod
      const validatedData = OrderSchema.parse(body);

      const order = await prisma.order.create({
        data: validatedData,
      });
      return new NextResponse(JSON.stringify(order), { status: 201 });
    } catch (err) {
      if (err instanceof ZodError) {
        return new NextResponse(
          JSON.stringify({ message: "Validation failed", errors: err.errors }),
          { status: 400 }
        );
      }
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "You are not authenticated!" }),
      { status: 401 }
    );
  }
};
