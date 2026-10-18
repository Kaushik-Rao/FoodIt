import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

const stripeClient = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const PUT = async (req: Request, {params} : { params: { intentId: string }}) => {
  const intentId = params.intentId;

  try {
    // Verify payment status with Stripe
    const paymentIntent = await stripeClient.paymentIntents.retrieve(intentId);

    if (paymentIntent.status !== 'succeeded') {
      return new NextResponse(
        JSON.stringify({ message: "Payment not successful" }),
        { status: 400 }
      );
    }

    await prisma.order.update({
      where: {
        intent_id: intentId,
      },
      data: { status: "Being prepared!" },
    });
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
