const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface CheckoutItem {
  productId: string;
  quantity: number;
}

export interface ShippingPayload {
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface CheckoutPayload {
  items: CheckoutItem[];
  shipping: ShippingPayload;
  customerEmail: string;
}

export interface CheckoutResponse {
  sessionId: string;
  orderId: string;
}

export const createCheckoutSession = async (
  payload: CheckoutPayload,
  accessToken: string
): Promise<CheckoutResponse> => {
  if (!API_BASE_URL) {
    throw new Error("Missing VITE_API_BASE_URL environment variable");
  }

  const response = await fetch(`${API_BASE_URL}/api/checkout/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody?.message ?? "Unable to create checkout session");
  }

  return response.json();
};

