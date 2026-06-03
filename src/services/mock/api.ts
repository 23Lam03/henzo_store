import type {
  Product,
  User,
  Notification,
  Promotion,
  Order,
  Review,
  Store,
  Payment,
  SupportTicket,
} from '../../types';
import { API_DELAY } from '../../constants';
import {
  MOCK_PRODUCTS,
  MOCK_REVIEWS,
  MOCK_BRANDS,
  MOCK_BLOGS,
} from '../../data/products';

// ─── Mock Users ───────────────────────────────────────────────────────────────
const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    email: 'nguyen.van.a@email.com',
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
    role: 'CUSTOMER',
    address: '123 Nguyễn Trãi, Quận 1, TP.HCM',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 'user-2',
    email: 'shop@henzo.vn',
    name: 'Henzo Store',
    phone: '0909876543',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=shop1',
    role: 'SHOP',
    address: '456 Lê Lợi, Quận 1, TP.HCM',
    createdAt: '2023-06-01T08:00:00Z',
  },
  {
    id: 'user-3',
    email: 'admin@henzo.vn',
    name: 'Quản trị viên',
    phone: '0901111222',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin1',
    role: 'ADMIN',
    createdAt: '2023-01-01T00:00:00Z',
  },
];

// ─── Mock Notifications ───────────────────────────────────────────────────────
export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    type: 'order',
    title: 'Đơn hàng đã được xác nhận',
    message: 'Đơn hàng #HDN-20250603-001 của bạn đã được xác nhận và đang được chuẩn bị.',
    isRead: false,
    createdAt: '2025-06-03T10:00:00Z',
    link: '/account/orders',
  },
  {
    id: 'notif-2',
    type: 'promotion',
    title: 'Khuyến mãi 20% cho iPhone 16 Series',
    message: 'Giảm ngay 20% cho tất cả iPhone 16 Series. Chỉ áp dụng đến hết ngày 15/06/2025.',
    isRead: false,
    createdAt: '2025-06-01T09:00:00Z',
    link: '/products?category=phone&brand=apple',
  },
  {
    id: 'notif-3',
    type: 'voucher',
    title: 'Voucher 200K cho đơn hàng đầu tiên',
    message: 'Chào mừng bạn đến với Henzo Store! Sử dụng mã HENZO200 để được giảm 200K cho đơn hàng đầu tiên.',
    isRead: true,
    createdAt: '2025-05-28T14:00:00Z',
    link: '/cart',
  },
  {
    id: 'notif-4',
    type: 'system',
    title: 'Cập nhật hệ thống thành công',
    message: 'Henzo Store đã cập nhật phiên bản mới. Trải nghiệm ngay những tính năng mới!',
    isRead: true,
    createdAt: '2025-05-25T08:00:00Z',
  },
  {
    id: 'notif-5',
    type: 'order',
    title: 'Đơn hàng đã được giao thành công',
    message: 'Đơn hàng #HDN-20250520-042 đã được giao thành công. Cảm ơn bạn đã mua sắm tại Henzo Store!',
    isRead: true,
    createdAt: '2025-05-21T15:00:00Z',
    link: '/account/orders',
  },
];

