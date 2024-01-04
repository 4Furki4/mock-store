import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters long",
    }).max(150, {
        message: "Title must be at most 150 characters long",
    }),
    price: z
        .coerce.number().min(0, {
            message: "Price must be at least 0",
        }),
    description: z.string().min(5, {
        message: "Description must be at least 2 characters long",
    }).max(1000, {
        message: "Description must be at most 1000 characters long",
    }),
    category: z.string().min(2, {
        message: "Category must be at least 2 characters long",
    }).max(50, {
        message: "Category must be at most 50 characters long",
    }),
})