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
  addItem: (product: Product, quantity?: number) => boolean;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleSelect: (productId: string) => void;
  selectAll: (selected: boolean) => void;
  clearCart: () => void;
  clearSelectedItems: () => void;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextValue | null>(null);

const getUserIdFromStorage = (): string | null => {
  try {
    const userStr = localStorage.getItem('henzo_auth_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return user?.id || null;
    }
    const sessionUser = sessionStorage.getItem('henzo_auth_user');
    if (sessionUser) {
      const user = JSON.parse(sessionUser);
      return user?.id || null;
    }
  } catch { /* ignore */ }
  return null;
};

const getCartStorageKey = (userId: string | null) =>
  userId ? `${STORAGE_KEYS.cart}_${userId}` : STORAGE_KEYS.cart;

const loadCart = (userId: string | null): CartItem[] => {
  const key = getCartStorageKey(userId);
  return getStorageItem<CartItem[]>(key, []);
};

const saveCart = (userId: string | null, items: CartItem[]) => {
  const key = getCartStorageKey(userId);
  setStorageItem(key, items);
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(() => getUserIdFromStorage());

  // Load cart whenever auth userId changes
  useEffect(() => {
    const userId = getUserIdFromStorage();
    setCurrentUserId(userId);
    const stored = loadCart(userId);
    setItems(stored);
  }, []);

  // Re-check auth on storage events (cross-tab logout/login)
  useEffect(() => {
    const handleStorage = () => {
      const userId = getUserIdFromStorage();
      setCurrentUserId(userId);
      setItems(loadCart(userId));
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('henzo-auth-change', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('henzo-auth-change', handleStorage);
    };
  }, []);

  // Persist cart on change
  useEffect(() => {
    saveCart(currentUserId, items);
  }, [items, currentUserId]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items
    .filter(i => i.selected)
    .reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalOriginalPrice = items
    .filter(i => i.selected)
    .reduce((sum, item) => sum + item.product.originalPrice * item.quantity, 0);
  const savings = totalOriginalPrice - totalPrice;

  const addItem = useCallback((product: Product, quantity = 1): boolean => {
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
    return true;
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
