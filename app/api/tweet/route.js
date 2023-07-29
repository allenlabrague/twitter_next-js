import { connectToDB } from "@utils/database";
import Tweet from "@models/tweet";

export const GET = async (req) => {
  try {
    await connectToDB();

    const tweets = await Tweet.find({}).populate("creator");

    return new Response(JSON.stringify(tweets), { status: 200 });
  } catch (error) {
    return new Response("Failed to fectch all tweets", { status: 500 });
  }
};