// ─── Mock Promotions ─────────────────────────────────────────────────────────
const MOCK_PROMOTIONS: Promotion[] = [
  {
    id: 'promo-1',
    title: 'Flash Sale Cuối Tuần',
    description: 'Giảm đến 50% cho hàng ngàn sản phẩm công nghệ',
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=1200',
    discount: 50,
    code: 'WEEKEND50',
    startDate: '2025-06-01T00:00:00Z',
    endDate: '2025-06-08T23:59:59Z',
    isActive: true,
  },
  {
    id: 'promo-2',
    title: 'iPhone 16 Series - Ưu đãi đặc biệt',
    description: 'Giảm 2 triệu cho iPhone 16 Pro Max, iPhone 16 Pro',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=1200',
    discount: 20,
    startDate: '2025-05-20T00:00:00Z',
    endDate: '2025-06-30T23:59:59Z',
    isActive: true,
  },
  {
    id: 'promo-3',
    title: 'Laptop Gaming - Mùa hè sôi động',
    description: 'Giảm đến 3 triệu cho các dòng laptop gaming ASUS, MSI, Dell',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1200',
    discount: 15,
    code: 'GAMING15',
    startDate: '2025-06-01T00:00:00Z',
    endDate: '2025-06-30T23:59:59Z',
    isActive: true,
  },
  {
    id: 'promo-4',
    title: 'Phụ Kiện Gaming - Giá sốc',
    description: 'Giảm 30% cho chuột, bàn phím, tai nghe gaming',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1200',
    discount: 30,
    startDate: '2025-06-01T00:00:00Z',
    endDate: '2025-06-15T23:59:59Z',
    isActive: true,
  },
];

// ─── Mock Orders ─────────────────────────────────────────────────────────────
const MOCK_ORDERS: Order[] = [
  {
    id: 'order-1',
    orderNumber: 'HDN-20250603-001',
    items: [
      { product: MOCK_PRODUCTS[0], quantity: 1, selected: true },
      { product: MOCK_PRODUCTS[24], quantity: 1, selected: true },
    ],
    totalPrice: 39980000,
    status: 'confirmed',
    shippingAddress: '123 Nguyễn Trãi, Quận 1, TP.HCM',
    paymentMethod: 'VNPay',
    createdAt: '2025-06-03T10:00:00Z',
    updatedAt: '2025-06-03T11:00:00Z',
  },
  {
    id: 'order-2',
    orderNumber: 'HDN-20250528-042',
    items: [
      { product: MOCK_PRODUCTS[26], quantity: 1, selected: true },
    ],
    totalPrice: 56990000,
    status: 'delivered',
    shippingAddress: '456 Lê Lợi, Quận 1, TP.HCM',
    paymentMethod: 'COD',
    createdAt: '2025-05-28T14:00:00Z',
    updatedAt: '2025-05-30T09:00:00Z',
  },
];

// ─── Mock Payments ────────────────────────────────────────────────────────────
const MOCK_PAYMENTS: Payment[] = [
  {
    id: 'pay-1',
    orderId: 'order-1',
    amount: 39980000,
    method: 'VNPay',
    status: 'completed',
    transactionId: 'TXN123456789',
    createdAt: '2025-06-03T10:05:00Z',
  },
];

// ─── Mock Stores ─────────────────────────────────────────────────────────────
const MOCK_STORES: Store[] = [
  {
    id: 'store-1',
    name: 'Henzo Store - Chi nhánh Quận 1',
    email: 'cn1@henzo.vn',
    phone: '02812345678',
    address: '123 Nguyễn Trãi, Quận 1, TP.HCM',
    avatar: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
    rating: 4.8,
    productCount: 1234,
    isVerified: true,
    createdAt: '2023-01-01T00:00:00Z',
  },
  {
    id: 'store-2',
    name: 'Henzo Store - Chi nhánh Quận 3',
    email: 'cn3@henzo.vn',
    phone: '02823456789',
    address: '456 Pasteur, Quận 3, TP.HCM',
    avatar: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
    rating: 4.7,
    productCount: 987,
    isVerified: true,
    createdAt: '2023-06-01T00:00:00Z',
  },
];

// ─── Mock Support Tickets ─────────────────────────────────────────────────────
const MOCK_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'ticket-1',
    subject: 'Cần hỗ trợ đổi trả sản phẩm',
    message: 'Tôi muốn đổi sang màu khác cho đơn hàng #HDN-20250603-001',
    status: 'open',
    priority: 'medium',
    createdAt: '2025-06-03T15:00:00Z',
    updatedAt: '2025-06-03T15:00:00Z',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ─── Mock API ────────────────────────────────────────────────────────────────
