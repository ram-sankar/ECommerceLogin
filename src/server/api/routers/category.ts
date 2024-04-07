import { createTRPCRouter, publicProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
    getCategories: publicProcedure
        .query(async ({ input, ctx }) => {
            try {
                const pageSize = 10; // Number of categories per page
            const categories = await ctx.db?.product_categories.findMany({
                take: pageSize,
            });
            return categories;
            } catch (error) {
                console.error("Error fetching categories:", error);
                throw new Error("Failed to fetch categories.");
            }
        }),
});
