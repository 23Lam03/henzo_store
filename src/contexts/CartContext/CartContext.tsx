import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { CartItem, Product } from '../../types';
import { STORAGE_KEYS } from '../../constants';
import { getStorageItem, setStorageItem } from '../../utils';

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  totalOriginalPrice: number;
  savings: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleSelect: (productId: string) => void;
  selectAll: (selected: boolean) => void;
  clearCart: () => void;
  clearSelectedItems: () => void;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() =>
    getStorageItem<CartItem[]>(STORAGE_KEYS.cart, [])
  );

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.cart, items);
  }, [items]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items
    .filter(i => i.selected)
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalOriginalPrice = items
    .filter(i => i.selected)
    .reduce((sum, item) => sum + item.product.originalPrice * item.quantity, 0);
  const savings = totalOriginalPrice - totalPrice;

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity, selected: true }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => i.product.id !== productId));
    } else {
      setItems(prev =>
        prev.map(i =>
          i.product.id === productId ? { ...i, quantity } : i
        )
      );
    }
  }, []);

  const toggleSelect = useCallback((productId: string) => {
    setItems(prev =>
      prev.map(i =>
        i.product.id === productId ? { ...i, selected: !i.selected } : i
      )
    );
  }, []);

  const selectAll = useCallback((selected: boolean) => {
    setItems(prev => prev.map(i => ({ ...i, selected })));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const clearSelectedItems = useCallback(() => {
    setItems(prev => prev.filter(item => !item.selected));
  }, []);

  const getItemCount = useCallback(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        totalOriginalPrice,
        savings,
        addItem,
        removeItem,
        updateQuantity,
        toggleSelect,
        selectAll,
        clearCart,
        clearSelectedItems,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
