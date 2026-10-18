import { z } from "zod";

export const OrderSchema = z.object({
  userEmail: z.string().email("Invalid email format"),
  address: z.string().min(5, "Address is too short"),
  phone: z.string().min(10, "Invalid phone number"),
  products: z.array(z.any()).min(1, "Cart cannot be empty"),
  price: z.number().positive("Price must be positive"),
  status: z.string().optional(),
});

export const OrderStatusSchema = z.enum([
  "Pending",
  "Paid",
  "Being prepared!",
  "Delivered",
  "Cancelled",
]);

export type OrderInput = z.infer<typeof OrderSchema>;
export type OrderStatus = z.infer<typeof OrderStatusSchema>;
