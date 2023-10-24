import { dbConnect } from "@utils/database";
import Prompt from "@models/prompt";
export async function GET(request) {
  try {
    // Connect to your database
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const param = searchParams.get("search"); // if null we return all data

    let query;
    if (param) {
      // Create a regular expression from the search parameter
      const regex = new RegExp(param, "i"); // 'i' makes the regex case insensitive

      // Create a query object to search for the parameter in the 'prompt', 'tag', fields
      query = {
        $or: [{ prompt: { $regex: regex } }, { tag: { $regex: regex } }],
      };
    }

    const prompts = await Prompt.find(query).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Handle any errors that occur during the database operations
    return new Response(
      JSON.stringify({
        error: "An error occurred while fetching data from the database.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
