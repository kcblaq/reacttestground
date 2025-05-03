import {z} from "zod";

export const regSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email(),
    bio: z.string().min(15)

})

export type RegSchema = z.infer<typeof regSchema>;
