import { dbConnect } from "@utils/database";
import Prompt from "@models/prompt";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

// SHOW A PROMPT, EDIT IT, DELETE IT.
export async function GET(request, { params }) {
  if (params.promptId.toString().match(/^[0-9a-fA-F]{24}$/)) {
    try {
      await dbConnect();

      const prompt = await Prompt.findById(params.promptId).populate("creator");
      if (!prompt) {
        return NextResponse.json(
          { error: "Prompt not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(prompt, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Internal Server error" },
        { status: 500 },
      );
    }
  } else {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    const prompt = await Prompt.findById(params.promptId).populate("creator");

    if (!prompt) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }

    if (
      !session ||
      !session.user ||
      session.user.id !== prompt.creator._id.toString()
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await Prompt.findByIdAndDelete(params.promptId);

    return NextResponse.json(
      { message: "Prompt successfully deleted" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const existingPrompt = await Prompt.findById(params.promptId).populate(
      "creator",
    );

    if (!existingPrompt) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }

    if (
      !session ||
      !session.user ||
      session.user.id !== existingPrompt.creator._id.toString()
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return NextResponse.json(
      { message: "Successfully updated the Prompt" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error Updating Prompt" },
      { status: 500 },
    );
  }
};
