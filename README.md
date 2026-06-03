# HenzoStore - Công Nghệ Hàng Đầu

> E-commerce Platform xây dựng bằng React 19 + TypeScript + Vite. Chuyên kinh doanh Điện thoại, Laptop, PC Gaming, Linh kiện máy tính và Phụ kiện công nghệ.

---

## Mục Lục

- [Tech Stack](#tech-stack)
- [Yêu Cầu](#yêu-cầu)
- [Cài Đặt](#cài-đặt)
- [Tài Khoản Demo](#tài-khoản-demo)
- [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)
- [Routing System](#routing-system)
- [Authentication & Authorization](#authentication--authorization)
- [Hệ Thống Layout](#hệ-thống-layout)
- [Global Components](#global-components)
- [Mock API](#mock-api)
- [Tính Năng Chính](#tính-năng-chính)
- [Design System](#design-system)
- [Roadmap](#roadmap)

---

## Tech Stack

| Layer | Công nghệ | Version |
|-------|-----------|---------|
| Framework | React | 19.2.6 |
| Language | TypeScript (Strict) | ~6.0.2 |
| Build Tool | Vite | 8.0.12 |
| Routing | React Router DOM | 7.16.0 |
| Styling | Pure CSS (CSS Variables) | - |
| State | Context API + useState | - |
| Storage | LocalStorage | - |
| API | Mock API (async/await) | - |

### Không sử dụng

```
❌ TailwindCSS     ❌ Bootstrap      ❌ Material UI
❌ Ant Design     ❌ Chakra UI       ❌ Styled Components
```

---

## Yêu Cầu

### Ngành hàng kinh doanh

- Điện thoại (iPhone, Samsung, Xiaomi, OPPO, Vivo, Google, OnePlus...)
- Laptop (MacBook, ASUS ROG, MSI, Dell, HP, Lenovo, Acer...)
- PC Gaming & Linh kiện (RTX 5090, CPU, RAM, SSD, Case, Nguồn...)
- Phụ kiện công nghệ (Chuột, Bàn phím, Tai nghe, Màn hình, Camera, Loa...)
- Đồng hồ thông minh, Máy tính bảng, Thiết bị mạng

### Yêu cầu kỹ thuật

- Responsive hoàn toàn: Desktop, Tablet, Mobile
- 100% tiếng Việt
- Không có trang trắng
- Không placeholder image
- CSS thuần (Pure CSS)
- Enterprise Architecture

---

## Cài Đặt

```bash
# Clone hoặc navigate vào project
cd henzo_store

# Install dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview

# TypeScript check
npx tsc --noEmit
```

---

## Tài Khoản Demo

| Role | Email | Password | URL |
|------|-------|---------|-----|
| **Admin** | `admin@henzo.com` | `123456` | `/admin` |
| **Shop** | `shop@henzo.com` | `123456` | `/shop` |
| **Customer** | `customer@henzo.com` | `123456` | `/account` |

---

## Cấu Trúc Thư Mục

```
src/
├── App.tsx                    # Root component
├── main.tsx                   # Entry point
├── index.css                  # CSS entry (redirects to global)
│
├── components/
│   ├── breadcrumb/           # Breadcrumb navigation
│   ├── common/               # Shared components
│   │   ├── BackToTop/        # Back to top button
│   │   ├── Loading/          # Loading spinner
│   │   ├── ProductCard/      # Product card component
│   │   └── RouteLoader/      # Route transition loader
│   ├── footer/Footer/        # Footer
│   ├── header/               # Header system
│   │   ├── Header/           # Main header
│   │   ├── MegaMenu/         # Category mega menu
│   │   ├── MiniCart/         # Mini cart dropdown
│   │   ├── NotificationCenter/ # Notification center
│   │   ├── SearchBar/        # Global search bar
│   │   └── UserMenu/         # User account menu
│   ├── layouts/              # Layout wrappers
│   │   ├── AdminLayout/       # Admin dashboard layout
│   │   ├── AuthLayout/       # Login/Register layout
│   │   ├── CustomerLayout/    # Customer account layout
│   │   ├── MainLayout/        # Public pages layout
│   │   └── ShopLayout/       # Shop portal layout
│   ├── product/              # Product-related components
│   │   ├── Pagination/       # Pagination
│   │   ├── ProductCompare/    # Product comparison
│   │   ├── ProductFilter/     # Filter sidebar
│   │   ├── ProductGallery/    # Image gallery
│   │   ├── ProductGrid/      # Product grid
│   │   ├── ProductReview/     # Reviews display
│   │   ├── ProductSort/       # Sort options
│   │   └── ProductSpecification/ # Specs table
│   └── sidebar/              # Sidebar navigation
│
├── constants/
│   ├── index.ts             # Colors, breakpoints, categories, etc.
│   └── routes.ts             # Route constants + page titles
│
├── contexts/                 # React Context providers
│   ├── AuthContext/          # Authentication state
│   ├── CartContext/          # Shopping cart state
│   ├── CompareContext/       # Product comparison state
│   ├── NotificationContext/   # Notification state
│   ├── RecentlyViewedContext/ # Recently viewed products
│   ├── SearchContext/        # Search state + history
│   ├── ThemeContext/         # Dark/Light mode
│   └── WishlistContext/      # Wishlist state
│
├── data/
│   └── products.ts           # Mock product data (100+ products)
│
├── guards/
│   ├── PermissionRoute.tsx   # Role-based route guard
│   └── ProtectedRoute.tsx    # Auth-protected route
│
├── hooks/                   # Custom React hooks
│
├── pages/
│   ├── admin/               # Admin dashboard pages
│   │   ├── AdminAccess/      # Phân quyền người dùng
│   │   ├── AdminCustomer/    # Quản lý khách hàng
│   │   ├── AdminDashboard/   # Dashboard tổng quan
│   │   ├── AdminFinance/     # Tài chính hệ thống
│   │   ├── AdminNotification/ # Quản lý thông báo
│   │   ├── AdminOrder/       # Quản lý đơn hàng
│   │   ├── AdminPayment/     # Quản lý thanh toán
│   │   ├── AdminProduct/     # Quản lý sản phẩm
│   │   ├── AdminPromotion/   # Quản lý khuyến mãi
│   │   ├── AdminReports/     # Báo cáo hệ thống
│   │   ├── AdminReview/      # Quản lý đánh giá
│   │   ├── AdminStore/       # Quản lý cửa hàng
│   │   └── AdminSupport/     # Quản lý hỗ trợ
│   │
│   ├── auth/                # Authentication pages
│   │   ├── ForgotPasswordPage/ # Quên mật khẩu
│   │   ├── LoginPage/        # Đăng nhập
│   │   └── RegisterPage/      # Đăng ký
│   │
│   ├── customer/            # Customer-facing pages
│   │   ├── Account/          # Tài khoản cá nhân
│   │   ├── Brand/           # Chi tiết thương hiệu
│   │   ├── Cart/            # Giỏ hàng
│   │   ├── Category/        # Chi tiết danh mục
│   │   ├── Checkout/        # Thanh toán
│   │   ├── Compare/         # So sánh sản phẩm
│   │   ├── Home/            # Trang chủ
│   │   ├── Notifications/    # Trung tâm thông báo
│   │   ├── Orders/          # Lịch sử + chi tiết đơn hàng
│   │   ├── ProductDetail/   # Chi tiết sản phẩm
│   │   ├── ProductList/      # Danh sách sản phẩm
│   │   ├── Promotion/        # Khuyến mãi & voucher
│   │   ├── RecentlyViewed/   # Sản phẩm đã xem
│   │   ├── Search/          # Trang tìm kiếm
│   │   ├── Shipping/         # Theo dõi vận chuyển
│   │   └── Wishlist/        # Danh sách yêu thích
│   │
│   ├── errors/              # Error pages
│   │   └── ErrorPages.tsx    # 404, 403, 500 pages
│   │
│   └── shop/                # Shop seller portal
│       ├── CreateProduct/     # Tạo sản phẩm mới
│       ├── ShopDashboard/   # Dashboard seller
│       ├── ShopFinance/      # Tài chính cửa hàng
│       ├── ShopInventory/    # Quản lý kho hàng
│       ├── ShopOrderList/    # Quản lý đơn hàng
│       ├── ShopPayment/      # Thanh toán seller
│       ├── ShopProductList/  # Danh sách sản phẩm
│       ├── ShopProfile/      # Cài đặt cửa hàng
│       ├── ShopPromotions/   # Quản lý khuyến mãi
│       ├── ShopReports/      # Báo cáo
│       ├── ShopReviews/       # Quản lý đánh giá
│       ├── ShopShipping/     # Quản lý vận chuyển
│       └── ShopSupport/      # Hỗ trợ khách hàng
│
├── router/
│   └── index.tsx             # React Router configuration
│
├── services/
│   ├── authService.ts       # Authentication service
│   └── mock/
│       └── api.ts           # Mock API endpoints
│
├── styles/
│   └── global.css           # Design system CSS variables
│
├── types/
│   ├── auth.ts             # Auth types (UserRole enum, User, etc.)
│   └── index.ts            # All shared types
│
└── utils/
    └── index.ts            # Utility functions (formatPrice, debounce, etc.)
```

---

## Routing System

### Route Constants (`src/constants/routes.ts`)

```typescript
export const ROUTES = {
  // Public
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:slug',
  CATEGORIES: '/categories',
  CATEGORY_DETAIL: '/categories/:slug',
  BRANDS: '/brands',
  BRAND_DETAIL: '/brands/:slug',
  SEARCH: '/search',
  PROMOTIONS: '/promotions',
  BLOGS: '/blogs',
  BLOG_DETAIL: '/blogs/:slug',
  SHOPS: '/shops',
  SHOP_DETAIL: '/shops/:slug',
  CONTACT: '/contact',
  ABOUT: '/about',
  FAQ: '/faq',

  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // Customer (protected)
  ACCOUNT: '/account',
  ACCOUNT_DASHBOARD: '/account/dashboard',
  ORDERS: '/orders',
  ORDER_DETAIL: '/orders/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  WISHLIST: '/wishlist',
  COMPARE: '/compare',
  RECENTLY_VIEWED: '/recently-viewed',
  ADDRESSES: '/addresses',
  PAYMENTS: '/payments',
  NOTIFICATIONS: '/notifications',
  SUPPORT: '/support',

  // Shop (protected - SHOP, ADMIN)
  SHOP_DASHBOARD: '/shop/dashboard',
  SHOP_PRODUCTS: '/shop/products',
  SHOP_PRODUCT_CREATE: '/shop/products/create',
  SHOP_PRODUCT_EDIT: '/shop/products/edit/:id',
  SHOP_ORDERS: '/shop/orders',
  SHOP_INVENTORY: '/shop/inventory',
  SHOP_PROMOTIONS: '/shop/promotions',
  SHOP_REVIEWS: '/shop/reviews',
  SHOP_REPORTS: '/shop/reports',
  SHOP_FINANCE: '/shop/finance',
  SHOP_PAYMENTS: '/shop/payments',
  SHOP_SUPPORT: '/shop/support',
  SHOP_PROFILE: '/shop/profile',

  // Admin (protected - ADMIN)
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_CUSTOMERS: '/admin/customers',
  ADMIN_SHOPS: '/admin/shops',
  ADMIN_PAYMENTS: '/admin/payments',
  ADMIN_REVIEWS: '/admin/reviews',
  ADMIN_PROMOTIONS: '/admin/promotions',
  ADMIN_SUPPORT: '/admin/support',
  ADMIN_REPORTS: '/admin/reports',
  ADMIN_ROLES: '/admin/roles',

  // Errors
  NOT_FOUND: '/404',
  FORBIDDEN: '/403',
  SERVER_ERROR: '/500',
} as const;
```

### Route Structure

| Layout | Route | Role | Pages |
|--------|-------|------|-------|
| `AuthLayout` | `/login` | Public | Đăng nhập |
| `AuthLayout` | `/register` | Public | Đăng ký |
| `AuthLayout` | `/forgot-password` | Public | Quên mật khẩu |
| `MainLayout` | `/` | Public | Trang chủ |
| `MainLayout` | `/products` | Public | Danh sách sản phẩm |
| `MainLayout` | `/products/:slug` | Public | Chi tiết sản phẩm |
| `MainLayout` | `/categories/:slug` | Public | Danh mục |
| `MainLayout` | `/brands/:slug` | Public | Thương hiệu |
| `MainLayout` | `/search` | Public | Tìm kiếm |
| `MainLayout` | `/compare` | Public | So sánh |
| `MainLayout` | `/cart` | Public | Giỏ hàng |
| `MainLayout` | `/wishlist` | Public | Yêu thích |
| `MainLayout` | `/recently-viewed` | Public | Đã xem |
| `MainLayout` | `/promotions` | Public | Khuyến mãi |
| `MainLayout` | `/orders/:id` | Public | Chi tiết đơn |
| `CustomerLayout` | `/account` | CUSTOMER | Tài khoản |
| `CustomerLayout` | `/orders` | CUSTOMER | Lịch sử đơn hàng |
| `CustomerLayout` | `/notifications` | CUSTOMER | Thông báo |
| `CustomerLayout` | `/support` | CUSTOMER | Hỗ trợ |
| `ShopLayout` | `/shop` | SHOP, ADMIN | Dashboard |
| `ShopLayout` | `/shop/products` | SHOP, ADMIN | Quản lý sản phẩm |
| `ShopLayout` | `/shop/orders` | SHOP, ADMIN | Quản lý đơn hàng |
| `ShopLayout` | `/shop/inventory` | SHOP, ADMIN | Kho hàng |
| `ShopLayout` | `/shop/promotions` | SHOP, ADMIN | Khuyến mãi |
| `ShopLayout` | `/shop/reviews` | SHOP, ADMIN | Đánh giá |
| `ShopLayout` | `/shop/reports` | SHOP, ADMIN | Báo cáo |
| `ShopLayout` | `/shop/finance` | SHOP, ADMIN | Tài chính |
| `ShopLayout` | `/shop/payments` | SHOP, ADMIN | Thanh toán |
| `ShopLayout` | `/shop/support` | SHOP, ADMIN | Hỗ trợ |
| `ShopLayout` | `/shop/shipping` | SHOP, ADMIN | Vận chuyển |
| `ShopLayout` | `/shop/profile` | SHOP, ADMIN | Cài đặt shop |
| `AdminLayout` | `/admin` | ADMIN | Dashboard |
| `AdminLayout` | `/admin/products` | ADMIN | Quản lý SP |
| `AdminLayout` | `/admin/orders` | ADMIN | Quản lý đơn |
| `AdminLayout` | `/admin/customers` | ADMIN | Quản lý KH |
| `AdminLayout` | `/admin/stores` | ADMIN | Quản lý shop |
| `AdminLayout` | `/admin/payments` | ADMIN | Quản lý TT |
| `AdminLayout` | `/admin/reviews` | ADMIN | Quản lý DG |
| `AdminLayout` | `/admin/promotions` | ADMIN | Quản lý KM |
| `AdminLayout` | `/admin/support` | ADMIN | Quản lý HT |
| `AdminLayout` | `/admin/reports` | ADMIN | Báo cáo |
| `AdminLayout` | `/admin/notifications` | ADMIN | Thông báo |
| `AdminLayout` | `/admin/access` | ADMIN | Phân quyền |
| `AdminLayout` | `/admin/finance` | ADMIN | Tài chính |

---

## Authentication & Authorization

### User Roles (`src/types/auth.ts`)

```typescript
export type UserRole = 'GUEST' | 'CUSTOMER' | 'SHOP' | 'ADMIN' | 'SUPER_ADMIN';

export const UserRole = {
  GUEST: 'GUEST',
  CUSTOMER: 'CUSTOMER',
  SHOP: 'SHOP',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
};
```

### Auth Flow

```
┌─────────────┐    login()    ┌──────────────┐
│  LoginPage  │──────────────►│  AuthContext │
└─────────────┘               └──────┬───────┘
                                    │
                           authService.login()
                                    │
                              ┌─────▼─────┐
                              │ Mock API   │
                              │ & Storage  │
                              └───────────┘
                                    │
                           token + user → localStorage
                                    │
                         isAuthenticated = true
```

### Permission Route (`src/guards/PermissionRoute.tsx`)

```typescript
// Sử dụng:
<PermissionRoute allowedRoles={['ADMIN' as UserRole]}>
  <AdminContent />
</PermissionRoute>

// Nếu không đủ quyền → Redirect /403
```

### Auth Context (`src/contexts/AuthContext/AuthContext.tsx`)

```typescript
interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: string;
  token: string | null;
  login: (email, password, rememberMe?) => Promise<{ success, message }>;
  register: (data) => Promise<{ success, message }>;
  logout: () => void;
  updateUser: (data) => void;
}
```

---

## Hệ Thống Layout

### MainLayout
```
┌─────────────────────────────────────┐
│  Header (Sticky + Glassmorphism)    │
├─────────────────────────────────────┤
│  Breadcrumb                         │
├─────────────────────────────────────┤
│                                     │
│  <Outlet /> (Main Content)          │
│                                     │
├─────────────────────────────────────┤
│  Footer                             │
└─────────────────────────────────────┘
+ BackToTop Button
```

### AuthLayout
```
┌──────────────────┬──────────────────┐
│                  │                  │
│  Left Panel      │  Right Panel     │
│  - Brand info    │                  │
│  - Features      │  <Outlet />      │
│  - Footer        │  Login/Register/ │
│                  │  Forgot Password │
│                  │                  │
└──────────────────┴──────────────────┘
```

### AdminLayout / ShopLayout
```
┌────────┬──────────────────────────────┐
│        │  Top Header                 │
│  Side │───────────────────────────── │
│  bar  │                              │
│        │  <Outlet />                 │
│  Nav  │  Main Content               │
│        │                              │
└────────┴──────────────────────────────┘
+ Notification bell, User menu
```

### CustomerLayout
```
┌─────────────────────────────────────┐
│  Header (Sticky)                    │
├─────────────────────────────────────┤
│  Sidebar (Account nav) + Content    │
├─────────────────────────────────────┤
│  Footer                             │
└─────────────────────────────────────┘
```

---

## Global Components

### Header System

- **Sticky Header**: Khi scroll xuống header sticky với backdrop-blur
- **Glassmorphism**: Header trong suốt ở đầu trang
- **Mega Menu**: Danh mục sản phẩm với sub-categories
- **Mini Cart**: Quick view giỏ hàng
- **Search Bar**: Tìm kiếm với debounce + history + suggestions
- **Notification Center**: Thông báo theo type
- **User Menu**: Dropdown với account options

### Breadcrumb
```typescript
// Tự động theo route
Trang Chủ > Danh Mục > Sản Phẩm > Chi Tiết
```

### BackToTop
- Xuất hiện khi scroll > 300px
- Smooth scroll về đầu trang
- Position: fixed bottom-right

### Footer
- Giới thiệu công ty
- Chính sách (Bảo hành, Đổi trả, Vận chuyển)
- Hỗ trợ (FAQ, Hướng dẫn, Liên hệ)
- Mạng xã hội (Facebook, YouTube, TikTok, Instagram, Zalo)
- Thông tin doanh nghiệp

---

## Mock API

### Auth Service (`src/services/authService.ts`)

```typescript
authService.login(email, password)     // → { user, token }
authService.register(data)            // → User
authService.getCurrentUser(token)     // → User | null
authService.changePassword(...)        // → boolean
authService.updateProfile(...)        // → User
```

### Mock API (`src/services/mock/api.ts`)

```typescript
// Products
mockApi.getProducts(params)           // → { products, total }
mockApi.getProductBySlug(slug)         // → Product | null
mockApi.getFeaturedProducts()           // → Product[]
mockApi.getHotProducts()               // → Product[]
mockApi.getFlashSaleProducts()         // → Product[]
mockApi.getRelatedProducts(id, limit)  // → Product[]
mockApi.getProductsByCategory(slug)     // → { products, total }
mockApi.getProductsByBrand(slug)        // → { products, total }
mockApi.search(query)                  // → { products, categories, brands }

// Orders
mockApi.getOrders(userId)             // → Order[]
mockApi.getOrderById(orderId)          // → Order | null
mockApi.createOrder(data)              // → Order

// Reviews
mockApi.getReviews(productId)          // → Review[]
mockApi.createReview(data)              // → Review

// Notifications
mockApi.getNotifications(userId)        // → Notification[]
mockApi.markNotificationRead(id)        // → void
mockApi.markAllNotificationsRead()       // → void

// Promotions
mockApi.getPromotions()                // → Promotion[]

// Payments
mockApi.getPayments(userId?)           // → Payment[]

// Stores
mockApi.getStores()                    // → Store[]

// Support
mockApi.getSupportTickets(userId)       // → SupportTicket[]
mockApi.createSupportTicket(data)       // → SupportTicket
```

---

## Tính Năng Chính

### Customer Module
- [x] Đăng ký / Đăng nhập / Quên mật khẩu
- [x] Giỏ hàng (thêm, xóa, cập nhật số lượng, chọn sản phẩm)
- [x] Checkout (chọn địa chỉ, phương thức thanh toán)
- [x] Lịch sử đơn hàng + Chi tiết đơn hàng
- [x] Theo dõi vận chuyển (Timeline)
- [x] Wishlist (lưu localStorage)
- [x] Recently Viewed (lưu localStorage)
- [x] So sánh sản phẩm (max 4 sản phẩm)
- [x] Tài khoản cá nhân (Profile, Bảo mật, Thông báo)
- [x] Thông báo (Read/Unread, Filter by type)
- [x] Khuyến mãi & Voucher
- [x] Search với Debounce + History

### Product Module
- [x] 100+ sản phẩm thực (không placeholder)
- [x] Filter (Category, Brand, Price, Rating, In Stock)
- [x] Sort (Mới nhất, Bán chạy, Giá, Đánh giá)
- [x] Pagination
- [x] Gallery ảnh sản phẩm
- [x] Thông số kỹ thuật
- [x] Reviews hiển thị
- [x] Sản phẩm liên quan

### Shop Portal
- [x] Dashboard với Stats Cards
- [x] Quản lý sản phẩm (CRUD)
- [x] Quản lý đơn hàng
- [x] Quản lý kho hàng
- [x] Quản lý vận chuyển
- [x] Quản lý đánh giá
- [x] Quản lý khuyến mãi
- [x] Báo cáo doanh thu
- [x] Tài chính
- [x] Thanh toán
- [x] Hỗ trợ khách hàng
- [x] Cài đặt cửa hàng

### Admin Dashboard
- [x] Dashboard tổng quan
- [x] Quản lý sản phẩm
- [x] Quản lý đơn hàng
- [x] Quản lý khách hàng
- [x] Quản lý cửa hàng
- [x] Quản lý thanh toán
- [x] Quản lý đánh giá
- [x] Quản lý khuyến mãi
- [x] Quản lý hỗ trợ
- [x] Báo cáo hệ thống
- [x] Quản lý thông báo
- [x] Phân quyền người dùng
- [x] Tài chính hệ thống

---

## Design System

### Color Palette

```css
/* Primary */
--color-primary: #4F46E5;        /* Indigo - chính */
--color-primary-hover: #4338CA;  /* Hover state */
--color-primary-light: #6366F1;  /* Light variant */

/* Accent */
--color-accent: #06B6D4;         /* Cyan */

/* Semantic */
--color-success: #10B981;        /* Xanh lá */
--color-warning: #F59E0B;          /* Vàng cam */
--color-danger: #EF4444;          /* Đỏ */

/* Dark */
--color-dark: #111827;
--color-dark-surface: #1F2937;

/* Surface */
--color-background: #F8FAFC;
--color-surface: #FFFFFF;
--color-border: #E5E7EB;

/* Text */
--color-text-primary: #111827;
--color-text-secondary: #6B7280;
--color-text-muted: #9CA3AF;
```

### Typography

```css
/* Font Family */
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Font Sizes */
--font-size-xs: 11px;
--font-size-sm: 13px;
--font-size-base: 15px;
--font-size-md: 16px;
--font-size-lg: 18px;
--font-size-xl: 20px;
--font-size-2xl: 24px;
--font-size-3xl: 30px;
--font-size-4xl: 36px;
--font-size-5xl: 48px;
```

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
--shadow-card: 0 4px 24px rgba(79, 70, 229, 0.08);
--shadow-card-hover: 0 12px 40px rgba(79, 70, 229, 0.18);
--shadow-primary: 0 4px 20px rgba(79, 70, 229, 0.35);
```

### Gradients

```css
--gradient-primary: linear-gradient(135deg, #4F46E5 0%, #6366F1 100%);
--gradient-primary-hover: linear-gradient(135deg, #4338CA 0%, #4F46E5 100%);
--gradient-accent: linear-gradient(135deg, #06B6D4 0%, #0891B2 100%);
--gradient-hero: linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 50%, #C7D2FE 100%);
```

### Border Radius

```css
--radius-xs: 4px;
--radius-sm: 8px;
--radius-md: 12px;   /* Buttons */
--radius-lg: 16px;
--radius-xl: 20px;   /* Cards */
--radius-2xl: 24px;
--radius-full: 9999px;  /* Badges */
```

### Breakpoints

```css
--breakpoint-mobile: 480px;
--breakpoint-tablet: 768px;
--breakpoint-desktop: 1024px;
--breakpoint-wide: 1280px;
--breakpoint-ultra: 1536px;
```

### Dark Mode

```css
[data-theme="dark"] {
  --color-background: #0F172A;
  --color-surface: #1E293B;
  --color-text-primary: #F1F5F9;
  --color-text-secondary: #94A3B8;
  --color-border: #334155;
  /* ... all colors adapt */
}
```

---

## Roadmap

### Giai đoạn 1: Foundation ✅ HOÀN THÀNH
- [x] Project setup (Vite + React 19 + TypeScript)
- [x] Routing System với React Router DOM v7
- [x] Authentication System (AuthContext, Login, Register)
- [x] Authorization System (Role-based PermissionRoute)
- [x] Design System CSS Variables
- [x] Global Components (Header, Footer, Layouts)
- [x] Mock API + 100+ sản phẩm
- [x] Customer Module cơ bản
- [x] Product Module
- [x] Shop Portal
- [x] Admin Dashboard

### Giai đoạn 2: Enhancement (Sắp tới)
- [ ] Blog Module (Tin tức công nghệ)
- [ ] Live Chat Widget
- [ ] Push Notifications (Browser API)
- [ ] PWA Support (Service Worker, Offline mode)
- [ ] Advanced Search (Elasticsearch-like mock)
- [ ] Advanced Analytics Dashboard cho Admin/Shop

### Giai đoạn 3: Integration (Tương lai)
- [ ] Thay Mock API bằng REST API thực (Express/FastAPI)
- [ ] WebSocket cho Notifications real-time
- [ ] Stripe/PayPal integration cho thanh toán
- [ ] Image upload (Cloudinary/S3)
- [ ] Email service (SendGrid)
- [ ] SMS OTP verification

### Giai đoạn 4: Scale (Dài hạn)
- [ ] SSR/SSG với React Server Components
- [ ] Micro-frontend architecture
- [ ] Multi-vendor marketplace
- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations
- [ ] Advanced caching strategy

---

## Scripts

```bash
npm run dev       # Development server (http://localhost:5173)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint check
```

---

## License

Private project - Do An Cong Nghe Thong Tin
