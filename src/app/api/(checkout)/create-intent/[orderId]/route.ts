import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

const stripeClient = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  const { orderId } = params;

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (order) {
    const amount = Number(order.price) * 100; // Server-side price calculation

    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: amount,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: { intent_id: paymentIntent.id },
    });

    return new NextResponse(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 }
    );
  }
  return new NextResponse(
    JSON.stringify({ message: "Order not found!" }),
    { status: 404 }
  );
}