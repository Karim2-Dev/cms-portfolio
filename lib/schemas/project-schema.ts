import { z } from "zod";

const domainRegex = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([\/?#].*)?$/;

const domainField = (message: string) => z.string().regex(domainRegex, message);

export const projectSchema = z
  .object({
    title: z.string().min(2, "must full name min length 2 characters"),
    description: z.string().optional(),
    tags: z
      .array(z.string().min(2, "technology must be 2 characters"))
      .min(1, "must have at least one technology"),
    "github-url": domainField("invalid domain"),
    "live-url": domainField("invalid domain").optional().or(z.literal("")),
    image: z.instanceof(File).optional(),
  })
  .refine(
    (data) => {
      if (data["live-url"] && data["live-url"].length > 0) {
        return !!data["github-url"] && data["github-url"].length > 0;
      }
      return true;
    },
    {
      message: "Must enter the github-url",
      path: ["github-url"],
    },
  );

export type projectFormData = z.infer<typeof projectSchema>;
