import { z } from "zod";
import { ORDER_STATUSES } from "@/utils/order-statuses";

export const OrderSchema = z.object({
  userEmail: z.string().email("Invalid email format"),
  products: z.array(z.any()).min(1, "Cart cannot be empty"),
  price: z.number().positive("Price must be positive"),
  status: z.enum(ORDER_STATUSES).default("Not Paid!"),
});

export const OrderStatusSchema = z.object({
  status: z.enum(ORDER_STATUSES),
});

export type OrderInput = z.infer<typeof OrderSchema>;
export type OrderStatus = z.infer<typeof OrderStatusSchema>["status"];
