import { renderHook, act } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { CartProvider, useCart } from "@/contexts/CartContext";
import type { Product } from "@/types/product";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <CartProvider>{children}</CartProvider>
);

const mockProduct: Product = {
  id: "prod_test",
  name: "Test Product",
  description: "A mocked product for tests",
  price: 49.99,
  image: "https://example.com/product.jpg",
  category: "Test",
  stock: 2,
  rating: 5,
  reviews: 10,
};

describe("CartContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("adds items to the cart and updates totals", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 1);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalPrice).toBeCloseTo(49.99);
  });

  it("caps quantities at available stock", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 5);
    });

    expect(result.current.items[0]?.quantity).toBe(mockProduct.stock);
  });

  it("removes items when quantity drops to zero", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct, 1);
      result.current.updateQuantity(mockProduct.id, 0);
    });

    expect(result.current.items).toHaveLength(0);
  });
});

