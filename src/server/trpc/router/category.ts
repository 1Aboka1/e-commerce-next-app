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
	}),
    createSubcategory: protectedProcedure
	.input(
	    z.object({
		name: z.string(),
		description: z.string(),
		image: z.string(),
		categoryId: z.string(),
	    })
	)
	.mutation(async ({ ctx, input }) => {
	    try {
		await ctx.prisma.category.update({
		    where: {
			id: input.categoryId,
		    },
		    data: {
			subcategories: {
			    create: {
				name: input.name,
				description: input.description,
				image: input.image,
			    }
			}
		    }
		})
	    } catch(error) {
		console.error(error)
	    }
	}),
    createFilter: protectedProcedure
	.input(
	    z.object({
		name: z.string(),
		description: z.string(),
		options: z.array(z.string()),
		subcategoryId: z.string(),
	    })
	)
	.mutation(async ({ ctx, input }) => {
	    try {
		await ctx.prisma.subcategory.update({
		    where: {
			id: input.subcategoryId,
		    },
		    data: {
			filters: {
			    create: {
				name: input.name,
				description: input.description,
				options: input.options,
			    }
			}
		    }
		})
	    } catch(error) {
		console.error(error)
	    }
	})
});
