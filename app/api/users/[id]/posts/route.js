import { connectToDB } from "@utils/database";
import Tweet from "@models/tweet";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const tweets = await Tweet.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(tweets), { status: 200 });
  } catch (error) {
    return new Response("Failed to fectch all tweets", { status: 500 });
  }
};
