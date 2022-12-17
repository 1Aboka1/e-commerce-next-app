import {z} from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
    getSession: publicProcedure.query(({ ctx }) => {
	return ctx.session;
    }),
    getSecretMessage: protectedProcedure.query(() => {
	return "you can now see this secret message!";
    }),
    createUser: publicProcedure
	.input(
	    z.object({
		email: z.string(),
		password: z.string(),
		name: z.string(),
	    })
	)
	.mutation(async ({ ctx, input }) => {
	    try {
		await ctx.prisma.user.create({
		    data: {
			name: input.name,
			email: input.email,
			password: input.password,
		    }
		})
	    } catch(error) {
		console.log(error)
	    }
	}),
});
