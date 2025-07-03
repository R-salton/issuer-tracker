import { z } from "zod/v3";

export const createIssueSchema = z.object({
    title: z.string().min(1, "Title must be at least 1 character").max(255),
    description: z.string().min(1, "Description must be at least 1 character").max(1000),
});
