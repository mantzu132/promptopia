import { dbConnect } from "@utils/database";
import Prompt from "@models/prompt";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(request) {
  const session = await getServerSession();

  if (session?.user.name) {
    await dbConnect();

    try {
      // Parse the incoming data
      const { prompt, tag, userId } = await request.json();

      // Create a new document and save to your MongoDB
      const data = new Prompt({ prompt, tag, creator: userId });
      await data.save();

      return NextResponse.json({ success: true, data: data });
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 400 },
      );
    }
  } else {
    return NextResponse.json(
      {
        success: false,
        error: "You must be logged in to create a prompt",
      },
      { status: 400 },
    );
  }
}
