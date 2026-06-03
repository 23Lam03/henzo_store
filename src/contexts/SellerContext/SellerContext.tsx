import {
  createContext, useContext, useState, useCallback, type ReactNode
} from 'react';
import type {
  SellerStore, SellerOrder, SellerPayment, SellerReview,
  SellerPromotion, SellerSupportTicket, SellerInventoryItem,
  SellerShipping, SellerNotification, SellerDashboardStats,
  DailyRevenue, MonthlyData, OrderStatus
} from '../../types/seller';
import {
  currentStore, mockSellerOrders, mockSellerPayments, mockSellerReviews,
  mockSellerPromotions, mockSellerTickets, mockSellerInventory,
  mockSellerShippings, mockSellerNotifications, mockDailyRevenue,
  mockMonthlyData, mockSellerProducts
} from '../../data/sellerData';

interface SellerContextValue {
  store: SellerStore;
  stats: SellerDashboardStats;
  orders: SellerOrder[];
  payments: SellerPayment[];
  reviews: SellerReview[];
  promotions: SellerPromotion[];
  tickets: SellerSupportTicket[];
  inventory: SellerInventoryItem[];
  shippings: SellerShipping[];
  notifications: SellerNotification[];
  dailyRevenue: DailyRevenue[];
  monthlyData: MonthlyData[];

  // Actions
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateReviewVisibility: (reviewId: string, hidden: boolean) => void;
  respondToReview: (reviewId: string, response: string) => void;
  updatePromotionStatus: (promotionId: string, status: SellerPromotion['status']) => void;
  createPromotion: (promo: Omit<SellerPromotion, 'id' | 'createdAt' | 'usedCount'>) => void;
  updateTicketStatus: (ticketId: string, status: SellerSupportTicket['status']) => void;
  addTicketMessage: (ticketId: string, content: string) => void;
  updateInventoryStock: (sku: string, newStock: number) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;
  getOrderById: (id: string) => SellerOrder | undefined;
  getProductById: (id: string) => typeof mockSellerProducts[0] | undefined;
}

const SellerContext = createContext<SellerContextValue | null>(null);

export const useSeller = () => {
  const ctx = useContext(SellerContext);
  if (!ctx) throw new Error('useSeller must be used within SellerProvider');
  return ctx;
};

const calculateStats = (orders: SellerOrder[]) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const monthOrders = orders.filter(o => new Date(o.createdAt) >= startOfMonth);
  const completedOrders = orders.filter(o => o.status === 'delivered');
  const pendingOrders = orders.filter(o => ['pending', 'confirmed', 'preparing'].includes(o.status));

  const totalRevenue = monthOrders.reduce((sum, o) => sum + o.finalAmount, 0);
  const prevMonthRevenue = totalRevenue * (0.85 + Math.random() * 0.1);

  return {
    totalRevenue,
    revenueChange: +((totalRevenue / prevMonthRevenue - 1) * 100).toFixed(1),
    totalOrders: monthOrders.length,
    ordersChange: +(monthOrders.length / Math.max(completedOrders.length, 1) * 100).toFixed(1),
    pendingOrders: pendingOrders.length,
    completedOrders: completedOrders.length,
    totalProducts: mockSellerProducts.length,
    outOfStockProducts: mockSellerProducts.filter(p => p.stock === 0).length,
    newCustomers: 156 + Math.floor(Math.random() * 100),
    conversionRate: +(3.2 + Math.random() * 2).toFixed(1),
    avgRating: 4.5,
  } satisfies SellerDashboardStats;
};

export const SellerProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<SellerOrder[]>(mockSellerOrders);
  const [payments] = useState<SellerPayment[]>(mockSellerPayments);
  const [reviews, setReviews] = useState<SellerReview[]>(mockSellerReviews);
  const [promotions, setPromotions] = useState<SellerPromotion[]>(mockSellerPromotions);
  const [tickets, setTickets] = useState<SellerSupportTicket[]>(mockSellerTickets);
  const [inventory, setInventory] = useState<SellerInventoryItem[]>(mockSellerInventory);
  const [shippings] = useState<SellerShipping[]>(mockSellerShippings);
  const [notifications, setNotifications] = useState<SellerNotification[]>(mockSellerNotifications);

  const stats = calculateStats(orders);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o));
  }, []);

  const updateReviewVisibility = useCallback((reviewId: string, hidden: boolean) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, isHidden: hidden } : r));
  }, []);

  const respondToReview = useCallback((reviewId: string, response: string) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, hasResponse: true, sellerResponse: response } : r));
  }, []);

  const updatePromotionStatus = useCallback((promotionId: string, status: SellerPromotion['status']) => {
    setPromotions(prev => prev.map(p => p.id === promotionId ? { ...p, status } : p));
  }, []);

  const createPromotion = useCallback((promo: Omit<SellerPromotion, 'id' | 'createdAt' | 'usedCount'>) => {
    const newPromo: SellerPromotion = {
      ...promo,
      id: `prm-${Date.now()}`,
      createdAt: new Date().toISOString(),
      usedCount: 0,
    };
    setPromotions(prev => [newPromo, ...prev]);
  }, []);

  const updateTicketStatus = useCallback((ticketId: string, status: SellerSupportTicket['status']) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status, updatedAt: new Date().toISOString() } : t));
  }, []);

  const addTicketMessage = useCallback((ticketId: string, content: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id !== ticketId) return t;
      const newMsg = {
        id: `msg-${Date.now()}`,
        sender: 'seller' as const,
        senderName: currentStore.name,
        content,
        attachments: [],
        createdAt: new Date().toISOString(),
      };
      return { ...t, messages: [...t.messages, newMsg], status: 'replied' as const, updatedAt: new Date().toISOString() };
    }));
  }, []);

  const updateInventoryStock = useCallback((sku: string, newStock: number) => {
    setInventory(prev => prev.map(item => {
      if (item.sku !== sku) return item;
      const status = newStock === 0 ? 'out_of_stock' : newStock < item.minStock ? 'low_stock' : 'in_stock';
      return { ...item, stock: newStock, available: newStock - item.reserved, status };
    }));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const getOrderById = useCallback((id: string) => orders.find(o => o.id === id), [orders]);
  const getProductById = useCallback((id: string) => mockSellerProducts.find(p => p.id === id), []);

  return (
    <SellerContext.Provider value={{
      store: currentStore,
      stats,
      orders,
      payments,
      reviews,
      promotions,
      tickets,
      inventory,
      shippings,
      notifications,
      dailyRevenue: mockDailyRevenue,
      monthlyData: mockMonthlyData,
      updateOrderStatus,
      updateReviewVisibility,
      respondToReview,
      updatePromotionStatus,
      createPromotion,
      updateTicketStatus,
      addTicketMessage,
      updateInventoryStock,
      markNotificationRead,
      markAllNotificationsRead,
      deleteNotification,
      getOrderById,
      getProductById,
    }}>
      {children}
    </SellerContext.Provider>
  );
};
