import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (req) => {
  try {
    await connectToDB();

    const users = await User.find({}).populate("username");

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Failed to fectch all users", { status: 500 });
  }
};
