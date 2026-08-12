import { z } from "zod";

export const quoteRequestSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  phone: z.string().min(6).max(20),
  email: z.string().email().max(255),
  service: z.string().min(1),
  project: z.string().max(200).optional(),
  budget: z.string().max(50).optional(),
  desiredDate: z.string().optional(),
  message: z.string().min(10).max(5000),
  honeypot: z.string().max(0).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(255),
  phone: z.string().max(20).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(5000),
  honeypot: z.string().max(0).optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email().max(255),
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
