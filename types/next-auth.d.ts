import { DefaultSession } from "next-auth";

// By declaring a module, we can extend the existing NextAuth interfaces.
declare module "next-auth" {
    /**
     * The shape of the user object in the session.
     * We are adding our custom 'id' property.
     * `& DefaultSession["user"]` ensures we keep the original properties like name, email, image.
     */
    interface Session {
        user: {
            id: string;
        } & DefaultSession["user"];
    }
}