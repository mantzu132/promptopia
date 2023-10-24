import { dbConnect } from "@utils/database";
import Prompt from "@models/prompt";
import { NextResponse } from "next/server";

// * Retrieves user data based on the provided user ID.

export async function GET(request, { params }) {
  await dbConnect();

  try {
    const userData = await Prompt.find({ creator: params.userId })
      .populate("creator")
      .exec();

    return NextResponse.json({ userData });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 400 },
    );
  }
}
