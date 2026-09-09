import { create } from 'zustand';

export interface CartItem {
  id: string;
  collectionId: string;
  itemId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface AddToCartInput {
  collectionId: string;
  itemId: string;
  quantity?: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  addingItemId: string | null;
  isCheckingOut: boolean;
  error: string | null;
}

interface CartActions {
  addToCart: (input: AddToCartInput) => Promise<void>;
  removeFromCart: (item: CartItem) => void;
  updateQuantity: (item: CartItem, quantity: number) => void;
  clearCart: () => void;
  checkout: () => Promise<void>;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
}

export const useCartStore = create<CartState & { actions: CartActions }>((set, get) => ({
  items: [],
  isOpen: false,
  isLoading: false,
  addingItemId: null,
  isCheckingOut: false,
  error: null,

  actions: {
    addToCart: async () => {
      // Mock cart action
    },
    removeFromCart: (item) => {
      set({ items: get().items.filter((i) => i.id !== item.id) });
    },
    updateQuantity: (item, quantity) => {
      if (quantity <= 0) {
        get().actions.removeFromCart(item);
        return;
      }
      set({
        items: get().items.map((i) => (i.id === item.id ? { ...i, quantity } : i)),
      });
    },
    clearCart: () => {
      set({ items: [] });
    },
    checkout: async () => {
      set({ isCheckingOut: true });
      setTimeout(() => set({ isCheckingOut: false }), 1000);
    },
    toggleCart: () => {
      set({ isOpen: !get().isOpen });
    },
    openCart: () => {
      set({ isOpen: true });
    },
    closeCart: () => {
      set({ isOpen: false });
    },
  },
}));

export const useCart = () => {
  const store = useCartStore();
  const totalItems = store.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = store.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items: store.items,
    totalItems,
    subtotal,
    isOpen: store.isOpen,
    isLoading: store.isLoading,
    isAdding: (itemId: string) => store.addingItemId === itemId,
    isCheckingOut: store.isCheckingOut,
    error: store.error,
    ...store.actions,
  };
};
