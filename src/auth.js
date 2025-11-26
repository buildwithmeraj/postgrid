import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const client = new MongoClient(process.env.MONGODB_URI);
const secret = process.env.NEXTAUTH_SECRET;

if (!secret) throw new Error("NEXTAUTH_SECRET is not defined");

async function getDatabase() {
  if (!client.isConnected?.()) await client.connect();
  return client.db("usersDB");
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        try {
          const db = await getDatabase();
          const usersCollection = db.collection("users");

          const user = await usersCollection.findOne({
            email: credentials.email,
          });

          if (!user) throw new Error("No user found with this email");

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) throw new Error("Invalid password");

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.image || null,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          const db = await getDatabase();
          const usersCollection = db.collection("users");

          const existingUser = await usersCollection.findOne({
            email: user.email,
          });

          if (!existingUser) {
            await usersCollection.insertOne({
              email: user.email,
              name: user.name,
              image: user.image,
              provider: "google",
              createdAt: new Date(),
            });
          }
        } catch (error) {
          console.error("Error saving Google user:", error);
        }
      }
      return true;
    },

    async jwt({ token, user, account }) {
      // Add user info to token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image || null;

        // Generate custom accessToken
        if (!token.accessToken) {
          token.accessToken = jwt.sign(
            {
              email: user.email,
              name: user.name,
              picture: user.image || null,
              sub: user.id,
            },
            secret,
            { expiresIn: "30d", algorithm: "HS256" }
          );
        }
      }

      // For OAuth accounts, keep their access_token if available
      if (account?.access_token && !token.accessToken) {
        token.accessToken = account.access_token;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture || null;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: secret,
});
