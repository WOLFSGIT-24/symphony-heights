import { create } from 'zustand';

export const DEFAULT_CURRENCY = 'INR';

export function formatPrice(amount: number, currencyCode: string = DEFAULT_CURRENCY): string {
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
}

interface CurrencyState {
  currency: string;
  isLoading: boolean;
  error: string | null;
}

const useCurrencyStore = create<CurrencyState>(() => ({
  currency: DEFAULT_CURRENCY,
  isLoading: false,
  error: null,
}));

export const useCurrency = () => {
  const store = useCurrencyStore();
  return {
    currency: store.currency,
    isLoading: store.isLoading,
    error: store.error,
  };
};
