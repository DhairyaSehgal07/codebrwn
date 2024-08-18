import { getSession } from "@/app/actions/auth/common";
import { getWishlist } from "@/lib/firebase/wishlist";
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

    const wishlist = await getWishlist(session.id);

    return NextResponse.json(
      {
        success: true,
        wishlist,
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
