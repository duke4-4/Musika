import request from "supertest";
import { describe, beforeEach, it, expect, vi } from "vitest";

vi.mock("stripe", () => {
  return {
    default: class Stripe {
      checkout = {
        sessions: {
          create: vi.fn().mockResolvedValue({ id: "cs_test_123" }),
        },
      };
      webhooks = {
        constructEvent: vi.fn(),
      };
    },
  };
});

vi.mock("resend", () => ({
  Resend: class Resend {
    emails = { send: vi.fn() };
  },
}));

const mockSupabase = {
  auth: {
    getUser: vi.fn().mockResolvedValue({
      data: { user: { id: "user_123" } },
      error: null,
    }),
  },
  from: vi.fn((table: string) => {
    if (table === "products") {
      return {
        select: () => ({
          in: () =>
            Promise.resolve({
              data: [
                {
                  id: "prod_123",
                  name: "Mock Product",
                  description: "Desc",
                  price: 25,
                  image: "",
                  category: "Test",
                  stock: 10,
                },
              ],
              error: null,
            }),
        }),
      };
    }
    if (table === "orders") {
      return {
        insert: () => ({
          select: () => ({
            single: () =>
              Promise.resolve({
                data: { id: "order_123" },
                error: null,
              }),
          }),
        }),
        update: () => ({
          eq: () => Promise.resolve({ data: null, error: null }),
        }),
      };
    }
    if (table === "order_items") {
      return {
        insert: () => Promise.resolve({ data: null, error: null }),
      };
    }
    return {};
  }),
};

vi.mock("@supabase/supabase-js", () => ({
  createClient: () => mockSupabase,
}));

describe("/api/checkout/session", () => {
  beforeEach(async () => {
    process.env.STRIPE_SECRET_KEY = "sk_test";
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
    process.env.VITE_SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service_role";
    process.env.CLIENT_URL = "http://localhost:5173";
    process.env.VITE_APP_URL = "http://localhost:5173";
    process.env.RESEND_API_KEY = "re_test";
    process.env.RESEND_FROM_EMAIL = "orders@example.com";
  });

  it("rejects requests without authorization", async () => {
    const { app } = await import("../index");
    const response = await request(app).post("/api/checkout/session").send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toContain("Missing authorization token");
  });

  it("validates cart items before processing", async () => {
    const { app } = await import("../index");
    const response = await request(app)
      .post("/api/checkout/session")
      .set("Authorization", "Bearer test-token")
      .send({
        items: [],
        shipping: null,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Cart items are required");
  });

  it("creates a checkout session when payload is valid", async () => {
    const { app } = await import("../index");
    const response = await request(app)
      .post("/api/checkout/session")
      .set("Authorization", "Bearer test-token")
      .send({
        items: [{ productId: "prod_123", quantity: 2 }],
        shipping: {
          firstName: "John",
          lastName: "Doe",
          line1: "123 Main",
          line2: "",
          city: "City",
          state: "State",
          postalCode: "12345",
          country: "US",
          phone: "1234567890",
        },
        customerEmail: "john@example.com",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      sessionId: "cs_test_123",
      orderId: "order_123",
    });
  });
});

