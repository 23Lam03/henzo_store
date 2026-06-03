import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { WishlistItem, Product } from '../../types';
import { STORAGE_KEYS } from '../../constants';
import { getStorageItem, setStorageItem } from '../../utils';

interface WishlistContextValue {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleItem: (product: Product) => void;
  clearWishlist: () => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>(() =>
    getStorageItem<WishlistItem[]>(STORAGE_KEYS.wishlist, [])
  );

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.wishlist, items);
  }, [items]);

  const addItem = useCallback((product: Product) => {
    setItems(prev => {
      if (prev.some(i => i.product.id === product.id)) return prev;
      return [...prev, { product, addedAt: new Date().toISOString() }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => items.some(i => i.product.id === productId),
    [items]
  );

  const toggleItem = useCallback((product: Product) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  }, [isInWishlist, removeItem, addItem]);

  const clearWishlist = useCallback(() => setItems([]), []);

  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        toggleItem,
        clearWishlist,
        count: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextValue => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
