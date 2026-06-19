import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { Store, User, Order, Payment, Review, Promotion, SupportTicket } from '../../types';
import {
  MOCK_ADMIN_STORES,
  MOCK_ADMIN_CUSTOMERS,
  MOCK_ADMIN_ORDERS,
  MOCK_ADMIN_PAYMENTS,
  MOCK_ADMIN_REVIEWS,
  MOCK_ADMIN_PROMOTIONS,
  MOCK_ADMIN_TICKETS,
  ADMIN_STATS,
} from '../../data/adminData';

// ─── Types ────────────────────────────────────────────────────────────────────
interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  totalStores: number;
  totalPayments: number;
  totalReviews: number;
  totalPromotions: number;
  totalTickets: number;
}

interface AdminContextValue {
  // Data
  stores: Store[];
  customers: User[];
  orders: Order[];
  payments: Payment[];
  reviews: Review[];
  promotions: Promotion[];
  tickets: SupportTicket[];
  stats: AdminStats;

  // Store actions
  addStore: (store: Store) => void;
  updateStore: (id: string, data: Partial<Store>) => void;
  deleteStore: (id: string) => void;
  lockStore: (id: string) => void;
  unlockStore: (id: string) => void;

  // Customer actions
  updateCustomer: (id: string, data: Partial<User>) => void;
  lockCustomer: (id: string) => void;
  unlockCustomer: (id: string) => void;
  deleteCustomer: (id: string) => void;

  // Order actions
  updateOrderStatus: (id: string, status: Order['status']) => void;

  // Review actions
  approveReview: (id: string) => void;
  hideReview: (id: string) => void;
  deleteReview: (id: string) => void;

  // Promotion actions
  addPromotion: (promo: Promotion) => void;
  updatePromotion: (id: string, data: Partial<Promotion>) => void;
  deletePromotion: (id: string) => void;

  // Ticket actions
  updateTicketStatus: (id: string, status: SupportTicket['status']) => void;
  assignTicket: (id: string, assignee: string) => void;

  // Loading states
  isLoading: boolean;
  setLoading: (v: boolean) => void;
}

// ─── Context ───────────────────────────────────────────────────────────────────
const AdminContext = createContext<AdminContextValue | null>(null);

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
};

// ─── Provider ─────────────────────────────────────────────────────────────────
export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [stores, setStores] = useState<Store[]>(MOCK_ADMIN_STORES);
  const [customers, setCustomers] = useState<User[]>(MOCK_ADMIN_CUSTOMERS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ADMIN_ORDERS);
  const [reviews, setReviews] = useState<Review[]>(MOCK_ADMIN_REVIEWS);
  const [promotions, setPromotions] = useState<Promotion[]>(MOCK_ADMIN_PROMOTIONS);
  const [tickets, setTickets] = useState<SupportTicket[]>(MOCK_ADMIN_TICKETS);
  const [isLoading] = useState(false);

  // Stores
  const addStore = useCallback((store: Store) => {
    setStores(prev => [store, ...prev]);
  }, []);

  const updateStore = useCallback((id: string, data: Partial<Store>) => {
    setStores(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
  }, []);

  const deleteStore = useCallback((id: string) => {
    setStores(prev => prev.filter(s => s.id !== id));
  }, []);

  const lockStore = useCallback((id: string) => {
    setStores(prev => prev.map(s => s.id === id ? { ...s, isLocked: true } : s));
  }, []);

  const unlockStore = useCallback((id: string) => {
    setStores(prev => prev.map(s => s.id === id ? { ...s, isLocked: false } : s));
  }, []);

  // Customers
  const updateCustomer = useCallback((id: string, data: Partial<User>) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
  }, []);

  const lockCustomer = useCallback((id: string) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, isLocked: true } : c));
  }, []);

  const unlockCustomer = useCallback((id: string) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, isLocked: false } : c));
  }, []);

  const deleteCustomer = useCallback((id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  }, []);

  // Orders
  const updateOrderStatus = useCallback((id: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o));
  }, []);

  // Reviews
  const approveReview = useCallback((id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, isApproved: true } : r));
  }, []);

  const hideReview = useCallback((id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, isHidden: true } : r));
  }, []);

  const deleteReview = useCallback((id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
  }, []);

  // Promotions
  const addPromotion = useCallback((promo: Promotion) => {
    setPromotions(prev => [promo, ...prev]);
  }, []);

  const updatePromotion = useCallback((id: string, data: Partial<Promotion>) => {
    setPromotions(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  }, []);

  const deletePromotion = useCallback((id: string) => {
    setPromotions(prev => prev.filter(p => p.id !== id));
  }, []);

  // Tickets
  const updateTicketStatus = useCallback((id: string, status: SupportTicket['status']) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t));
  }, []);

  const assignTicket = useCallback((id: string, assignee: string) => {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, assignee, status: 'open' as const, updatedAt: new Date().toISOString() } : t));
  }, []);

  return (
    <AdminContext.Provider value={{
      stores, customers, orders, payments: MOCK_ADMIN_PAYMENTS, reviews, promotions, tickets,
      stats: ADMIN_STATS,
      addStore, updateStore, deleteStore, lockStore, unlockStore,
      updateCustomer, lockCustomer, unlockCustomer, deleteCustomer,
      updateOrderStatus,
      approveReview, hideReview, deleteReview,
      addPromotion, updatePromotion, deletePromotion,
      updateTicketStatus, assignTicket,
      isLoading, setLoading: () => {},
    }}>
      {children}
    </AdminContext.Provider>
  );
};
