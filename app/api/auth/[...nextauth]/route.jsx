import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { dbConnect } from "@utils/database";

import NextAuth from "next-auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await dbConnect();

        //check if the user exists in the database
        let user = await User.findOne({ email: profile.email });

        //If user doesn't exist create it in the dabatase
        if (!user) {
          const newUser = new User({
            email: profile.email,
            username: profile.name.replace(" ", ""),
            image: profile.picture,
          });
          user = await newUser.save();
        }

        return true; // Allow the sign-in attempt
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
