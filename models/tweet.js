import { Schema, model, models } from "mongoose";

const TweetSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tweet: {
    type: String,
    required: [true, "Tweet is required."],
  },
});

const Tweet = models.Tweet || model("Tweet", TweetSchema);

export default Tweet;
