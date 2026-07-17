import { z } from "zod";

export const profileSchema = z
  .object({
    fullName: z.string().min(2, "must full name min length 2 characters"),
    email: z.string().email("it's not email"),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(8, "must 8 characters")
      .optional()
      .or(z.literal("")),
    image: z.instanceof(File).optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword.length > 0) {
        return !!data.currentPassword && data.currentPassword.length > 0;
      }
      return true;
    },
    {
      message: "Must enter the current password.",
      path: ["currentPassword"],
    },
  );

export type ProfileFormData = z.infer<typeof profileSchema>;
