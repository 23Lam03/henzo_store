import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { STORAGE_KEYS } from '../../constants';
import { getStorageItem, setStorageItem } from '../../utils';
import type { CartItem, Order, OrderStatus } from '../../types';

interface CreateOrderInput {
  items: CartItem[];
  totalPrice: number;
  shippingAddress: string;
  paymentMethod: string;
}

interface OrderContextValue {
  orders: Order[];
  createOrder: (input: CreateOrderInput) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (id: string) => Order | undefined;
  getOrderByNumber: (orderNumber: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextValue | null>(null);

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'order-1',
    orderNumber: 'HDN-20250603-001',
    items: [],
    totalPrice: 39980000,
    status: 'confirmed',
    shippingAddress: '123 Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh',
    paymentMethod: 'VNPay',
    createdAt: '2025-06-03T10:00:00Z',
    updatedAt: '2025-06-03T11:00:00Z',
  },
  {
    id: 'order-2',
    orderNumber: 'HDN-20250528-042',
    items: [],
    totalPrice: 56990000,
    status: 'delivered',
    shippingAddress: '45 Lê Lợi, Hải Châu, Đà Nẵng',
    paymentMethod: 'COD',
    createdAt: '2025-05-28T14:00:00Z',
    updatedAt: '2025-05-30T09:00:00Z',
  },
  {
    id: 'order-3',
    orderNumber: 'HDN-20250515-008',
    items: [],
    totalPrice: 25020000,
    status: 'shipping',
    shippingAddress: '88 Hùng Vương, Ninh Kiều, Cần Thơ',
    paymentMethod: 'Momo',
    createdAt: '2025-05-15T09:00:00Z',
    updatedAt: '2025-05-16T13:00:00Z',
  },
  {
    id: 'order-4',
    orderNumber: 'HDN-20250420-015',
    items: [],
    totalPrice: 17990000,
    status: 'cancelled',
    shippingAddress: '12 Trần Phú, Nha Trang, Khánh Hòa',
    paymentMethod: 'VNPay',
    createdAt: '2025-04-20T11:00:00Z',
    updatedAt: '2025-04-20T13:00:00Z',
  },
  {
    id: 'order-5',
    orderNumber: 'HDN-20250410-003',
    items: [],
    totalPrice: 34990000,
    status: 'delivered',
    shippingAddress: '221B Pasteur, Quận 3, TP. Hồ Chí Minh',
    paymentMethod: 'COD',
    createdAt: '2025-04-10T08:00:00Z',
    updatedAt: '2025-04-12T15:00:00Z',
  },
];

const buildOrderNumber = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const suffix = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  return `HDN-${year}${month}${day}-${suffix}`;
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(() =>
    getStorageItem<Order[]>(STORAGE_KEYS.orders, DEFAULT_ORDERS)
  );

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.orders, orders);
  }, [orders]);

  const createOrder = useCallback((input: CreateOrderInput) => {
    const now = new Date().toISOString();
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      orderNumber: buildOrderNumber(),
      items: input.items,
      totalPrice: input.totalPrice,
      status: 'pending',
      shippingAddress: input.shippingAddress,
      paymentMethod: input.paymentMethod,
      createdAt: now,
      updatedAt: now,
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => (
      order.id === orderId
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    )));
  }, []);

  const getOrderById = useCallback((id: string) => orders.find(order => order.id === id), [orders]);
  const getOrderByNumber = useCallback((orderNumber: string) => orders.find(order => order.orderNumber === orderNumber), [orders]);

  const value = useMemo(() => ({ orders, createOrder, updateOrderStatus, getOrderById, getOrderByNumber }), [orders, createOrder, updateOrderStatus, getOrderById, getOrderByNumber]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrder = (): OrderContextValue => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within OrderProvider');
  return context;
};

export { STORAGE_KEYS };
