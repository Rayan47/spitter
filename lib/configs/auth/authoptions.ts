import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../mongodb"; // Import your client utility

if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("Missing environment variable GOOGLE_CLIENT_ID");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing environment variable GOOGLE_CLIENT_SECRET");
}


export const authOptions: AuthOptions = {
    // Add the adapter
    adapter: MongoDBAdapter(clientPromise),

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    // When using a database adapter, the "database" session strategy is the default.
    session: {
        strategy: "jwt",
    },
    callbacks :{
        session : async({token, session}) =>{
            if (session?.user && token?.sub){
                session.user.id = token.sub;
                console.log(session.user.id);
            }
            return session;
        }
    }


};
