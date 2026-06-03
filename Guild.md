# HenzoStore - Công Nghệ Hàng Đầu

> E-commerce Platform - Technology Stack: React 19 + TypeScript + Vite + Pure CSS

---

## Trạng Thái Dự Án

```
Trạng thái: ✅ HOÀN THÀNH
Build: ✅ PASSED (npm run build)
Dev Server: ✅ http://localhost:5173
TypeScript: ✅ Strict Mode - 0 lỗi
```

---

## Tổng Quan

- **Framework**: React 19.2.6 + TypeScript (Strict)
- **Build Tool**: Vite 8.0.12
- **Routing**: React Router DOM 7.16.0
- **Styling**: Pure CSS (CSS Variables)
- **State Management**: Context API
- **Storage**: LocalStorage
- **API**: Mock API (async/await)
- **Ngành hàng**: Điện thoại, Laptop, PC Gaming, Phụ kiện công nghệ

### Cấu Trúc thư mục

```
src/
├── components/       # 5 Layouts + Header + Footer + 8 Product Components
├── contexts/         # 8 Context Providers (Auth, Cart, Wishlist, etc.)
├── data/           # 100+ mock products thực
├── guards/         # PermissionRoute + ProtectedRoute
├── pages/
│   ├── admin/      # 14 Admin pages
│   ├── auth/       # 3 Auth pages (Login, Register, ForgotPassword)
│   ├── customer/   # 15 Customer pages
│   ├── errors/     # 3 Error pages (404, 403, 500)
│   └── shop/       # 14 Shop pages
├── router/         # React Router v7 configuration
├── services/       # AuthService + Mock API
├── styles/         # Global Design System CSS
├── types/          # TypeScript types (unified)
└── utils/         # Utilities (formatPrice, debounce, etc.)
```

---

## Tài Khoản Demo

| Role | Email | Password | Route |
|------|-------|---------|-------|
| Admin | `admin@henzo.com` | `123456` | `/admin` |
| Shop | `shop@henzo.com` | `123456` | `/shop` |
| Customer | `customer@henzo.com` | `123456` | `/account` |

---

## Routing System

### User Roles

```typescript
type UserRole = 'GUEST' | 'CUSTOMER' | 'SHOP' | 'ADMIN' | 'SUPER_ADMIN';
```

### Route Constants

```typescript
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:slug',
  LOGIN: '/login',
  REGISTER: '/register',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ACCOUNT: '/account',
  ORDERS: '/orders',
  WISHLIST: '/wishlist',
  // Shop routes: /shop/*
  // Admin routes: /admin/*
} as const;
```

---

## Authentication System

### AuthContext API

```typescript
interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: string;  // 'GUEST' | 'CUSTOMER' | 'SHOP' | 'ADMIN' | 'SUPER_ADMIN'
  token: string | null;
  login: (email, password, rememberMe?) => Promise<{ success, message }>;
  register: (data) => Promise<{ success, message }>;
  logout: () => void;
  updateUser: (data) => void;
}
```

### Permission Route

```typescript
<PermissionRoute allowedRoles={['ADMIN' as UserRole]}>
  <AdminContent />
</PermissionRoute>
// Unauthorized → Redirect /403
```

---

## Layouts

| Layout | Route Pattern | Mục đích |
|--------|-------------|-----------|
| `MainLayout` | `/` | Public pages |
| `AuthLayout` | `/login`, `/register` | Authentication |
| `CustomerLayout` | `/account/*` | Customer portal |
| `ShopLayout` | `/shop/*` | Seller dashboard |
| `AdminLayout` | `/admin/*` | Admin dashboard |

---

## Design System

### Colors

```css
/* Primary: Indigo */
--color-primary: #4F46E5;
--color-primary-hover: #4338CA;
--color-primary-light: #6366F1;

/* Accent: Cyan */
--color-accent: #06B6D4;

/* Semantic */
--color-success: #10B981;
--color-warning: #F59E0B;
--color-danger: #EF4444;

/* Surface */
--color-background: #F8FAFC;
--color-surface: #FFFFFF;
--color-border: #E5E7EB;
```

### Dark Mode

```css
[data-theme="dark"] {
  --color-background: #0F172A;
  --color-surface: #1E293B;
  --color-text-primary: #F1F5F9;
  /* Full dark theme support */
}
```

---

## Mock API Endpoints

```typescript
// Products
mockApi.getProducts(params)
mockApi.getProductBySlug(slug)
mockApi.getFeaturedProducts()
mockApi.getHotProducts()
mockApi.getFlashSaleProducts()
mockApi.getRelatedProducts(id, limit)
mockApi.getProductsByCategory(slug)
mockApi.getProductsByBrand(slug)
mockApi.search(query)

// Orders
mockApi.getOrders(userId)
mockApi.getOrderById(orderId)
mockApi.createOrder(data)

// Reviews
mockApi.getReviews(productId)
mockApi.createReview(data)

// Notifications
mockApi.getNotifications(userId)
mockApi.markNotificationRead(id)
mockApi.markAllNotificationsRead()

// Promotions
mockApi.getPromotions()

// Payments
mockApi.getPayments(userId?)

// Support
mockApi.getSupportTickets(userId)
mockApi.createSupportTicket(data)
```

---

## Cài Đặt

```bash
# Development
npm install
npm run dev

# Production build
npm run build
npm run preview

# Type check
npx tsc --noEmit
```

---

## Scripts

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```
