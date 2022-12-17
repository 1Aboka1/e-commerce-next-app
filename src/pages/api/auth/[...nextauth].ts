import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
import { EmailProvider } from "next-auth/providers/email.js";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
    // Include user.id on session
    callbacks: {
	async jwt({ token, user, account, profile, isNewUser }) {
	    console.log('HERE SHOULD HAVE BEEN JWT')
	    if(user) {
		token.email = user?.email
		token.name = user?.name
	    }
	    return token
	},
	async session({ session, user }) {
	    console.log('SOMETHING IS FUCKING WRONG')
	    if (session.user) {
		session.user.id = user.id;
	    }
	    return session;
	},
    },
    session: {
	strategy: 'jwt',
	maxAge: 30 * 24 * 60 * 60,
    },
    jwt: {
	maxAge: 60 * 60 * 24 * 30,
    },
    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma),
    providers: [
	DiscordProvider({
	    clientId: env.DISCORD_CLIENT_ID,
	    clientSecret: env.DISCORD_CLIENT_SECRET,
	}),
	GoogleProvider({
	    clientId: env.GOOGLE_CLIENT_ID,
	    clientSecret: env.GOOGLE_CLIENT_SECRET,
	}),
	CredentialsProvider({
	    name: 'Credentials',
	    credentials: {},
	    async authorize(credentials, req) {
		const user = await prisma.user.findFirst({
		    where: {
			email: credentials?.email,
		    }
		})
		if(!user) {
		    throw new Error("No user was found")
		}
		const passwordCheck = bcrypt.compare(credentials?.password, user.password)
		if(!passwordCheck) {
		    throw new Error('Email or password doesn\'t match')
		}
		return user
	    }
	})
    ],
};

export default NextAuth(authOptions);
