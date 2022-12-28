import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import MailRuProvider from 'next-auth/providers/mailru'
import bcrypt from 'bcryptjs'
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
    // Include user.id on session
    callbacks: {
	async session({ session, user }) {
	    if (session.user) {
		session.user.id = user.id;
	    }
	    return session;
	},
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
	MailRuProvider({
	    clientId: env.MAILRU_CLIENT_ID,
	    clientSecret: env.MAILRU_CLIENT_SECRET,
	}),
	CredentialsProvider({
	    name: 'Credentials',
	    credentials: {
		email: {
		    label: 'email',
		    type: 'text',
		},
		password: {
		    label: 'password',
		    type: 'text',
		},
	    },
	    async authorize(credentials, req) {
		const user = await prisma.user.findFirst({
		    where: {
			email: credentials?.email,
		    }
		})
		if(!user) {
		    throw new Error("No user was found")
		}
		const passwordCheck = bcrypt.compare(credentials?.password as string, user.password as string)
		if(!passwordCheck) {
		    throw new Error('Email or password doesn\'t match')
		}
		return user
	    }
	})
    ],
};

export default NextAuth(authOptions);
