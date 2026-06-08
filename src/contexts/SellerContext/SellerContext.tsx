import {
  createContext, useContext, useState, useCallback, type ReactNode, useMemo, useEffect
} from 'react';
import type {
  SellerStore, SellerOrder, SellerPayment, SellerReview,
  SellerPromotion, SellerSupportTicket, SellerInventoryItem,
  SellerShipping, SellerNotification, SellerDashboardStats,
  DailyRevenue, MonthlyData, OrderStatus
} from '../../types/seller';
import type { Order as CustomerOrder } from '../../types';
import {
  currentStore, mockSellerOrders, mockSellerPayments, mockSellerReviews,
  mockSellerPromotions, mockSellerTickets, mockSellerInventory,
  mockSellerShippings, mockSellerNotifications, mockDailyRevenue,
  mockMonthlyData, mockSellerProducts
} from '../../data/sellerData';
import { STORAGE_KEYS } from '../../constants';
import { getStorageItem, setStorageItem } from '../../utils';
import type { Notification } from '../../types';

const SELLER_REVIEWS_STORAGE_KEY = 'henzo_seller_reviews';

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
const SELLER_ORDERS_STORAGE_KEY = 'henzo_seller_orders';

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

const mapCustomerStatusToSellerStatus = (status: CustomerOrder['status']): OrderStatus => {
  switch (status) {
    case 'pending': return 'pending';
    case 'confirmed': return 'confirmed';
    case 'processing': return 'preparing';
    case 'shipping': return 'delivering';
    case 'delivered': return 'delivered';
    case 'cancelled': return 'cancelled';
    default: return 'pending';
  }
};

const mapPaymentMethod = (paymentMethod: string): SellerOrder['paymentMethod'] => {
  switch (paymentMethod.toLowerCase()) {
    case 'cod': return 'cod';
    case 'vnpay': return 'vnpay';
    case 'momo': return 'momo';
    case 'zalopay': return 'zalopay';
    default: return 'banking';
  }
};

const toSellerOrder = (order: CustomerOrder): SellerOrder => ({
  id: order.id,
  orderCode: order.orderNumber,
  customerName: 'Khách hàng Henzo',
  customerPhone: 'Chưa cập nhật',
  customerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=henzo-customer',
  items: order.items.reduce((sum, item) => sum + item.quantity, 0) || 1,
  totalAmount: order.totalPrice,
  shippingFee: 0,
  discount: 0,
  finalAmount: order.totalPrice,
  status: mapCustomerStatusToSellerStatus(order.status),
  paymentMethod: mapPaymentMethod(order.paymentMethod),
  paymentStatus: order.paymentMethod === 'COD' ? 'unpaid' : 'paid',
  shippingAddress: order.shippingAddress,
  note: '',
  createdAt: order.createdAt,
  updatedAt: order.updatedAt,
  estimatedDelivery: new Date(new Date(order.createdAt).getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
  trackingNumber: `HNZ${order.id.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()}`,
  shippingPartner: 'Giao Hàng Nhanh',
  storeId: currentStore.id,
  products: order.items.map(item => ({
    productId: item.product.id,
    productName: item.product.name,
    productImage: item.product.images[0],
    quantity: item.quantity,
    unitPrice: item.product.price,
    totalPrice: item.product.price * item.quantity,
    sku: item.product.id.toUpperCase(),
    options: {},
  })),
});

const mergeOrders = (baseOrders: SellerOrder[], customerOrders: CustomerOrder[]) => {
  const customerOrderMap = new Map(customerOrders.map(order => [order.id, toSellerOrder(order)]));
  const mergedBase = baseOrders.map(order => customerOrderMap.get(order.id) ?? order);
  const existingIds = new Set(mergedBase.map(order => order.id));
  const appended = [...customerOrderMap.values()].filter(order => !existingIds.has(order.id));
  return [...appended, ...mergedBase].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
};

const CUSTOMER_STATUS_LABELS: Record<CustomerOrder['status'], string> = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  processing: 'Đang xử lý',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
};

