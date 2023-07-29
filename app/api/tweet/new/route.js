import { connectToDB } from "@utils/database";
import Tweet from "@models/tweet";

export const POST = async (req) => {
  const { userId, tweet } = await req.json();

  try {
    await connectToDB();

    const newTweet = new Tweet({
      creator: userId,
      tweet,
      createdAt: Date.now(),
    });

    await newTweet.save();

    return new Response(JSON.stringify(newTweet), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new tweet", { status: 500 });
  }
};
