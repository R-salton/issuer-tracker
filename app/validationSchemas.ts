import { z } from "zod/v3";

export const createIssueSchema = z.object({
    title: z.string().min(1, "Title must be at least 1 character").max(255),
    description: z.string().min(1, "Description must be at least 1 character").max(1000),
    status: z.string().optional(),
    createdByUserId : z.string().min(1,"Error: User is required").max(255).optional().nullable(),
    
});

export const patchIssueShema = z.object({
   title: z.string().min(3, "Title must be at least 3 characters").optional(),
  description: z.string().min(5, "Description must be at least 5 characters").optional(),
  status: z.string().optional(),
  assignedToUserId: z.string().min(1,"Assigned user is required").max(255).optional().nullable(),
})
