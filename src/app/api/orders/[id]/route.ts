import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";
import { OrderStatusSchema } from "@/utils/validation";
import { ZodError } from "zod";

// CHANGE THE STATUS OF AN ORDER
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const body = await req.json();
    const status = body?.status || body; // Support both { status: "..." } and "..."

    // Validate status using Zod
    const { status: validatedStatus } = OrderStatusSchema.parse({ status });

    await prisma.order.update({
      where: {
        id: id,
      },
      data: { status: validatedStatus },
    });
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated!" }),
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof ZodError) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid order status", errors: err.issues }),
        { status: 400 }
      );
    }
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
