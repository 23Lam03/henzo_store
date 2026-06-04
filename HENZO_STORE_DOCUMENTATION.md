# HenzoStore - Công Nghệ Hàng Đầu

> E-commerce Platform - Xây dựng bằng React 19 + TypeScript Strict + Vite + Pure CSS
>
> Chuyên kinh doanh: Điện thoại, Laptop, PC Gaming, Linh kiện máy tính, Phụ kiện công nghệ

---

## Mục Lục

- [Trạng Thái Dự Án](#trạng-thái-dự-án)
- [Tech Stack](#tech-stack)
- [Yêu Cầu Bắt Buộc](#yêu-cầu-bắt-buộc)
- [Cài Đặt](#cài-đặt)
- [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)
- [Routing System](#routing-system)
- [Authentication & Authorization](#authentication--authorization)
- [Hệ Thống Layout](#hệ-thống-layout)
- [Design System](#design-system)
- [Responsive Strategy](#responsive-strategy)
- [Tài Khoản Demo](#tài-khoản-demo)
- [Mock API](#mock-api)
- [Tính Năng Hoàn Thành](#tính-năng-hoàn-thành)
- [Bug Fixes](#bug-fixes)
- [Roadmap](#roadmap)

---

## Trạng Thái Dự Án

```
Trạng thái: ✅ HOÀN THÀNH
Build:       ✅ PASSED  (npm run build)
Dev Server:   ✅ http://localhost:5173-5180
TypeScript:  ✅ Strict Mode - 0 lỗi
Total Files:  ✅ 257+ files (80 components, 55 pages, 10 contexts)
```

---

## Tech Stack

| Layer | Công nghệ | Version |
|-------|-----------|---------|
| Framework | React | 19.2.6 |
| Language | TypeScript (Strict Mode) | ~6.0.2 |
| Build Tool | Vite | 8.0.12 |
| Routing | React Router DOM | 7.16.0 |
| Styling | Pure CSS (CSS Variables) | - |
| State Management | Context API + useState + useCallback | - |
| Storage | LocalStorage + SessionStorage | - |
| API | Mock API (async/await với delay simulation) | - |

### Không sử dụng (Cấm tuyệt đối)

```
❌ TailwindCSS    ❌ Bootstrap     ❌ Material UI
❌ Ant Design     ❌ Chakra UI     ❌ Styled Components
❌ CSS-in-JS      ❌ SCSS Modules ❌ Tailwind
```

### Ngành hàng kinh doanh

```
📱 Điện thoại     (iPhone, Samsung, Xiaomi, OPPO, Vivo, Google, OnePlus...)
💻 Laptop         (MacBook, ASUS ROG, MSI, Dell, HP, Lenovo, Acer...)
🖥️ PC Gaming      (RTX 5090, CPU, RAM, SSD, Case, Nguồn, Tản nhiệt...)
🖱️ Phụ kiện      (Chuột, Bàn phím, Tai nghe, Màn hình, Camera, Loa...)
⌚ Đồng hồ        (Apple Watch, Samsung Watch, Xiaomi Watch...)
🖥️ Màn hình      (Samsung Odyssey, LG UltraGear, Dell UltraSharp...)
🌐 Thiết bị mạng  (Router WiFi, Access Point, Switch...)
```

---

## Yêu Cầu Bắt Buộc

```
✅ 100% Pure CSS - Không dùng framework UI nào
✅ 100% tiếng Việt - Toàn bộ text hiển thị
✅ Responsive hoàn toàn - Desktop, Tablet, Mobile
✅ Không trang trắng - Mọi trang đều có nội dung
✅ Không placeholder - Tất cả ảnh đều là ảnh thật từ Internet
✅ Lazy Loading - Ảnh có loading="lazy"
✅ TypeScript Strict Mode - 0 lỗi type
✅ Enterprise Architecture - Tách biệt components, layouts, contexts, services
✅ Mock API hoàn chỉnh - Tất cả data đều có sẵn
✅ Chạy được ngay sau npm install + npm run dev
```

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

## Cấu Trúc Thư Mục

```
src/
├── App.tsx                              # Root component - 9 Context Providers lồng nhau
├── App.css
├── main.tsx                             # Entry point
├── index.css                            # CSS entry (redirects to global.css)
│
├── assets/                              # Logo, hình ảnh tĩnh
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
│
├── components/                          # 88 files - CORE UI COMPONENTS
│   ├── admin/
│   │   └── AdminDataTable/
│   │       ├── AdminDataTable.tsx      # Reusable data table cho admin
│   │       ├── AdminDataTable.css
│   │       └── index.ts
│   │
│   ├── breadcrumb/
│   │   ├── Breadcrumb.tsx              # Breadcrumb động theo route
│   │   ├── Breadcrumb.css
│   │   └── index.ts
│   │
│   ├── common/
│   │   ├── BackToTop/
│   │   │   ├── BackToTop.tsx           # Nút cuộn lên đầu (xuất hiện khi scroll > 300px)
│   │   │   ├── BackToTop.css
│   │   │   └── index.ts
│   │   ├── Loading/
│   │   │   ├── LoadingSpinner.tsx       # Spinner loading
│   │   │   └── index.ts
│   │   ├── ProductCard/
│   │   │   ├── ProductCard.tsx          # Card sản phẩm reusable (Grid + List view)
│   │   │   ├── ProductCard.css
│   │   │   └── index.ts
│   │   └── RouteLoader/
│   │       ├── RouteLoader.tsx          # Loading khi chuyển route (Suspense)
│   │       ├── RouteLoader.css
│   │       └── index.ts
│   │
│   ├── footer/
│   │   └── Footer/
│   │       ├── Footer.tsx               # Footer chuyên nghiệp (6 sections)
│   │       ├── Footer.css               # Responsive: 5→3→2→1 cột grid
│   │       └── index.ts
│   │
│   ├── header/
│   │   ├── Header/
│   │   │   ├── Header.tsx               # Header sticky + glassmorphism + mobile drawer
│   │   │   ├── Header.css               # Responsive: 72px → 64px (mobile)
│   │   │   └── index.ts
│   │   ├── MegaMenu/
│   │   │   ├── MegaMenu.tsx             # Mega menu danh mục
│   │   │   ├── MegaMenu.css
│   │   │   └── index.ts
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.tsx            # Search toàn cục + debounce + history
│   │   │   ├── SearchBar.css
│   │   │   └── index.ts
│   │   ├── MiniCart/
│   │   │   ├── MiniCart.tsx             # Giỏ hàng mini dropdown
│   │   │   ├── MiniCart.css
│   │   │   └── index.ts
│   │   ├── NotificationCenter/
│   │   │   ├── NotificationCenter.tsx   # Trung tâm thông báo
│   │   │   ├── NotificationCenter.css
│   │   │   └── index.ts
│   │   ├── UserMenu/
│   │   │   ├── UserMenu.tsx             # Menu người dùng dropdown
│   │   │   ├── UserMenu.css
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── layouts/                        # 5 LAYOUTS hoàn chỉnh
│   │   ├── MainLayout/
│   │   │   ├── MainLayout.tsx           # Public pages (Header + Footer + Breadcrumb)
│   │   │   ├── MainLayout.css
│   │   │   └── index.ts
│   │   ├── AuthLayout/
│   │   │   ├── AuthLayout.tsx           # Login/Register/ForgotPassword
│   │   │   ├── AuthLayout.css
│   │   │   └── index.ts
│   │   ├── CustomerLayout/
│   │   │   ├── CustomerLayout.tsx       # Tài khoản khách hàng
│   │   │   ├── CustomerLayout.css
│   │   │   └── index.ts
│   │   ├── ShopLayout/
│   │   │   ├── ShopLayout.tsx           # Seller Dashboard (/seller/*)
│   │   │   ├── SellerSidebar.tsx        # Dynamic sidebar theo role
│   │   │   ├── SellerHeader.tsx
│   │   │   ├── AdminLayout.css
│   │   │   ├── SellerSidebar.css
│   │   │   ├── SellerHeader.css
│   │   │   ├── ShopLayout.css           # Responsive: fixed sidebar → mobile drawer
│   │   │   └── index.ts
│   │   └── AdminLayout/
│   │       ├── AdminLayout.tsx          # Admin Dashboard (/admin/*)
│   │       ├── AdminLayout.css          # Responsive: sidebar → mobile overlay
│   │       └── index.ts
│   ╰── product/                        # PRODUCT MODULE COMPONENTS
│   │   ├── ProductCard/
│   │   │   ├── ProductCard.tsx          # Card với hover lift, badge, wishlist
│   │   │   ├── ProductCard.css
│   │   │   └── index.ts
│   │   ├── ProductCompare/
│   │   │   ├── ProductCompare.tsx       # So sánh tối đa 4 sản phẩm
│   │   │   ├── ProductCompare.css
│   │   │   └── index.ts
│   │   ├── ProductFilter/
│   │   │   ├── ProductFilter.tsx        # Filter: category, brand, price, rating
│   │   │   ├── ProductFilter.css
│   │   │   └── index.ts
│   │   ├── ProductGallery/
│   │   │   ├── ProductGallery.tsx       # Gallery 5 ảnh + zoom
│   │   │   ├── ProductGallery.css
│   │   │   └── index.ts
│   │   ├── ProductGrid/
│   │   │   ├── ProductGrid.tsx          # Grid/List view switcher
│   │   │   ├── ProductGrid.css
│   │   │   └── index.ts
│   │   ├── ProductReview/
│   │   │   ├── ProductReview.tsx        # Đánh giá sao (1-5)
│   │   │   ├── ProductReview.css
│   │   │   └── index.ts
│   │   ├── ProductSort/
│   │   │   ├── ProductSort.tsx          # Sort: mới, bán chạy, giá, đánh giá
│   │   │   ├── ProductSort.css
│   │   │   └── index.ts
│   │   ├── ProductSpecification/
│   │   │   ├── ProductSpecification.tsx # Thông số kỹ thuật
│   │   │   ├── ProductSpecification.css
│   │   │   └── index.ts
│   │   ├── Pagination/
│   │   │   ├── Pagination.tsx           # Phân trang
│   │   │   ├── Pagination.css
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   └── sidebar/
│       ├── Sidebar.tsx                  # Customer sidebar (account navigation)
│       ├── Sidebar.css
│       └── index.ts
│
├── constants/
│   ├── index.ts                         # Export all constants
│   └── routes.ts                        # Route constants + PAGE_TITLES + APP_NAME
│
├── contexts/                             # 10 CONTEXT PROVIDERS
│   ├── AdminContext/
│   │   ├── AdminContext.tsx            # Admin state management
│   │   └── index.ts
│   ├── AuthContext/
│   │   ├── AuthContext.tsx             # Auth: login, logout, register, role
│   │   └── index.ts
│   ├── CartContext/
│   │   ├── CartContext.tsx             # Giỏ hàng với LocalStorage
│   │   └── index.ts
│   ├── CompareContext/
│   │   ├── CompareContext.tsx          # So sánh sản phẩm (max 4)
│   │   └── index.ts
│   ├── NotificationContext/
│   │   ├── NotificationContext.tsx     # Thông báo + badge count
│   │   └── index.ts
│   ├── RecentlyViewedContext/
│   │   ├── RecentlyViewedContext.tsx    # 20 sản phẩm đã xem (LocalStorage)
│   │   └── index.ts
│   ├── SearchContext/
│   │   ├── SearchContext.tsx           # Search history + suggestions (LocalStorage)
│   │   └── index.ts
│   ├── SellerContext/
│   │   ├── SellerContext.tsx           # Shop seller state management
│   │   └── index.ts
│   ├── ThemeContext/
│   │   ├── ThemeContext.tsx            # Dark/Light mode (LocalStorage)
│   │   └── index.ts
│   ├── WishlistContext/
│   │   ├── WishlistContext.tsx         # Wishlist với LocalStorage
│   │   └── index.ts
│   └── index.ts
│
├── data/                                # MOCK DATA
│   ├── products.ts                      # 100+ sản phẩm thực (2425 dòng)
│   ├── adminData.ts                    # Admin dashboard stats, chart data
│   └── sellerData.ts                   # Seller: orders, inventory, payments, reviews
│
├── guards/
│   ├── PermissionRoute.tsx             # RBAC - Role Based Access Control
│   ├── ProtectedRoute.tsx               # Auth protection - redirect /login
│   └── index.ts
│
├── hooks/
│   └── index.ts
│
├── pages/                               # 62 PAGES - HOÀN CHỈNH
│   ├── admin/                          # 13 Admin Pages (/admin/*)
│   │   ├── AdminDashboard/
│   │   │   ├── DashboardPage.tsx      # Dashboard + KPI cards + Revenue Chart + Activity
│   │   │   ├── DashboardPage.css
│   │   │   └── index.ts
│   │   ├── AdminProduct/
│   │   │   ├── AdminProductPage.tsx   # Quản lý sản phẩm + kiểm duyệt
│   │   │   ├── AdminProductPage.css
│   │   │   └── index.ts
│   │   ├── AdminOrder/
│   │   │   ├── AdminOrderPage.tsx     # Quản lý đơn hàng + trạng thái
│   │   │   ├── AdminOrderPage.css
│   │   │   └── index.ts
│   │   ├── AdminCustomer/
│   │   │   ├── AdminCustomerPage.tsx  # Quản lý khách hàng
│   │   │   ├── AdminCustomerPage.css
│   │   │   └── index.ts
│   │   ├── AdminStore/
│   │   │   ├── AdminStorePage.tsx     # Quản lý cửa hàng
│   │   │   ├── AdminStorePage.css
│   │   │   └── index.ts
│   │   ├── AdminPayment/
│   │   │   ├── AdminPaymentPage.tsx    # Quản lý thanh toán + giao dịch
│   │   │   ├── AdminPaymentPage.css
│   │   │   └── index.ts
│   │   ├── AdminReview/
│   │   │   ├── AdminReviewPage.tsx     # Kiểm duyệt đánh giá
│   │   │   ├── AdminReviewPage.css
│   │   │   └── index.ts
│   │   ├── AdminPromotion/
│   │   │   ├── AdminPromotionPage.tsx   # Quản lý khuyến mãi + voucher
│   │   │   ├── AdminPromotionPage.css
│   │   │   └── index.ts
│   │   ├── AdminSupport/
│   │   │   ├── AdminSupportPage.tsx    # Quản lý ticket hỗ trợ
│   │   │   ├── AdminSupportPage.css
│   │   │   └── index.ts
│   │   ├── AdminReports/
│   │   │   ├── AdminReportsPage.tsx    # Báo cáo hệ thống
│   │   │   ├── AdminReportsPage.css
│   │   │   └── index.ts
│   │   ├── AdminFinance/
│   │   │   ├── AdminFinancePage.tsx    # Tài chính hệ thống
│   │   │   ├── AdminFinancePage.css
│   │   │   └── index.ts
│   │   ├── AdminNotification/
│   │   │   ├── AdminNotificationPage.tsx # Quản lý thông báo
│   │   │   ├── AdminNotificationPage.css
│   │   │   └── index.ts
│   │   └── AdminAccess/
│   │       ├── AdminAccessPage.tsx     # Phân quyền + Role Matrix
│   │       ├── AdminAccessPage.css
│   │       └── index.ts
│   │
│   ├── auth/                            # 3 Auth Pages
│   │   ├── LoginPage/
│   │   │   ├── LoginPage.tsx           # Login + demo accounts + social login
│   │   │   ├── LoginPage.css
│   │   │   └── index.ts
│   │   ├── RegisterPage/
│   │   │   ├── RegisterPage.tsx        # Registration + validation
│   │   │   ├── RegisterPage.css
│   │   │   └── index.ts
│   │   └── ForgotPasswordPage/
│   │       ├── ForgotPasswordPage.tsx  # Quên mật khẩu
│   │       ├── ForgotPasswordPage.css
│   │       └── index.ts
│   │
│   ├── customer/                        # 17 Customer Pages
│   │   ├── Home/
│   │   │   ├── HomePage.tsx           # Hero, Flash Sale, Featured, Hot, Brands, Newsletter
│   │   │   ├── HomePage.css           # 7 sections responsive
│   │   │   └── index.ts
│   │   ├── ProductList/
│   │   │   ├── ProductListPage.tsx     # Grid/List view + Filter + Sort + Pagination
│   │   │   ├── ProductListPage.css
│   │   │   └── index.ts
│   │   ├── ProductDetail/
│   │   │   ├── ProductDetailPage.tsx  # Gallery, Specs, Reviews, Related Products
│   │   │   ├── ProductDetailPage.css
│   │   │   └── index.ts
│   │   ├── Category/
│   │   │   ├── CategoryPage.tsx       # Chi tiết danh mục
│   │   │   ├── CategoryPage.css
│   │   │   └── index.ts
│   │   ├── Brand/
│   │   │   ├── BrandPage.tsx          # Chi tiết thương hiệu
│   │   │   ├── BrandPage.css
│   │   │   └── index.ts
│   │   ├── Cart/
│   │   │   ├── CartPage.tsx           # Giỏ hàng + áp dụng voucher
│   │   │   ├── CartPage.css
│   │   │   └── index.ts
│   │   ├── Checkout/
│   │   │   ├── CheckoutPage.tsx        # Thanh toán COD, chuyển khoản, ví điện tử
│   │   │   ├── CheckoutPage.css
│   │   │   └── index.ts
│   │   ├── Compare/
│   │   │   ├── ComparePage.tsx        # So sánh sản phẩm (max 4)
│   │   │   ├── ComparePage.css
│   │   │   └── index.ts
│   │   ├── Wishlist/
│   │   │   ├── WishlistPage.tsx       # Danh sách yêu thích
│   │   │   ├── WishlistPage.css
│   │   │   └── index.ts
│   │   ├── RecentlyViewed/
│   │   │   ├── RecentlyViewedPage.tsx  # 20 sản phẩm đã xem gần đây
│   │   │   ├── RecentlyViewedPage.css
│   │   │   └── index.ts
│   │   ├── Account/
│   │   │   ├── AccountPage.tsx        # Tài khoản: profile, địa chỉ, bảo mật
│   │   │   ├── AccountPage.css
│   │   │   └── index.ts
│   │   ├── Orders/
│   │   │   ├── OrderHistoryPage.tsx   # Lịch sử đơn hàng
│   │   │   ├── OrderDetailPage.tsx    # Chi tiết đơn hàng
│   │   │   ├── OrderHistoryPage.css
│   │   │   ├── OrderDetailPage.css
│   │   │   └── index.ts
│   │   ├── Notifications/
│   │   │   ├── NotificationPage.tsx    # Thông báo: đơn hàng, khuyến mãi
│   │   │   ├── NotificationPage.css
│   │   │   └── index.ts
│   │   ├── CustomerSupport/           # [MỚI] Yêu cầu hỗ trợ khách hàng
│   │   │   ├── CustomerSupportPage.tsx
│   │   │   ├── CustomerSupportPage.css
│   │   │   └── index.ts
│   │   └── Contact/                   # [MỚI] Trang liên hệ
│   │       ├── ContactPage.tsx        # Form liên hệ, thông tin cửa hàng, mạng xã hội
│   │       ├── ContactPage.css
│   │       └── index.ts
│   │   ├── Promotion/
│   │   │   ├── PromotionPage.tsx      # Voucher + Flash Sale
│   │   │   ├── PromotionPage.css
│   │   │   └── index.ts
│   │   ├── Search/
│   │   │   ├── SearchPage.tsx         # Tìm kiếm realtime + history
│   │   │   ├── SearchPage.css
│   │   │   └── index.ts
│   │   └── Shipping/
│   │       ├── ShippingTrackingPage.tsx # Theo dõi vận chuyển timeline
│   │       ├── ShippingTrackingPage.css
│   │       └── index.ts
│   │
│   ├── errors/
│   │   ├── ErrorPages.tsx              # 403, 404, 500 - thiết kế chuyên nghiệp
│   │   ├── ErrorPages.css
│   │   └── index.ts
│   │
│   ├── shop/                           # 14 Seller Pages (/seller/*) - 28 files
│   │   ├── ShopDashboard/
│   │   │   ├── ShopDashboardPage.tsx  # KPI + Chart + Recent Orders
│   │   │   ├── ShopDashboardPage.css
│   │   │   └── index.ts
│   │   ├── ShopProductList/
│   │   │   ├── ShopProductListPage.tsx # Quản lý sản phẩm
│   │   │   ├── ShopProductListPage.css
│   │   │   └── index.ts
│   │   ├── CreateProduct/
│   │   │   ├── CreateProductPage.tsx   # Thêm/sửa sản phẩm
│   │   │   ├── CreateProductPage.css
│   │   │   └── index.ts
│   │   ├── ShopOrderList/
│   │   │   ├── ShopOrderListPage.tsx   # Quản lý đơn hàng + cập nhật trạng thái
│   │   │   ├── ShopOrderListPage.css
│   │   │   └── index.ts
│   │   ├── ShopInventory/
│   │   │   ├── ShopInventoryPage.tsx   # Quản lý kho + cảnh báo hết hàng
│   │   │   ├── ShopInventoryPage.css
│   │   │   └── index.ts
│   │   ├── ShopReviews/
│   │   │   ├── ShopReviewsPage.tsx     # Quản lý đánh giá + phản hồi
│   │   │   ├── ShopReviewsPage.css
│   │   │   └── index.ts
│   │   ├── ShopPromotions/
│   │   │   ├── ShopPromotionsPage.tsx   # Tạo voucher, Flash Sale
│   │   │   ├── ShopPromotionsPage.css
│   │   │   └── index.ts
│   │   ├── ShopReports/
│   │   │   ├── ShopReportsPage.tsx     # Báo cáo doanh thu + xuất Excel/PDF
│   │   │   ├── ShopReportsPage.css
│   │   │   └── index.ts
│   │   ├── ShopFinance/
│   │   │   ├── ShopFinancePage.tsx     # Tài chính cửa hàng
│   │   │   ├── ShopFinancePage.css
│   │   │   └── index.ts
│   │   ├── ShopPayment/
│   │   │   ├── ShopPaymentPage.tsx     # Thanh toán + giao dịch
│   │   │   ├── ShopPaymentPage.css
│   │   │   └── index.ts
│   │   ├── ShopShipping/
│   │   │   ├── ShopShippingPage.tsx    # Quản lý vận chuyển
│   │   │   ├── ShopShippingPage.css
│   │   │   └── index.ts
│   │   ├── ShopSupport/
│   │   │   ├── ShopSupportPage.tsx     # Ticket hỗ trợ khách hàng
│   │   │   ├── ShopSupportPage.css
│   │   │   └── index.ts
│   │   ├── ShopProfile/
│   │   │   ├── ShopProfilePage.tsx     # Cài đặt cửa hàng
│   │   │   ├── ShopProfilePage.css
│   │   │   └── index.ts
│   │   └── ShopNotifications/
│   │       ├── ShopNotificationsPage.tsx # Thông báo seller
│   │       ├── ShopNotificationsPage.css
│   │       └── index.ts
│   │
├── repositories/
│
├── router/
│   └── index.tsx                      # React Router v7 - Tất cả routes định nghĩa
│
├── routes/
│   ├── RouteLoader.tsx                # Suspense loading component
│   └── RouteLoader.css
│
├── services/
│   ├── authService.ts                # Mock auth: login, register, profile
│   ├── index.ts
│   └── mock/
│       └── api.ts                    # Mock API: products, orders, reviews...
│
├── styles/
│   ├── global.css                    # Design System CSS (780+ dòng)
│   │                                 # - CSS Variables
│   │                                 # - Dark Mode
│   │                                 # - Button System
│   │                                 # - Card System
│   │                                 # - Form System
│   │                                 # - Responsive Breakpoints
│   │                                 # - Animations
│   │                                 # - Utilities
│   └── admin-pages.css              # Admin-specific styles
│
├── types/
│   ├── auth.ts                      # User, Login, UserRole types
│   ├── seller.ts                   # Seller types: orders, payments, inventory
│   └── index.ts                    # Product, Cart, Order, Review, Notification
│
└── utils/
    └── index.ts                     # formatPrice, formatDate, slugify, validators
```

---

## Routing System

### Route Constants (`src/constants/routes.ts`)

```typescript
export const ROUTES = {
  // ─── Public Routes ───────────────────────────────────────────────
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

  // ─── Auth Routes ─────────────────────────────────────────────────
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // ─── Customer Routes (Protected - CUSTOMER) ───────────────────────
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

  // ─── Shop Routes (Protected - SHOP, ADMIN) ──────────────────────
  SHOP_DASHBOARD: '/seller/dashboard',
  SHOP_PRODUCTS: '/seller/products',
  SHOP_PRODUCT_CREATE: '/seller/products/create',
  SHOP_PRODUCT_EDIT: '/seller/products/edit/:id',
  SHOP_ORDERS: '/seller/orders',
  SHOP_INVENTORY: '/seller/inventory',
  SHOP_PROMOTIONS: '/seller/promotions',
  SHOP_REVIEWS: '/seller/reviews',
  SHOP_REPORTS: '/seller/reports',
  SHOP_FINANCE: '/seller/finance',
  SHOP_PAYMENTS: '/seller/payments',
  SHOP_SUPPORT: '/seller/support',
  SHOP_PROFILE: '/seller/profile',
  SHOP_SHIPPING: '/seller/shipping',
  SHOP_NOTIFICATIONS: '/seller/notifications',

  // ─── Admin Routes (Protected - ADMIN) ────────────────────────────
  ADMIN_DASHBOARD: '/admin',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_CUSTOMERS: '/admin/customers',
  ADMIN_STORES: '/admin/stores',
  ADMIN_PAYMENTS: '/admin/payments',
  ADMIN_REVIEWS: '/admin/reviews',
  ADMIN_PROMOTIONS: '/admin/promotions',
  ADMIN_SUPPORT: '/admin/support',
  ADMIN_REPORTS: '/admin/reports',
  ADMIN_NOTIFICATIONS: '/admin/notifications',
  ADMIN_ACCESS: '/admin/access',
  ADMIN_FINANCE: '/admin/finance',

  // ─── Error Routes ───────────────────────────────────────────────
  NOT_FOUND: '/404',
  FORBIDDEN: '/403',
  SERVER_ERROR: '/500',
} as const;
```

### Route Structure Table

| Layout | Route | Role | Page |
|--------|-------|------|------|
| `AuthLayout` | `/login` | Public | Đăng nhập |
| `AuthLayout` | `/register` | Public | Đăng ký |
| `AuthLayout` | `/forgot-password` | Public | Quên mật khẩu |
| `MainLayout` | `/` | Public | Trang chủ |
| `MainLayout` | `/products` | Public | Danh sách sản phẩm |
| `MainLayout` | `/products/:slug` | Public | Chi tiết sản phẩm |
| `MainLayout` | `/categories/:slug` | Public | Danh mục |
| `MainLayout` | `/brands/:slug` | Public | Thương hiệu |
| `MainLayout` | `/search` | Public | Tìm kiếm |
| `MainLayout` | `/cart` | Public | Giỏ hàng |
| `MainLayout` | `/checkout` | Public | Thanh toán |
| `MainLayout` | `/wishlist` | Public | Yêu thích |
| `MainLayout` | `/compare` | Public | So sánh |
| `MainLayout` | `/recently-viewed` | Public | Đã xem |
| `MainLayout` | `/promotions` | Public | Khuyến mãi |
| `MainLayout` | `/orders/:id` | Public | Chi tiết đơn |
| `CustomerLayout` | `/account` | CUSTOMER | Tài khoản |
| `CustomerLayout` | `/orders` | CUSTOMER | Lịch sử đơn hàng |
| `CustomerLayout` | `/notifications` | CUSTOMER | Thông báo |
| `CustomerLayout` | `/support` | CUSTOMER | Hỗ trợ |
| `ShopLayout` | `/seller/dashboard` | SHOP, ADMIN | Dashboard Seller |
| `ShopLayout` | `/seller/products` | SHOP, ADMIN | Quản lý sản phẩm |
| `ShopLayout` | `/seller/products/create` | SHOP, ADMIN | Thêm sản phẩm |
| `ShopLayout` | `/seller/products/edit/:id` | SHOP, ADMIN | Sửa sản phẩm |
| `ShopLayout` | `/seller/orders` | SHOP, ADMIN | Quản lý đơn hàng |
| `ShopLayout` | `/seller/inventory` | SHOP, ADMIN | Kho hàng |
| `ShopLayout` | `/seller/reviews` | SHOP, ADMIN | Đánh giá |
| `ShopLayout` | `/seller/promotions` | SHOP, ADMIN | Khuyến mãi |
| `ShopLayout` | `/seller/reports` | SHOP, ADMIN | Báo cáo |
| `ShopLayout` | `/seller/finance` | SHOP, ADMIN | Tài chính |
| `ShopLayout` | `/seller/payments` | SHOP, ADMIN | Thanh toán |
| `ShopLayout` | `/seller/shipping` | SHOP, ADMIN | Vận chuyển |
| `ShopLayout` | `/seller/support` | SHOP, ADMIN | Hỗ trợ |
| `ShopLayout` | `/seller/profile` | SHOP, ADMIN | Cài đặt shop |
| `ShopLayout` | `/seller/notifications` | SHOP, ADMIN | Thông báo |
| `AdminLayout` | `/admin` | ADMIN | Dashboard Admin |
| `AdminLayout` | `/admin/products` | ADMIN | Quản lý SP |
| `AdminLayout` | `/admin/orders` | ADMIN | Quản lý đơn |
| `AdminLayout` | `/admin/customers` | ADMIN | Quản lý KH |
| `AdminLayout` | `/admin/stores` | ADMIN | Quản lý Shop |
| `AdminLayout` | `/admin/payments` | ADMIN | Quản lý TT |
| `AdminLayout` | `/admin/reviews` | ADMIN | Quản lý DG |
| `AdminLayout` | `/admin/promotions` | ADMIN | Quản lý KM |
| `AdminLayout` | `/admin/support` | ADMIN | Quản lý HT |
| `AdminLayout` | `/admin/reports` | ADMIN | Báo cáo |
| `AdminLayout` | `/admin/notifications` | ADMIN | Thông báo |
| `AdminLayout` | `/admin/access` | ADMIN | Phân quyền |
| `AdminLayout` | `/admin/finance` | ADMIN | Tài chính |
| `*` | `/403` | Public | Forbidden |
| `*` | `/404` | Public | Not Found |
| `*` | `/500` | Public | Server Error |

---

## Authentication & Authorization

### User Roles

```typescript
export type UserRole = 'GUEST' | 'CUSTOMER' | 'SHOP' | 'ADMIN';

export const UserRole = {
  GUEST: 'GUEST',       // Khách chưa đăng nhập
  CUSTOMER: 'CUSTOMER', // Khách hàng mua hàng
  SHOP: 'SHOP',         // Người bán / Seller
  ADMIN: 'ADMIN',       // Quản trị viên (toàn quyền hệ thống)
};
```

### Auth Flow

```
┌─────────────┐    login()     ┌──────────────┐
│  LoginPage  │───────────────►│  AuthContext │
└─────────────┘                └──────┬───────┘
                                     │
                            authService.login()
                                     │
                               ┌─────▼─────┐
                               │  Mock API  │
                               │  & Storage │
                               └───────────┘
                                     │
                    token + user → localStorage / sessionStorage
                                     │
                          isAuthenticated = true
                          role = 'ADMIN' | 'SHOP' | 'CUSTOMER'
```

### AuthContext API

```typescript
interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: string; // 'GUEST' | 'CUSTOMER' | 'SHOP' | 'ADMIN'
  token: string | null;
  login: (email: string, password: string, rememberMe?: boolean)
         => Promise<{ success: boolean; message: string }>;
  register: (data: { name; email; phone; password })
         => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}
```

### ProtectedRoute

```typescript
// Redirect /login nếu chưa đăng nhập
<ProtectedRoute>
  <AccountPage />
</ProtectedRoute>
```

### PermissionRoute

```typescript
// Redirect /403 nếu không đủ quyền
<PermissionRoute allowedRoles={['ADMIN' as UserRole]}>
  <AdminDashboardPage />
</PermissionRoute>

// SHOP và ADMIN đều có quyền truy cập seller
<PermissionRoute allowedRoles={['SHOP' as UserRole, 'ADMIN' as UserRole]}>
  <ShopDashboardPage />
</PermissionRoute>
```

---

## Hệ Thống Layout

### 1. MainLayout (Public Pages)

```
┌─────────────────────────────────────────────────────────────┐
│  Header (Sticky + Glassmorphism + Backdrop Blur)             │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Logo │ Search Bar │ Nav Links │ Cart │ Wishlist │ User │ │
│  └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│  Breadcrumb (auto theo route)                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    <Outlet />                                │
│                  Main Content                                │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  Footer (6 columns: Brand │ Chính sách │ Hỗ trợ │ MXH │ │
└─────────────────────────────────────────────────────────────┘
+ BackToTop Button (xuất hiện khi scroll > 300px)
```

### 2. AuthLayout (Login/Register/ForgotPassword)

```
┌──────────────────────────┬────────────────────────────────┐
│                          │                                 │
│   Left Panel (40%)       │   Right Panel (60%)            │
│                          │                                 │
│   Logo + Brand Name      │   <Outlet />                   │
│   Tagline                │   LoginPage / RegisterPage /    │
│   Feature highlights     │   ForgotPasswordPage            │
│   Social proof           │                                 │
│   Footer links           │                                 │
│                          │                                 │
└──────────────────────────┴────────────────────────────────┘
```

### 3. AdminLayout (Admin Dashboard)

```
┌──────────────┬─────────────────────────────────────────────┐
│              │  Top Bar: Search │ Notifications │ User Menu │
│  Sidebar     ├─────────────────────────────────────────────┤
│  (280px)     │                                             │
│              │                                             │
│  - Dashboard │              <Outlet />                     │
│  - Products  │            Admin Content                    │
│  - Orders    │                                             │
│  - Customers │                                             │
│  - Stores    │                                             │
│  - Payments  │                                             │
│  - Reviews   │                                             │
│  - Promotions│                                             │
│  - Support   │                                             │
│  - Reports   │                                             │
│  - Finance   │                                             │
│  - Access   │                                             │
│              │                                             │
└──────────────┴─────────────────────────────────────────────┘
Responsive: Sidebar → Mobile Drawer (slide from left)
```

### 4. ShopLayout (Seller Dashboard)

```
┌──────────────┬─────────────────────────────────────────────┐
│              │  Top Bar: Search │ Notifications │ User Menu │
│  Sidebar     ├─────────────────────────────────────────────┤
│  (280px)     │                                             │
│              │                                             │
│  - Dashboard │              <Outlet />                     │
│  - Products  │          Shop Seller Content                │
│  - Orders    │                                             │
│  - Inventory │                                             │
│  - Promotions│                                             │
│  - Reviews   │                                             │
│  - Reports   │                                             │
│  - Finance   │                                             │
│  - Payments  │                                             │
│  - Shipping  │                                             │
│  - Support   │                                             │
│  - Profile   │                                             │
│              │                                             │
└──────────────┴─────────────────────────────────────────────┘
Responsive: Sidebar → Mobile Drawer (slide from left)
```

### 5. CustomerLayout (Account Portal)

```
┌─────────────────────────────────────────────────────────────┐
│  Header (Sticky)                                             │
├─────────────┬───────────────────────────────────────────────┤
│  Sidebar    │                                               │
│  (240px)    │              <Outlet />                       │
│             │           Customer Content                    │
│  - Dashboard│                                               │
│  - Orders   │                                               │
│  - Payments │                                               │
│  - Address  │                                               │
│  - Wishlist │                                               │
│  - Support  │                                               │
├─────────────┴───────────────────────────────────────────────┤
│  Footer                                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Design System

### Color Palette

```css
/* ─── Primary (Indigo) ─────────────────────────────────── */
--color-primary: #4F46E5;           /* Indigo - màu chính */
--color-primary-hover: #4338CA;     /* Hover state */
--color-primary-light: #6366F1;      /* Light variant */

/* ─── Accent (Cyan) ─────────────────────────────────────── */
--color-accent: #06B6D4;            /* Cyan */

/* ─── Semantic Colors ────────────────────────────────────── */
--color-success: #10B981;            /* Xanh lá - thành công */
--color-warning: #F59E0B;           /* Vàng cam - cảnh báo */
--color-danger: #EF4444;             /* Đỏ - lỗi / giảm giá */

/* ─── Dark Colors ───────────────────────────────────────── */
--color-dark: #111827;              /* Dark chính */
--color-dark-surface: #1F2937;       /* Dark surface */

/* ─── Surface Colors (Light Mode) ──────────────────────── */
--color-background: #F8FAFC;       /* Background */
--color-surface: #FFFFFF;           /* Card, modal */
--color-border: #E5E7EB;            /* Border */

/* ─── Text Colors ───────────────────────────────────────── */
--color-text-primary: #111827;      /* Text chính */
--color-text-secondary: #6B7280;    /* Text phụ */
--color-text-muted: #9CA3AF;       /* Text mờ */
```

### Typography

```css
/* ─── Font Family ─────────────────────────────────────────── */
--font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* ─── Font Sizes ─────────────────────────────────────────── */
--font-size-xs:   11px;
--font-size-sm:   13px;
--font-size-base: 15px;
--font-size-md:   16px;
--font-size-lg:   18px;
--font-size-xl:   20px;
--font-size-2xl:  24px;
--font-size-3xl:  30px;
--font-size-4xl:  36px;
--font-size-5xl:  48px;
--font-size-6xl:  60px;

/* ─── Font Weights ───────────────────────────────────────── */
--font-weight-light:    300;
--font-weight-normal:   400;
--font-weight-medium:   500;
--font-weight-semibold: 600;
--font-weight-bold:     700;
--font-weight-extrabold: 800;
--font-weight-black:     900;
```

### Shadows

```css
--shadow-sm:           0 1px 2px rgba(0,0,0,0.05);
--shadow-md:           0 4px 6px rgba(0,0,0,0.1);
--shadow-lg:           0 10px 15px rgba(0,0,0,0.1);
--shadow-xl:           0 20px 25px rgba(0,0,0,0.1);
--shadow-2xl:          0 25px 50px rgba(0,0,0,0.25);
--shadow-card:          0 4px 24px rgba(79,70,229,0.08);
--shadow-card-hover:    0 12px 40px rgba(79,70,229,0.18);
--shadow-primary:       0 4px 20px rgba(79,70,229,0.35);
--shadow-glow:          0 0 20px rgba(79,70,229,0.30);
```

### Gradients

```css
--gradient-primary:         linear-gradient(135deg, #4F46E5 0%, #6366F1 100%);
--gradient-primary-hover:   linear-gradient(135deg, #4338CA 0%, #4F46E5 100%);
--gradient-accent:          linear-gradient(135deg, #06B6D4 0%, #0891B2 100%);
--gradient-dark:             linear-gradient(180deg, #111827 0%, #1F2937 100%);
--gradient-surface:         linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%);
--gradient-hero:            linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 50%, #C7D2FE 100%);
```

### Border Radius

```css
--radius-xs:    4px;
--radius-sm:    8px;
--radius-md:    12px;   /* Buttons */
--radius-lg:    16px;
--radius-xl:    20px;   /* Cards - Product Card */
--radius-2xl:   24px;
--radius-full:  9999px; /* Badges, Avatars */
```

### Z-Index Scale

```css
--z-base:           1;
--z-dropdown:       100;
--z-sticky:         200;
--z-fixed:          300;
--z-modal-backdrop:  400;
--z-modal:          500;
--z-popover:        600;
--z-tooltip:        700;
--z-toast:          800;
```

### Dark Mode

```css
[data-theme="dark"] {
  --color-background:   #0F172A;
  --color-surface:      #1E293B;
  --color-dark-surface: #334155;
  --color-border:       #334155;
  --color-text-primary: #F1F5F9;
  --color-text-secondary: #94A3B8;
  --color-text-muted:   #64748B;
  /* Shadows adapt automatically */
  --shadow-card:         0 4px 24px rgba(0,0,0,0.4);
  --shadow-card-hover:   0 12px 40px rgba(0,0,0,0.5);
  --gradient-hero:       linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #1E3A8A 100%);
}
```

### Button System

```css
/* Primary Button - Gradient Indigo */
.btn-primary {
  background: var(--gradient-primary);   /* #4F46E5 → #6366F1 */
  color: white;
  box-shadow: var(--shadow-primary);
}
.btn-primary:hover {
  background: var(--gradient-primary-hover); /* #4338CA → #4F46E5 */
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}
.btn-primary:active { transform: translateY(0); }

/* Button Sizes */
.btn-sm  { padding: 6px 16px;  font-size: 13px; border-radius: 8px; }
.btn     { padding: 10px 24px; font-size: 15px; border-radius: 12px; }
.btn-lg  { padding: 14px 32px; font-size: 18px; border-radius: 16px; }
.btn-full { width: 100%; }

/* Button Variants */
.btn-secondary  /* Surface + border */
.btn-outline    /* Transparent + primary border */
.btn-ghost      /* Transparent */
.btn-danger     /* Red background */
.btn-dark       /* Dark background */
.btn-accent     /* Cyan accent */
.btn-icon       /* Square icon button */
```

### Card Design

```css
.card {
  background: var(--color-surface);
  border-radius: var(--radius-xl);    /* 20px - Product Card */
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-card);
  transition: all var(--transition-normal);
  overflow: hidden;
}

.card-hover:hover {
  transform: translateY(-8px);       /* Hover lift effect */
  box-shadow: var(--shadow-card-hover);
  border-color: rgba(79, 70, 229, 0.2);
}
```

### Header Style - Glassmorphism

```css
.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--header-height); /* 72px */
  z-index: var(--z-fixed);
  transition: all var(--transition-normal);
}

/* Transparent when at top of page */
.header--transparent {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.3);
}

/* Solid when scrolled */
.header--scrolled {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
}
```

### Animation System

```css
/* Transitions */
--transition-fast:   150ms ease;
--transition-normal: 250ms ease;
--transition-slow:   400ms ease;
--transition-spring: 400ms cubic-bezier(0.34, 1.56, 0.64, 1);

/* Keyframe Animations */
@keyframes fade-in      { from { opacity: 0; } to { opacity: 1; } }
@keyframes fade-up       { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fade-down     { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes scale-in      { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
@keyframes slide-in-right { from { transform: translateX(100%); } to { transform: translateX(0); } }
@keyframes spin          { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes bounce        { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes skeleton-loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
@keyframes badge-pulse    { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
@keyframes shimmer        { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
```

---

## Responsive Strategy

### Breakpoints

| Breakpoint | Kích thước | Thiết bị |
|---|---|---|
| `max-width: 480px` | < 480px | Điện thoại nhỏ |
| `max-width: 640px` | < 640px | Điện thoại thông thường |
| `max-width: 768px` | < 768px | iPad nhỏ, tablet |
| `max-width: 900px` | < 900px | iPad |
| `max-width: 1024px` | < 1024px | iPad Pro, laptop |
| `min-width: 768px` | >= 768px | Desktop, tablet landscape |
| `min-width: 1024px` | >= 1024px | Desktop |
| `min-width: 1280px` | >= 1280px | Màn hình rộng |

### Layout Variables

```css
--header-height: 72px;           /* Desktop header */
--header-mobile-height: 64px;     /* Mobile header */
--sidebar-width: 280px;          /* Admin/Seller sidebar */
--sidebar-collapsed: 72px;       /* Collapsed sidebar */
--max-content-width: 1280px;     /* Max content width */
--footer-height: 420px;          /* Footer height reference */
```

### Chi Tiết Responsive Theo Component

#### Header
```
Desktop:  height 72px, nav links đầy đủ, search bar
Tablet:   height 64px, nav links vẫn hiển thị, search bar
Mobile:   height 64px, hamburger menu, mobile drawer slide-down
          backdrop: rgba(0,0,0,0.4) + blur
          animation: fade-down var(--transition-normal)
```

#### Footer
```
Desktop:  5 cột grid (1.5fr + 3×1fr + 1.2fr)
Tablet:   3 cột grid
Mobile:   2 cột grid
Small:    1 cột (stack dọc)
```

#### HomePage (7 Sections)

| Section | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Hero Banner | 420px height | 300px | 240px |
| Hero Title | 42px | 28px | 22px |
| Hero Padding | 60px | 40px | 24px |
| Categories Grid | 7 cột | 4 cột | 3 cột |
| Categories Gap | 16px | 16px | 8px |
| Products Grid | 4 cột | 3 cột | 2 cột |
| Products Gap | 20px | 20px | 12px |
| Flash Sale Scroll | 8 cards | 6 cards | 4 cards (200px) |
| Brands Grid | 5 cột | 4 cột | 2 cột |
| Promo Banner | 300px | 300px | 200px |
| App CTA Padding | 48px | 32px | 32px |

```css
@media (max-width: 1200px) {
  .categories-grid { grid-template-columns: repeat(4, 1fr); }
  .products-grid { grid-template-columns: repeat(3, 1fr); }
  .products-scroll { grid-template-columns: repeat(6, 1fr); }
}
@media (max-width: 900px) {
  .hero-banner { height: 300px; }
  .hero-banner__content h1 { font-size: 28px; }
  .products-grid { grid-template-columns: repeat(2, 1fr); }
  .products-scroll { grid-template-columns: repeat(4, 200px); }
  .brands-grid { grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 600px) {
  .hero-banner { height: 240px; margin: 12px 0; }
  .hero-banner__overlay { padding: 24px; }
  .hero-banner__content h1 { font-size: 22px; }
  .categories-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .brands-grid { grid-template-columns: repeat(2, 1fr); }
}
```

#### ProductListPage
```
Desktop:  Sidebar 280px + Grid 1fr (2 columns)
Tablet:   Sidebar ẩn, filter toggle button xuất hiện
Mobile:   Single column, sidebar toggle như drawer
```
```css
@media (max-width: 1024px) {
  .product-list-page__layout { grid-template-columns: 1fr; }
  .product-list-page__filter-toggle { display: flex; }
  .product-list-page__sidebar { position: static; display: none; }
  .product-list-page__sidebar.open { display: block; }
}
@media (max-width: 768px) {
  .product-list-page__title { font-size: 22px; }
}
```

#### ProductCard
```
Grid View:  Hover lift effect (translateY(-8px))
List View:  Flex row → Stack vertical trên mobile (<768px)
```
```css
.product-card--list { flex-direction: row; }
@media (max-width: 768px) {
  .product-card--list { flex-direction: column; }
  .product-card__image-wrap--list { width: 100%; border-radius: 16px 16px 0 0; }
  .product-card__actions--list { width: 100%; border-left: none; border-top: 1px; }
}
```

#### AdminLayout
```
Desktop:  Sidebar cố định 280px
Tablet:   Sidebar transform(-100%), mobile overlay drawer
Mobile:   Full overlay, panel chiếm 100% width
Topbar:   Search bar ẩn trên tablet
User:     Name ẩn trên tablet
Content:  padding giảm: 32px → 16px
```
```css
@media (max-width: 1024px) {
  .admin-layout__sidebar {
    position: fixed; top: 0; left: 0; height: 100vh;
    z-index: var(--z-modal);
    transform: translateX(-100%);
    transition: transform var(--transition-normal);
    box-shadow: var(--shadow-2xl);
  }
  .admin-layout__sidebar--mobile-open { transform: translateX(0); }
  .admin-layout__topbar-search { display: none; }
  .admin-layout__user-name { display: none; }
  .admin-layout__mobile-toggle { display: flex; }
}
```

#### ShopLayout
```
Desktop:  Sidebar 280px fixed left
Mobile:   Sidebar transform(-100%), overlay backdrop
Content:  padding: 24px (mobile) → 32px (tablet) → 48px (desktop)
Stat:     grid: 4→3→2→1 cột
```
```css
@media (max-width: 767px) {
  .shop-layout__sidebar { transform: translateX(-100%); }
  .shop-layout__sidebar--mobile-open { transform: translateX(0); }
  .shop-layout__content { padding: var(--space-4); }
}
@media (min-width: 1024px) {
  .shop-layout__content { padding: var(--space-8); }
}
@media (max-width: 768px) {
  .stat-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .stat-grid { grid-template-columns: 1fr; }
}
```

### Global Responsive Utilities

```css
/* Hide elements by breakpoint */
.hide-mobile   { display: none; }        /* < 480px */
.hide-tablet  { display: none; }          /* 481px - 767px */
.hide-desktop { display: none; }        /* >= 768px */

/* Grid auto-responsive */
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }   /* >= 768px */
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }   /* >= 768px */
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }   /* >= 1024px */

/* Container */
.container { padding: 16px; }
@media (min-width: 768px)  { padding: 24px; }
@media (min-width: 1280px) { padding: 32px; }

/* Main layout content padding */
.main-layout__content { padding-top: var(--header-height); }
@media (max-width: 767px) {
  .main-layout__content { padding-top: var(--header-mobile-height); }
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Tài Khoản Demo

| Role | Email | Password | Route | Quyền |
|------|-------|---------|-------|--------|
| **Admin** | `admin@henzo.com` | `123456` | `/admin` | Toàn quyền hệ thống |
| **Shop** | `shop@henzo.com` | `123456` | `/seller` | Quản lý cửa hàng |
| **Customer** | `customer@henzo.com` | `123456` | `/account` | Mua hàng, đơn hàng |

### Demo Quick Fill

Trên trang Login có 3 nút demo cho phép điền nhanh:
- Button **Admin** → Điền `admin@henzo.com` / `123456`
- Button **Shop** → Điền `shop@henzo.com` / `123456`
- Button **Customer** → Điền `customer@henzo.com` / `123456`

---

## Mock API

### AuthService (`src/services/authService.ts`)

```typescript
// Login
authService.login(email, password)
// → { user: User; token: string } | null

// Register
authService.register({ name, email, phone, password })
// → User (lưu vào MOCK_USERS array)

// Get current user from token
authService.getCurrentUser(token)
// → User | null

// Change password
authService.changePassword(userId, currentPassword, newPassword)
// → boolean

// Update profile
authService.updateProfile(userId, data)
// → User
```

### MockAPI (`src/services/mock/api.ts`)

```typescript
// ─── Products ────────────────────────────────────────────────
mockApi.getProducts(params)              // → { products, total }
mockApi.getProductBySlug(slug)            // → Product | null
mockApi.getFeaturedProducts()              // → Product[]
mockApi.getHotProducts()                  // → Product[]
mockApi.getFlashSaleProducts()            // → Product[]
mockApi.getNewProducts()                  // → Product[]
mockApi.getRelatedProducts(id, limit)     // → Product[]
mockApi.getProductsByCategory(slug)        // → { products, total }
mockApi.getProductsByBrand(slug)           // → { products, total }
mockApi.search(query)                     // → { products, categories, brands }

// ─── Orders ─────────────────────────────────────────────────
mockApi.getOrders(userId?)               // → Order[]
mockApi.getOrderById(orderId)             // → Order | null
mockApi.createOrder(data)                // → Order

// ─── Reviews ────────────────────────────────────────────────
mockApi.getReviews(productId)             // → Review[]
mockApi.createReview(data)                // → Review
mockApi.updateReview(id, data)            // → Review
mockApi.deleteReview(id)                  // → boolean

// ─── Notifications ─────────────────────────────────────────
mockApi.getNotifications(userId?)          // → Notification[]
mockApi.markNotificationRead(id)           // → void
mockApi.markAllNotificationsRead()         // → void

// ─── Promotions ─────────────────────────────────────────────
mockApi.getPromotions()                   // → Promotion[]
mockApi.getVouchers()                    // → Voucher[]
mockApi.applyVoucher(code, orderTotal)    // → { valid, discount }

// ─── Payments ──────────────────────────────────────────────
mockApi.getPayments(userId?)              // → Payment[]
mockApi.processPayment(data)              // → Payment

// ─── Stores ─────────────────────────────────────────────────
mockApi.getStores()                      // → Store[]
mockApi.getStoreById(id)                // → Store | null

// ─── Support ────────────────────────────────────────────────
mockApi.getSupportTickets(userId)        // → SupportTicket[]
mockApi.createSupportTicket(data)        // → SupportTicket
mockApi.addTicketMessage(ticketId, msg)   // → SupportTicket
```

---

## Tính Năng Hoàn Thành

### Customer Module ✅ (18 pages)
- [x] **Đăng ký** - Validation form, email unique check, lưu Mock User
- [x] **Đăng nhập** - Remember me, social login buttons, demo accounts
- [x] **Quên mật khẩu** - Email validation, success message
- [x] **Giỏ hàng** - Thêm, xóa, cập nhật số lượng, chọn sản phẩm, áp dụng voucher
- [x] **Checkout** - Địa chỉ giao hàng, COD, chuyển khoản, ví điện tử, tổng kết đơn
- [x] **Lịch sử đơn hàng** - Tìm kiếm, lọc trạng thái, phân trang
- [x] **Chi tiết đơn hàng** - Timeline vận chuyển, thông tin sản phẩm
- [x] **Theo dõi vận chuyển** - 6 bước timeline: Đặt → Xác nhận → Đóng gói → Vận chuyển → Đang giao → Hoàn thành
- [x] **Wishlist** - Thêm/xóa yêu thích, LocalStorage sync
- [x] **Recently Viewed** - Tự động lưu 20 sản phẩm gần nhất, LocalStorage
- [x] **So sánh sản phẩm** - Max 4 sản phẩm, so sánh CPU/GPU/RAM/SSD/Màn hình
- [x] **Tài khoản** - Profile, địa chỉ, bảo mật, tabs navigation
- [x] **Thông báo** - Read/Unread, filter theo loại (đơn hàng, khuyến mãi, hệ thống)
- [x] **Khuyến mãi** - Voucher, Flash Sale, Campaign với countdown
- [x] **Tìm kiếm** - Debounce, history, suggestions, realtime
- [x] **Liên hệ** (`/contact`) - [MỚI] Form liên hệ với validation, thông tin 3 chi nhánh, mạng xã hội, FAQ
- [x] **Cài đặt** (`/account/settings`) - [MỚI] Tab Hồ sơ (avatar, name, phone, email, gender, DOB, bio), Tab Đổi mật khẩu (validation, strength checker), Tab Địa chỉ (Tỉnh/Thành, checkbox default)
- [x] **Hỗ trợ khách hàng** (`/account/support`) - [MỚI] Tạo ticket hỗ trợ, phân loại vấn đề (đơn hàng/thanh toán/sản phẩm/tài khoản/kỹ thuật), ưu tiên, xem chi tiết và phản hồi ticket, filter theo trạng thái

### Product Module ✅
- [x] **100+ sản phẩm thực** - Tên thật, ảnh thật từ Internet
- [x] **Filter** - Danh mục, thương hiệu, khoảng giá, đánh giá, tồn kho
- [x] **Sort** - Mới nhất, bán chạy, giá tăng/giảm, đánh giá cao
- [x] **Pagination** - Phân trang với page size 20
- [x] **Gallery** - 5 ảnh sản phẩm với zoom và thumbnail navigation
- [x] **Thông số kỹ thuật** - CPU, GPU, RAM, SSD, màn hình, pin, trọng lượng
- [x] **Reviews** - Hiển thị đánh giá 1-5 sao, số lượng đánh giá
- [x] **Sản phẩm liên quan** - 8 sản phẩm cùng danh mục
- [x] **Grid/List view** - Toggle giữa grid và list
- [x] **Product Card** - Hover lift, badge (sale/new/hot), wishlist button, quick add

### Shop Portal ✅ (14 pages, 28 files)
- [x] **Dashboard** (`/seller`) - 8 stat cards (doanh thu, đơn hàng, sản phẩm, khách hàng), biểu đồ doanh thu 14 ngày, biểu đồ 12 tháng, bảng đơn hàng gần đây, top 5 sản phẩm bán chạy, quick stats bar
- [x] **Quản lý sản phẩm** (`/seller/products`) - Bảng sản phẩm đầy đủ, search, filter theo trạng thái tồn kho (đang bán/hết hàng/sắp hết), badges Hot/New/Featured, phân trang, nút sửa/xóa
- [x] **Thêm sản phẩm** (`/seller/products/create`) - Form 4 tabs (thông tin cơ bản, giá & tồn kho, hình ảnh, thông số kỹ thuật), validation, live preview panel, nút Lưu nháp / Đăng bán
- [x] **Quản lý đơn hàng** (`/seller/orders`) - 9 tab trạng thái, search, bảng đơn chi tiết với thông tin khách/sản phẩm/tổng tiền, slide-in panel chi tiết đơn + timeline trạng thái, nút cập nhật trạng thái
- [x] **Quản lý kho** (`/seller/inventory`) - Stock alerts (low/out-of-stock), inline editing số lượng tồn, filter theo trạng thái kho, bảng chi tiết SKU/sản phẩm/tồn kho/đã bán
- [x] **Quản lý đánh giá** (`/seller/reviews`) - Rating summary (avg + phân bố sao), filter theo số sao, search, danh sách đánh giá với hình ảnh, nút ẩn/hiện và phản hồi, phân trang
- [x] **Quản lý khuyến mãi** (`/seller/promotions`) - Promo cards grid với usage progress bar, filter theo loại (voucher/flash sale/combo) và trạng thái, stats row (tổng active/uses/redeemed), modal tạo voucher
- [x] **Báo cáo** (`/seller/reports`) - 4 stat cards, tabbed bar charts (doanh thu/đơn hàng/khách hàng), top 10 sản phẩm bán chạy, bảng dữ liệu tháng chi tiết với chỉ báo tăng trưởng
- [x] **Tài chính** (`/seller/finance`) - Tabs period (today/week/month/year), 6 stat cards (doanh thu, phí platform 2.3%, refund, lợi nhuận, số đơn, giá trị TB), bar chart, bảng chi tiết theo tháng
- [x] **Thanh toán** (`/seller/payments`) - Bảng giao dịch với mã GD/đơn hàng/số tiền/phí platform/thực nhận, filter trạng thái (success/pending/refunded/failed)
- [x] **Quản lý vận chuyển** (`/seller/shipping`) - 8 tab trạng thái, tracking number, thông tin đơn vị vận chuyển (GHTK/GHN/Viettel/Ninja Van...), bảng chi tiết giao hàng
- [x] **Hỗ trợ** (`/seller/support`) - Ticket cards với priority badges, filter theo trạng thái, detail panel với message history (customer/seller), reply form, cập nhật trạng thái ticket
- [x] **Hồ sơ cửa hàng** (`/seller/profile`) - Banner + avatar với hover overlay upload, form thông tin cửa hàng (tên/email/phone/địa chỉ/mô tả/mã số thuế/tài khoản ngân hàng), đổi mật khẩu
- [x] **Thông báo** (`/seller/notifications`) - Nhóm theo loại (đơn hàng/sản phẩm/thanh toán/hệ thống/đánh giá/khuyến mãi), unread indicators, đánh dấu đã đọc / xóa

### Admin Dashboard ✅
- [x] **Dashboard** - Tổng quan KPI, revenue chart, activity log, top products
- [x] **Quản lý cửa hàng** - Create, edit, delete, khóa/kích hoạt
- [x] **Quản lý sản phẩm** - Kiểm duyệt, duyệt/từ chối, xóa
- [x] **Quản lý đơn hàng** - Tất cả đơn hàng hệ thống
- [x] **Quản lý khách hàng** - Khóa, mở khóa, xóa tài khoản
- [x] **Quản lý thanh toán** - Giao dịch, hoàn tiền
- [x] **Quản lý đánh giá** - Kiểm duyệt, ẩn, xóa
- [x] **Quản lý khuyến mãi** - Tạo, sửa, xóa, kích hoạt
- [x] **Quản lý hỗ trợ** - Ticket system toàn hệ thống
- [x] **Báo cáo** - Xuất Excel/PDF, bộ lọc ngày/tuần/tháng/năm
- [x] **Tài chính** - Revenue, expense, profit, commission
- [x] **Thông báo** - Gửi hàng loạt, theo đối tượng
- [x] **Phân quyền** (`/admin/access`) - Ma trận quyền theo vai trò, cấp quyền (Admin/Moderator/Staff/Shop), đổi vai trò inline, khóa/mở khóa, filter theo role, modal tạo thành viên với tuỳ chỉnh quyền hạn

### Global Features ✅
- [x] **Header System** - Sticky, glassmorphism, mobile drawer, mega menu
- [x] **Search Bar** - Debounce 300ms, history (LocalStorage), suggestions
- [x] **Mini Cart** - Quick view, số lượng badge
- [x] **Notification Center** - Badge count, read/unread, dropdown panel
- [x] **User Menu** - Avatar, role badge, dropdown với profile/logout
- [x] **Dark Mode** - Toggle button, LocalStorage persistence
- [x] **Breadcrumb** - Auto theo route, dynamic params
- [x] **BackToTop** - Xuất hiện khi scroll > 300px, smooth scroll
- [x] **Footer** - 6 columns, social links, newsletter form
- [x] **RouteLoader** - Suspense fallback khi lazy load pages
- [x] **Error Pages** - 403, 404, 500 với illustration và action buttons

---

## Bug Fixes

### 03/06/2026 - Thêm trang Cài đặt (`/account/settings`)

**Vấn đề:** Link "Cài đặt" trong UserMenu và sidebar của CustomerLayout trỏ sang `/account/settings` nhưng không có route tương ứng, gây 404.

**Sửa lỗi:**
- Tạo `src/pages/customer/CustomerSettings/` với `CustomerSettingsPage.tsx` + `CustomerSettingsPage.css`
- `src/router/index.tsx` — thêm route `/account/settings` → `CustomerSettingsPage`

### 03/06/2026 - Loại bỏ Super Admin, Admin có toàn quyền

**Thay đổi:** Gộp Super Admin vào Admin — một tài khoản Admin có toàn quyền quản lý hệ thống mà không cần Super Admin riêng.

**Thực hiện:**
- Xóa `src/components/layouts/SuperAdminLayout/` (layout + CSS)
- Xóa toàn bộ `src/pages/super-admin/` (8 pages)
- `src/types/auth.ts` + `src/types/index.ts` — xóa `SUPER_ADMIN` khỏi `UserRole`
- `src/router/index.tsx` — xóa `SUPER_ADMIN_ROLE`, xóa `SuperAdminLayout` import, xóa `/super-admin` routes
- `src/constants/routes.ts` — xóa 8 route `SUPER_ADMIN_*`, xóa page titles
- `src/services/authService.ts` — xóa mock user `SUPER_ADMIN`
- `src/pages/auth/LoginPage.tsx` — xóa redirect `/super-admin`, xóa nút demo Super Admin
- `src/components/layouts/index.ts` — xóa export `SuperAdminLayout`
- `src/components/layouts/AdminLayout.tsx` — cập nhật role label cho user dropdown

### 03/06/2026 - Fix route `/shop` 404

**Vấn đề:** Link "Trang cửa hàng" trong UserMenu (dropdown người dùng ở header) trỏ nhầm sang `/shop` — route không tồn tại, gây lỗi 404. Route Seller Center thực sự là `/seller`.

**Root cause:** `UserMenu.tsx` dùng `to="/shop"` nhưng router định nghĩa shop routes tại `/seller/*`.

**Sửa lỗi:**
- `src/components/header/UserMenu/UserMenu.tsx` — đổi `to="/shop"` → `to="/seller"`
- `src/components/layouts/ShopLayout/SellerSidebar.tsx` — đổi `end={item.href === '/shop'}` → `end={item.href === '/seller'}` (dead code leftover)

### 03/06/2026 - Nâng cấp phân quyền Admin (AD-ADM11)

**Nâng cấp:** Trang "Quản lý phân quyền" của Admin cần có chức năng cấp quyền (phân role) cho người khác để trở thành Shop hoặc Admin.

**Thay đổi:**
- Thêm vai trò `SHOP` vào ma trận quyền (Admin có thể cấp quyền SHOP cho người dùng)
- Thêm modal "Thêm thành viên" với form chọn vai trò (Admin/Moderator/Staff/Shop) + tuỳ chỉnh quyền hạn
- Thêm tính năng đổi vai trò inline trong danh sách (nhấn badge vai trò → dropdown chọn role mới → auto update quyền)
- Thêm filter theo vai trò trong danh sách nhân viên
- Thêm nút khóa/mở khóa tài khoản

### 03/06/2026 - Thêm trang Liên hệ (`/contact`)

**Vấn đề:** Link "Liên Hệ" trong Header và Footer trỏ sang `/contact` nhưng không có route tương ứng, gây 404.

**Sửa lỗi:**
- Tạo `src/pages/customer/Contact/` với `ContactPage.tsx` + `ContactPage.css`
- `src/router/index.tsx` — thêm route `ROUTES.CONTACT` → `ContactPage`

### 03/06/2026 - Thêm trang Hỗ trợ khách hàng (CTM-SPT01)

**Vấn đề:** Đề bài yêu cầu trang "Hỗ trợ" cho khách hàng (`CTM-SPT01`) — tạo ticket hỗ trợ, filter theo trạng thái/loại, xem chi tiết và phản hồi ticket. `CustomerLayout` sidebar có link `/account/support` nhưng không có page tương ứng, route `/support` trỏ nhầm sang `NotificationPage`.

**Sửa lỗi:**
- Tạo `src/pages/customer/CustomerSupport/` với `CustomerSupportPage.tsx` + `CustomerSupportPage.css`
- `src/constants/routes.ts` — đổi `SUPPORT: '/support'` → `SUPPORT: '/account/support'`
- `src/router/index.tsx` — wire `CustomerSupportPage` vào `ROUTES.SUPPORT`

---

## Roadmap

### Giai đoạn 1: Foundation ✅ HOÀN THÀNH

```
✅ Project setup (Vite + React 19 + TypeScript Strict)
✅ Routing System với React Router DOM v7
✅ Authentication System (AuthContext, Login, Register, ForgotPassword)
✅ Authorization System (Role-based PermissionRoute, ProtectedRoute)
✅ Design System CSS Variables hoàn chỉnh
✅ Global Components (Header, Footer, 5 Layouts, Product Components)
✅ Mock API + 100+ sản phẩm thực
✅ Customer Module hoàn chỉnh (18 pages - bao gồm CustomerSupportPage)
✅ Product Module hoàn chỉnh
✅ Shop Portal hoàn chỉnh (14 pages, 28 files)
✅ Admin Dashboard hoàn chỉnh (13 pages) — Admin có toàn quyền quản lý hệ thống (không còn Super Admin riêng)
✅ Responsive Desktop / Tablet / Mobile
✅ Dark Mode
✅ LocalStorage persistence
✅ SellerContext - Full state management cho seller (10+ actions)
✅ SellerContext - SellerContext fully wired in App.tsx
```

### Giai đoạn 2: Enhancement (Sắp tới)

```
📋 Blog Module - Tin tức công nghệ, bài viết, bình luận
📋 Live Chat Widget - Chat với khách hàng real-time
📋 Push Notifications - Browser Notification API
📋 PWA Support - Service Worker, Offline mode, Install prompt
📋 Advanced Search - Elasticsearch-like mock, autocomplete
📋 Advanced Analytics - Charts, dashboards cho Admin/Shop
📋 Email Templates - Template cho order confirmation, reset password
📋 Image Compression - Tối ưu ảnh upload
```

### Giai đoạn 3: Integration (Tương lai)

```
🔗 REST API Backend - Thay Mock API bằng Express/FastAPI
🔗 WebSocket - Notifications real-time
🔗 Stripe/PayPal - Thanh toán thực
🔗 Cloudinary/S3 - Upload ảnh sản phẩm
🔗 SendGrid - Email service (OTP, confirmation)
🔗 SMS OTP - Xác thực số điện thoại
🔗 Zalo Pay / MoMo - Thanh toán Việt Nam
🔗 VNPay - Thanh toán qua thẻ ATM/Visa
```

### Giai đoạn 4: Scale (Dài hạn)

```
🚀 SSR/SSG - React Server Components, Next.js migration
🚀 Micro-frontend - Module Federation cho scalability
🚀 Multi-vendor - Nhiều seller trên cùng platform
🚀 React Native - Mobile app cho iOS/Android
🚀 AI Recommendations - Gợi ý sản phẩm cá nhân hóa
🚀 Advanced Caching - Redis, CDN integration
🚀 Microservices - Tách biệt services (auth, order, payment, product)
🚀 Kubernetes - Container orchestration cho production
```

---

## Scripts

```bash
npm run dev       # Development server
npm run build     # Production build (tsc -b && vite build)
npm run preview   # Preview production build
npm run lint      # ESLint check
npx tsc --noEmit  # TypeScript check only
```

---

## License

Private Project - Đồ Án Công Nghệ Thông Tin