export const mockApi = {
  // Auth
  login: async (email: string, _password: string): Promise<User | null> => {
    await delay(API_DELAY.normal);
    const user = MOCK_USERS.find(u => u.email === email);
    return user || MOCK_USERS[0];
  },

  register: async (data: Partial<User>): Promise<User> => {
    await delay(API_DELAY.slow);
    return {
      id: `user-${Date.now()}`,
      email: data.email || '',
      name: data.name || '',
      phone: data.phone || '',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=newuser',
      role: 'CUSTOMER',
      createdAt: new Date().toISOString(),
    };
  },

  getCurrentUser: async (): Promise<User | null> => {
    await delay(API_DELAY.fast);
    return MOCK_USERS[0];
  },

  // Products
  getProducts: async (params?: {
    categoryId?: string;
    brand?: string;
    search?: string;
    sort?: string;
    order?: 'asc' | 'desc';
    minPrice?: number;
    maxPrice?: number;
    rating?: number;
    inStock?: boolean;
    page?: number;
    pageSize?: number;
  }): Promise<{ products: Product[]; total: number }> => {
    await delay(API_DELAY.normal);
    let results = [...MOCK_PRODUCTS];

    if (params?.categoryId) {
      results = results.filter(p => p.categoryId === params.categoryId);
    }
    if (params?.brand) {
      results = results.filter(p => p.brand.toLowerCase() === params.brand!.toLowerCase());
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.tags.some((t: string) => t.toLowerCase().includes(q))
      );
    }
    if (params?.minPrice !== undefined) {
      results = results.filter(p => p.price >= params.minPrice!);
    }
    if (params?.maxPrice !== undefined) {
      results = results.filter(p => p.price <= params.maxPrice!);
    }
    if (params?.rating !== undefined) {
      results = results.filter(p => p.rating >= params.rating!);
    }
    if (params?.inStock) {
      results = results.filter(p => p.stock > 0);
    }
    if (params?.sort) {
      switch (params.sort) {
        case 'price':
          results.sort((a, b) => params.order === 'desc' ? b.price - a.price : a.price - b.price);
          break;
        case 'rating':
          results.sort((a, b) => b.rating - a.rating);
          break;
        case 'sold':
          results.sort((a, b) => b.sold - a.sold);
          break;
        case 'newest':
          results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        default:
          results.sort((a, b) => b.sold - a.sold);
      }
    }

    const total = results.length;
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 20;
    const start = (page - 1) * pageSize;
    const products = results.slice(start, start + pageSize);

    return { products, total };
  },

  getProductById: async (id: string): Promise<Product | null> => {
    await delay(API_DELAY.fast);
    return MOCK_PRODUCTS.find(p => p.id === id) || null;
  },

  getProductBySlug: async (slug: string): Promise<Product | null> => {
    await delay(API_DELAY.fast);
    return MOCK_PRODUCTS.find(p => p.slug === slug) || null;
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    await delay(API_DELAY.fast);
    return MOCK_PRODUCTS.filter(p => p.isFeatured).slice(0, 20);
  },

  getHotProducts: async (): Promise<Product[]> => {
    await delay(API_DELAY.fast);
    return MOCK_PRODUCTS.filter(p => p.isHot).slice(0, 20);
  },

  getNewProducts: async (): Promise<Product[]> => {
    await delay(API_DELAY.fast);
    return [...MOCK_PRODUCTS]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 20);
  },

  getBestSellerProducts: async (): Promise<Product[]> => {
    await delay(API_DELAY.fast);
    return [...MOCK_PRODUCTS]
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 20);
  },

  getFlashSaleProducts: async (): Promise<Product[]> => {
    await delay(API_DELAY.fast);
    return MOCK_PRODUCTS
      .filter(p => p.discount >= 10)
      .sort((a, b) => b.discount - a.discount)
      .slice(0, 20);
  },

  getRelatedProducts: async (productId: string, limit = 8): Promise<Product[]> => {
    await delay(API_DELAY.fast);
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    if (!product) return [];
    return MOCK_PRODUCTS
      .filter(p => p.id !== productId && (p.categoryId === product.categoryId || p.brand === product.brand))
      .slice(0, limit);
  },

  getProductsByCategory: async (categorySlug: string, params?: { page?: number; pageSize?: number; sort?: string }): Promise<{ products: Product[]; total: number }> => {
    await delay(API_DELAY.normal);
    const categoryMap: Record<string, string> = {
      'dien-thoai': 'cat-phone',
      'laptop': 'cat-laptop',
      'pc-gaming': 'cat-pc',
      'man-hinh': 'cat-monitor',
      'chuot': 'cat-mouse',
      'ban-phim': 'cat-keyboard',
      'tai-nghe': 'cat-headphone',
    };
    const categoryId = categoryMap[categorySlug] || categorySlug;
    const results = MOCK_PRODUCTS.filter(p => p.categoryId === categoryId);
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 20;
    const start = (page - 1) * pageSize;
    return { products: results.slice(start, start + pageSize), total: results.length };
  },

  getProductsByBrand: async (brandSlug: string, params?: { page?: number; pageSize?: number }): Promise<{ products: Product[]; total: number }> => {
    await delay(API_DELAY.normal);
    const brandMap: Record<string, string> = {
      'apple': 'Apple', 'samsung': 'Samsung', 'asus': 'ASUS', 'msi': 'MSI',
      'logitech': 'Logitech', 'razer': 'Razer', 'corsair': 'Corsair',
      'dell': 'Dell', 'hp': 'HP', 'lenovo': 'Lenovo', 'acer': 'Acer',
      'xiaomi': 'Xiaomi', 'oppo': 'OPPO', 'vivo': 'Vivo', 'google': 'Google',
      'oneplus': 'OnePlus', 'realme': 'Realme', 'poco': 'Poco', 'nokia': 'Nokia',
      'tecno': 'Tecno', 'honor': 'Honor', 'huawei': 'Huawei', 'lg': 'LG',
      'microsoft': 'Microsoft', 'benq': 'BenQ', 'viewsonic': 'ViewSonic',
      'aoc': 'AOC', 'gigabyte': 'Gigabyte', 'philips': 'Philips',
      'endgame-gear': 'Endgame Gear', 'steelseries': 'SteelSeries',
      'roccat': 'ROCCAT', 'hyperx': 'HyperX', 'jbl': 'JBL',
    };
    const brandName = brandMap[brandSlug] || brandSlug;
    const results = MOCK_PRODUCTS.filter(p => p.brand.toLowerCase() === brandName.toLowerCase());
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 20;
    const start = (page - 1) * pageSize;
    return { products: results.slice(start, start + pageSize), total: results.length };
  },

  getRecentlyViewed: async (_userId: string): Promise<Product[]> => {
    await delay(API_DELAY.fast);
    return MOCK_PRODUCTS.slice(0, 10);
  },

  // Brands
  getBrands: async (): Promise<typeof MOCK_BRANDS> => {
    await delay(API_DELAY.fast);
    return MOCK_BRANDS;
  },

  getBrandBySlug: async (slug: string): Promise<typeof MOCK_BRANDS[0] | null> => {
    await delay(API_DELAY.fast);
    const brandMap: Record<string, typeof MOCK_BRANDS[0]> = {};
    MOCK_BRANDS.forEach(b => { brandMap[b.slug] = b; });
    return brandMap[slug] || null;
  },

  // Blogs
  getBlogs: async (params?: { category?: string; page?: number; pageSize?: number }): Promise<{ blogs: typeof MOCK_BLOGS; total: number }> => {
    await delay(API_DELAY.fast);
    let results = [...MOCK_BLOGS];
    if (params?.category) {
      results = results.filter(b => b.category === params.category);
    }
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 12;
    const start = (page - 1) * pageSize;
    return { blogs: results.slice(start, start + pageSize), total: results.length };
  },

  getBlogBySlug: async (slug: string): Promise<typeof MOCK_BLOGS[0] | null> => {
    await delay(API_DELAY.fast);
    return MOCK_BLOGS.find(b => b.slug === slug) || null;
  },

  getFeaturedBlogs: async (): Promise<typeof MOCK_BLOGS> => {
    await delay(API_DELAY.fast);
    return MOCK_BLOGS.slice(0, 6);
  },

  // Reviews
  getReviews: async (productId: string): Promise<Review[]> => {
    await delay(API_DELAY.fast);
    return MOCK_REVIEWS.filter(r => r.productId === productId);
  },

  createReview: async (data: Partial<Review>): Promise<Review> => {
    await delay(API_DELAY.slow);
    return {
      id: `review-${Date.now()}`,
      productId: data.productId || '',
      userId: data.userId || 'user-1',
      userName: data.userName || 'Khách hàng',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=newreview',
      rating: data.rating || 5,
      comment: data.comment || '',
      createdAt: new Date().toISOString(),
      isVerified: true,
      replies: [],
    };
  },

  // Notifications
  getNotifications: async (_userId: string): Promise<Notification[]> => {
    await delay(API_DELAY.fast);
    return MOCK_NOTIFICATIONS;
  },

  markNotificationRead: async (_id: string): Promise<void> => {
    await delay(API_DELAY.fast);
  },

  markAllNotificationsRead: async (): Promise<void> => {
    await delay(API_DELAY.fast);
  },

  // Promotions
  getPromotions: async (): Promise<Promotion[]> => {
    await delay(API_DELAY.fast);
    return MOCK_PROMOTIONS;
  },

  // Orders
  getOrders: async (_userId: string): Promise<Order[]> => {
    await delay(API_DELAY.normal);
    return MOCK_ORDERS;
  },

  getOrderById: async (orderId: string): Promise<Order | null> => {
    await delay(API_DELAY.fast);
    return MOCK_ORDERS.find(o => o.id === orderId) || null;
  },

  createOrder: async (data: Partial<Order>): Promise<Order> => {
    await delay(API_DELAY.slow);
    return {
      id: `order-${Date.now()}`,
      orderNumber: `HDN-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      items: data.items || [],
      totalPrice: data.totalPrice || 0,
      status: 'pending',
      shippingAddress: data.shippingAddress || '',
      paymentMethod: data.paymentMethod || 'COD',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  // Payments
  getPayments: async (_userId?: string): Promise<Payment[]> => {
    await delay(API_DELAY.normal);
    return MOCK_PAYMENTS;
  },

  // Stores (Admin)
  getStores: async (): Promise<Store[]> => {
    await delay(API_DELAY.normal);
    return MOCK_STORES;
  },

  // Support
  getSupportTickets: async (_userId: string): Promise<SupportTicket[]> => {
    await delay(API_DELAY.normal);
    return MOCK_SUPPORT_TICKETS;
  },

  createSupportTicket: async (data: Partial<SupportTicket>): Promise<SupportTicket> => {
    await delay(API_DELAY.slow);
    return {
      id: `ticket-${Date.now()}`,
      subject: data.subject || '',
      message: data.message || '',
      status: 'open',
      priority: data.priority || 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  // Search
  search: async (query: string): Promise<{
    products: Product[];
    categories: string[];
    brands: string[];
  }> => {
    await delay(API_DELAY.fast);
    const q = query.toLowerCase();
    const products = MOCK_PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.tags.some((t: string) => t.toLowerCase().includes(q))
    ).slice(0, 8);
    const categories = [...new Set(products.map(p => p.categoryName))];
    const brands = [...new Set(products.map(p => p.brand))];
    return { products, categories, brands };
  },
};
