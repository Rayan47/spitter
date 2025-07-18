import mongoose from "mongoose";
const TweetSchema = new mongoose.Schema({

    username: String,
    email: String,
    text: String,


});


const Tweet = mongoose.model("Tweet", TweetSchema);

export default Tweet;