/**
 * Standalone eCommerce service for local execution.
 */
export async function buyNow(
  items: Array<{ collectionId: string; itemId: string; quantity?: number }>
): Promise<void> {
  if (items.length === 0) {
    throw new Error("At least one item is required for checkout");
  }
  console.log("Mock buyNow initiated for items:", items);
}

export function useEcomService() {
  const addToCart = async (
    items: Array<{ collectionId: string; itemId: string; quantity?: number }>
  ): Promise<void> => {
    console.log("Mock addToCart for items:", items);
  };

  const checkout = async (): Promise<void> => {
    console.log("Mock checkout initiated");
  };

  return {
    isCartAvailable: true,
    addToCart,
    checkout,
  };
}
