import {z} from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const categoryRouter = router({
    createCategory: protectedProcedure
	.input(
	    z.object({
		name: z.string(),
		description: z.string(),
		image: z.string(),
	    })
	)
	.mutation(async ({ ctx, input }) => {
	    try {
		await ctx.prisma.category.create({
		    data: {
			name: input.name,
			description: input.description,
			image: input.image,
		    }
		})
	    } catch(error) {
		console.error(error)
	    }
	})
});
