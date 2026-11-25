
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";


//FETCH ALL PRODUCTS (with optional category filter)
export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const cat = searchParams.get("cat");

    const where = cat ? { catSlug: cat } : {};

    const products = await prisma.product.findMany({ where });
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong" }),
      { status: 500 }
    );
  }
};

export const POST = () => {
  return new NextResponse("Hello", { status: 200 });
};
