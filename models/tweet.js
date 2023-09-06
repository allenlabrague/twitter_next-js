import { Schema, model, models } from "mongoose";
import moment from "moment";

const TweetSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tweet: {
    type: String,
    required: [true, "Tweet is required."],
  },
  createdAt: {
    type: Date, // Use the Date data type for storing dates
    default: Date.now, // Set the default value to the current date and time
  },
});

const Tweet = models.Tweet || model("Tweet", TweetSchema);

TweetSchema.methods.getFormattedTime = function () {
  return moment(this.createdAt).format("HH"); // 'HH' format represents the hour in 24-hour format
};

export default Tweet;
