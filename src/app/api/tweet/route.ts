import Tweet from "../../../../models/TweetSchema";
import {getServerSession} from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import {initMongoose} from "../../../../lib/mongoose";


export async function POST(req : Request) {
    const session = await getServerSession(authOptions);
    await initMongoose();
    const body = await req.json();
    const { username, text } = body;
    const newTweet = new Tweet({username: username, text: text, email:session?.user.email});
    await newTweet.save();
    const data = { message: "Success!" };
    return NextResponse.json(data, { status: 200 });
}

export async function GET() {
    await initMongoose();
    const data = await Tweet.find()
    return NextResponse.json(data, { status: 200 });
}