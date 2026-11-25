export const ORDER_STATUSES = [
  "Not Paid!",
  "Paid",
  "Pending",
  "Being prepared!",
  "Out for delivery",
  "delivered",
  "Cancelled",
] as const;

export type OrderStatusValue = (typeof ORDER_STATUSES)[number];