const pushCustomerOrderNotification = (order: CustomerOrder, status: CustomerOrder['status']) => {
  const notifications = getStorageItem<Notification[]>(STORAGE_KEYS.notifications, []);
  const title = `Đơn hàng ${order.orderNumber} đã cập nhật`;
  const message = `Đơn hàng ${order.orderNumber} hiện ở trạng thái ${CUSTOMER_STATUS_LABELS[status]}.`;

  const nextNotifications: Notification[] = [
    {
      id: `notif-${Date.now()}`,
      type: 'order',
      title,
      message,
      isRead: false,
      createdAt: new Date().toISOString(),
      link: `/account/orders/${order.id}`,
    },
    ...notifications,
  ];

  setStorageItem(STORAGE_KEYS.notifications, nextNotifications);
};

export const SellerProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<SellerOrder[]>(() => {
    const customerOrders = getStorageItem<CustomerOrder[]>(STORAGE_KEYS.orders, []);
    const savedSellerOrders = getStorageItem<SellerOrder[]>(SELLER_ORDERS_STORAGE_KEY, mockSellerOrders);
    return mergeOrders(savedSellerOrders, customerOrders);
  });
  const [payments] = useState<SellerPayment[]>(mockSellerPayments);
  const [reviews, setReviews] = useState<SellerReview[]>(() => getStorageItem<SellerReview[]>(SELLER_REVIEWS_STORAGE_KEY, mockSellerReviews));
  const [promotions, setPromotions] = useState<SellerPromotion[]>(mockSellerPromotions);
  const [tickets, setTickets] = useState<SellerSupportTicket[]>(mockSellerTickets);
  const [inventory, setInventory] = useState<SellerInventoryItem[]>(mockSellerInventory);
  const [shippings] = useState<SellerShipping[]>(mockSellerShippings);
  const [notifications, setNotifications] = useState<SellerNotification[]>(mockSellerNotifications);

  useEffect(() => {
    setStorageItem(SELLER_ORDERS_STORAGE_KEY, orders);
  }, [orders]);

  useEffect(() => {
    setStorageItem(SELLER_REVIEWS_STORAGE_KEY, reviews);
  }, [reviews]);

  useEffect(() => {
    const syncOrders = () => {
      const customerOrders = getStorageItem<CustomerOrder[]>(STORAGE_KEYS.orders, []);
      setOrders(prev => mergeOrders(prev, customerOrders));
    };

    syncOrders();
    window.addEventListener('storage', syncOrders);
    return () => window.removeEventListener('storage', syncOrders);
  }, []);

  useEffect(() => {
    const syncReviews = () => {
      setReviews(getStorageItem<SellerReview[]>(SELLER_REVIEWS_STORAGE_KEY, mockSellerReviews));
    };

    syncReviews();
    window.addEventListener('storage', syncReviews);
    window.addEventListener('focus', syncReviews);
    return () => {
      window.removeEventListener('storage', syncReviews);
      window.removeEventListener('focus', syncReviews);
    };
  }, []);

  const stats = calculateStats(orders);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders(prev => {
      const nextOrders = prev.map(o => o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o);

      const customerStatusMap: Record<OrderStatus, CustomerOrder['status']> = {
        pending: 'pending',
        confirmed: 'confirmed',
        preparing: 'processing',
        shipped: 'shipping',
        delivering: 'shipping',
        delivered: 'delivered',
        cancelled: 'cancelled',
        returned: 'cancelled',
      };

      const customerOrders = getStorageItem<CustomerOrder[]>(STORAGE_KEYS.orders, []);
      const updatedCustomerOrders = customerOrders.map(order => {
        if (order.id !== orderId) return order;
        const nextCustomerStatus = customerStatusMap[status];
        const updatedOrder = { ...order, status: nextCustomerStatus, updatedAt: new Date().toISOString() };
        pushCustomerOrderNotification(updatedOrder, nextCustomerStatus);
        return updatedOrder;
      });
      setStorageItem(STORAGE_KEYS.orders, updatedCustomerOrders);

      return nextOrders;
    });
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

  const value = useMemo(() => ({
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
  }), [
    stats,
    orders,
    payments,
    reviews,
    promotions,
    tickets,
    inventory,
    shippings,
    notifications,
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
  ]);

  return (
    <SellerContext.Provider value={value}>
      {children}
    </SellerContext.Provider>
  );
};
