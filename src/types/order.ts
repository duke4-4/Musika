export type OrderStatus = "pending_payment" | "paid" | "processing" | "shipped" | "delivered" | "cancelled";

export interface ShippingAddress {
  full_name?: string | null;
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  product?: {
    name: string;
    image: string;
  };
}

export interface Order {
  id: string;
  user_id: string;
  status: OrderStatus;
  amount_subtotal: number;
  amount_total: number;
  currency: string;
  shipping_address: ShippingAddress | null;
  stripe_session_id?: string | null;
  payment_intent?: string | null;
  tracking_number?: string | null;
  created_at: string;
  updated_at?: string;
  items?: OrderItem[];
}

