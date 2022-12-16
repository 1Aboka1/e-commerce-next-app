import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import { EmailProvider } from "next-auth/providers/email.js";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

let userAccount = null

const confirmPasswordHash = (plainPassword: string, hashedPassword: string) => {
    return new Promise(resolve => {
	bcrypt.compare(plainPassword, hashedPassword, function(err, res) {
	    resolve(res)
	})
    })
}

export const authOptions: NextAuthOptions = {
    session: {
	maxAge: 30 * 24 * 60 * 60,
    },
    jwt: {
	maxAge: 30 * 24 * 60 * 60,
    },
    // Include user.id on session
    callbacks: {
	session({ session, user }) {
	    if (session.user) {
		session.user.id = user.id;
	    }
	    return session;
	},
	async signIn({ user, account, profile, email, credentials }) {
	    try {
		if(user.id) {
		    return true
		} else {
		    return false
		}
	    } catch(error) {
		console.log('Sign in callback error', error)
	    }
	}
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
		try {
		    const user = await prisma.user.findFirst({
			where: {
			    email: credentials?.email,
			}
		    })
		    if(user) {
			const res = await confirmPasswordHash(credentials?.password, user.password!)
			if(res === true) {
			    userAccount = {
				userId: user.id,
			    }
			    return userAccount
			} else {
			    console.log("password incorrect")
			    return null
			}
		    } else {
			return null
		    }
		} catch(error) {
		    console.log("Authorize error", error)
		}
	    }
	})
    ],
};

export default NextAuth(authOptions);
