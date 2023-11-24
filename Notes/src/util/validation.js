import { z } from 'zod';

export const User= z.object({
  id: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .refine((value) => /[A-Z]/.test(value), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((value) => /[a-z]/.test(value), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine((value) => /[0-9]/.test(value), {
      message: 'Password must contain at least one digit',
    }),
  confirmPassword: z.string().min(8).optional(),
  createdAt: z.string(),
});