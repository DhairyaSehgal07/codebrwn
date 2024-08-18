import { getSession } from "@/app/actions/auth/common";
import { getCart } from "@/lib/firebase/cart";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "No session found",
        },
        { status: 200 },
      );
    }

    const cart = await getCart(session.id);

    return NextResponse.json(
      {
        success: true,
        cart,
      },
      { status: 200 },
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message, success: false },
      { status: 500 },
    );
  }
}
