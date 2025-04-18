export type OrderStatus =
  | "pending"
  | "processing"
  | "completed"
  | "delivered"
  | "canceled"
  | "returned";

export interface Order {
  id: string;
  customerName: string;
  date: string;
  amount: number;
  platform: string;
  status: OrderStatus;
  items?: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
}
