import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import client from "./mongoClient";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  // @ts-ignore
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.local.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.local.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};
