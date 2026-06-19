// ─── Base Types ──────────────────────────────────────────────────────────────

// ─── Product Types ────────────────────────────────────────────────────────────
export type UserRole = 'GUEST' | 'CUSTOMER' | 'SHOP' | 'ADMIN';

export const UserRole = {
  GUEST: 'GUEST' as UserRole,
  CUSTOMER: 'CUSTOMER' as UserRole,
  SHOP: 'SHOP' as UserRole,
  ADMIN: 'ADMIN' as UserRole,
};

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  avatar: string;
  role: UserRole;
  address?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ─── Product Types ────────────────────────────────────────────────────────────
export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  children?: ProductCategory[];
  featured?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  categoryId: string;
  categoryName: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  sold: number;
  tags: string[];
  specifications: Record<string, string>;
  isFeatured: boolean;
  isNew: boolean;
  isHot: boolean;
  createdAt: string;
}

// ─── Cart Types ───────────────────────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
  selected: boolean;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  totalOriginalPrice: number;
  savings: number;
}

// ─── Order Types ─────────────────────────────────────────────────────────────
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipping'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  totalPrice: number;
  status: OrderStatus;
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Notification Types ────────────────────────────────────────────────────────
export type NotificationType = 'order' | 'promotion' | 'voucher' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

// ─── Search Types ─────────────────────────────────────────────────────────────
export interface SearchResult {
  products: Product[];
  categories: ProductCategory[];
  totalResults: number;
}

export interface SearchHistory {
  id: string;
  query: string;
  timestamp: string;
}

// ─── Wishlist Types ───────────────────────────────────────────────────────────
export interface WishlistItem {
  product: Product;
  addedAt: string;
}

// ─── Review Types ─────────────────────────────────────────────────────────────
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
  images?: string[];
  isVerified: boolean;
  replies?: ReviewReply[];
}

export interface ReviewReply {
  id: string;
  userId: string;
  userName: string;
  comment: string;
  createdAt: string;
}

// ─── Promotion Types ──────────────────────────────────────────────────────────
export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  discount: number;
  code?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

// ─── Store Types ─────────────────────────────────────────────────────────────
export interface Store {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  rating: number;
  productCount: number;
  isVerified: boolean;
  createdAt: string;
}

// ─── Payment Types ────────────────────────────────────────────────────────────
export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId: string;
  createdAt: string;
}

// ─── Breadcrumb Types ─────────────────────────────────────────────────────────
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ─── Table Types (Admin) ──────────────────────────────────────────────────────
export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, record: T) => React.ReactNode;
}

export interface TablePagination {
  page: number;
  pageSize: number;
  total: number;
}

// ─── Menu Types ───────────────────────────────────────────────────────────────
export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  href?: string;
  children?: MenuItem[];
  badge?: string | number;
  permission?: UserRole[];
  divider?: boolean;
  external?: boolean;
}

// ─── Shipping Types ───────────────────────────────────────────────────────────
export interface ShippingUpdate {
  id: string;
  orderId: string;
  status: string;
  location: string;
  timestamp: string;
  description: string;
}

// ─── Support Types ────────────────────────────────────────────────────────────
export interface SupportTicket {
  id: string;
  subject: string;
  message: string;
  status: 'open' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  replies?: SupportReply[];
}

export interface SupportReply {
  id: string;
  userId: string;
  userName: string;
  message: string;
  createdAt: string;
}

// ─── Blog Types ──────────────────────────────────────────────────────────────
export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail: string;
  author: string;
  authorAvatar: string;
  category: string;
  createdAt: string;
  views: number;
}

// ─── Brand Types ───────────────────────────────────────────────────────────
export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  productCount: number;
}
