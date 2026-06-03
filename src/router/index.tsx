import { Suspense, lazy, type ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PermissionRoute } from '../guards';
import { ROUTES } from '../constants/routes';
import { RouteLoader } from '../components/common/RouteLoader/RouteLoader';
import { MainLayout, ShopLayout, AdminLayout, CustomerLayout, AuthLayout } from '../components/layouts';
import type { UserRole } from '../types';

// ─── Lazy Page Loading ────────────────────────────────────────────────────────
const load = <T extends object>(fn: () => Promise<T>, key: keyof T) =>
  lazy(async () => {
    const mod = await fn();
    return { default: mod[key] as unknown as React.ComponentType };
  });

// Public pages
const HomePage = load(() => import('../pages/customer/Home/HomePage'), 'HomePage');
const ProductListPage = load(() => import('../pages/customer/ProductList/ProductListPage'), 'ProductListPage');
const ProductDetailPage = load(() => import('../pages/customer/ProductDetail/ProductDetailPage'), 'ProductDetailPage');
const CategoryPage = load(() => import('../pages/customer/Category/CategoryPage'), 'CategoryPage');
const BrandPage = load(() => import('../pages/customer/Brand/BrandPage'), 'BrandPage');
const ComparePage = load(() => import('../pages/customer/Compare/ComparePage'), 'ComparePage');

// Auth pages
const LoginPage = load(() => import('../pages/auth/LoginPage/LoginPage'), 'LoginPage');
const RegisterPage = load(() => import('../pages/auth/RegisterPage/RegisterPage'), 'RegisterPage');
const ForgotPasswordPage = load(() => import('../pages/auth/ForgotPasswordPage/ForgotPasswordPage'), 'ForgotPasswordPage');

// Customer pages
const CartPage = load(() => import('../pages/customer/Cart/CartPage'), 'CartPage');
const CheckoutPage = load(() => import('../pages/customer/Checkout/CheckoutPage'), 'CheckoutPage');
const WishlistPage = load(() => import('../pages/customer/Wishlist/WishlistPage'), 'WishlistPage');
const AccountPage = load(() => import('../pages/customer/Account/AccountPage'), 'AccountPage');
const OrderHistoryPage = load(() => import('../pages/customer/Orders/OrderHistoryPage'), 'OrderHistoryPage');
const OrderDetailPage = load(() => import('../pages/customer/Orders/OrderDetailPage'), 'OrderDetailPage');
const NotificationPage = load(() => import('../pages/customer/Notifications/NotificationPage'), 'NotificationPage');
const PromotionPage = load(() => import('../pages/customer/Promotion/PromotionPage'), 'PromotionPage');
const SearchPage = load(() => import('../pages/customer/Search/SearchPage'), 'SearchPage');
const RecentlyViewedPage = load(() => import('../pages/customer/RecentlyViewed/RecentlyViewedPage'), 'RecentlyViewedPage');

// Shop pages
const ShopDashboardPage = load(() => import('../pages/shop/ShopDashboard/ShopDashboardPage'), 'ShopDashboardPage');
const ShopProductListPage = load(() => import('../pages/shop/ShopProductList/ShopProductListPage'), 'ShopProductListPage');
const CreateProductPage = load(() => import('../pages/shop/CreateProduct/CreateProductPage'), 'CreateProductPage');
const ShopOrderListPage = load(() => import('../pages/shop/ShopOrderList/ShopOrderListPage'), 'ShopOrderListPage');
const ShopInventoryPage = load(() => import('../pages/shop/ShopInventory/ShopInventoryPage'), 'ShopInventoryPage');
const ShopReviewsPage = load(() => import('../pages/shop/ShopReviews/ShopReviewsPage'), 'ShopReviewsPage');
const ShopPromotionsPage = load(() => import('../pages/shop/ShopPromotions/ShopPromotionsPage'), 'ShopPromotionsPage');
const ShopReportsPage = load(() => import('../pages/shop/ShopReports/ShopReportsPage'), 'ShopReportsPage');
const ShopFinancePage = load(() => import('../pages/shop/ShopFinance/ShopFinancePage'), 'ShopFinancePage');
const ShopPaymentPage = load(() => import('../pages/shop/ShopPayment/ShopPaymentPage'), 'ShopPaymentPage');
const ShopSupportPage = load(() => import('../pages/shop/ShopSupport/ShopSupportPage'), 'ShopSupportPage');
const ShopProfilePage = load(() => import('../pages/shop/ShopProfile/ShopProfilePage'), 'ShopProfilePage');
const ShopShippingPage = load(() => import('../pages/shop/ShopShipping/ShopShippingPage'), 'ShopShippingPage');

// Admin pages
const AdminDashboardPage = load(() => import('../pages/admin/AdminDashboard/DashboardPage'), 'AdminDashboardPage');
const AdminProductPage = load(() => import('../pages/admin/AdminProduct/AdminProductPage'), 'AdminProductPage');
const AdminOrderPage = load(() => import('../pages/admin/AdminOrder/AdminOrderPage'), 'AdminOrderPage');
const AdminCustomerPage = load(() => import('../pages/admin/AdminCustomer/AdminCustomerPage'), 'AdminCustomerPage');
const AdminStorePage = load(() => import('../pages/admin/AdminStore/AdminStorePage'), 'AdminStorePage');
const AdminPaymentPage = load(() => import('../pages/admin/AdminPayment/AdminPaymentPage'), 'AdminPaymentPage');
const AdminReportsPage = load(() => import('../pages/admin/AdminReports/AdminReportsPage'), 'AdminReportsPage');
const AdminNotificationPage = load(() => import('../pages/admin/AdminNotification/AdminNotificationPage'), 'AdminNotificationPage');
const AdminSupportPage = load(() => import('../pages/admin/AdminSupport/AdminSupportPage'), 'AdminSupportPage');
const AdminReviewPage = load(() => import('../pages/admin/AdminReview/AdminReviewPage'), 'AdminReviewPage');
const AdminPromotionPage = load(() => import('../pages/admin/AdminPromotion/AdminPromotionPage'), 'AdminPromotionPage');
const AdminAccessPage = load(() => import('../pages/admin/AdminAccess/AdminAccessPage'), 'AdminAccessPage');
const AdminFinancePage = load(() => import('../pages/admin/AdminFinance/AdminFinancePage'), 'AdminFinancePage');

// Error pages
const NotFoundPage = load(() => import('../pages/errors/ErrorPages'), 'NotFoundPage');
const ForbiddenPage = load(() => import('../pages/errors/ErrorPages'), 'ForbiddenPage');
const ServerErrorPage = load(() => import('../pages/errors/ErrorPages'), 'ServerErrorPage');

// ─── Page Wrapper ─────────────────────────────────────────────────────────────
const Page = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<RouteLoader />}>{children}</Suspense>
);

type AppRole = UserRole;

// Role helpers
const ADMIN_ROLE: AppRole[] = ['ADMIN' as AppRole];
const SHOP_ADMIN_ROLE: AppRole[] = ['SHOP' as AppRole, 'ADMIN' as AppRole];

export const router = createBrowserRouter([
  // ─── Auth Routes ────────────────────────────────────────────────────────────
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.LOGIN, element: <Page><LoginPage /></Page> },
      { path: ROUTES.REGISTER, element: <Page><RegisterPage /></Page> },
      { path: ROUTES.FORGOT_PASSWORD, element: <Page><ForgotPasswordPage /></Page> },
    ],
  },

  // ─── Public Routes ──────────────────────────────────────────────────────────
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Page><HomePage /></Page> },
      { path: ROUTES.PRODUCTS, element: <Page><ProductListPage /></Page> },
      { path: ROUTES.PRODUCT_DETAIL, element: <Page><ProductDetailPage /></Page> },
      { path: ROUTES.CATEGORY_DETAIL, element: <Page><CategoryPage /></Page> },
      { path: ROUTES.BRAND_DETAIL, element: <Page><BrandPage /></Page> },
      { path: ROUTES.SEARCH, element: <Page><SearchPage /></Page> },
      { path: ROUTES.COMPARE, element: <Page><ComparePage /></Page> },
      { path: ROUTES.PROMOTIONS, element: <Page><PromotionPage /></Page> },
      { path: ROUTES.WISHLIST, element: <Page><WishlistPage /></Page> },
      { path: ROUTES.CART, element: <Page><CartPage /></Page> },
      { path: ROUTES.RECENTLY_VIEWED, element: <Page><RecentlyViewedPage /></Page> },
      { path: ROUTES.ORDER_DETAIL, element: <Page><OrderDetailPage /></Page> },
    ],
  },

  // ─── Customer Routes ────────────────────────────────────────────────────────
  {
    element: <CustomerLayout />,
    children: [
      { path: ROUTES.ACCOUNT, element: <Page><AccountPage /></Page> },
      { path: ROUTES.ORDERS, element: <Page><OrderHistoryPage /></Page> },
      { path: ROUTES.CHECKOUT, element: <Page><CheckoutPage /></Page> },
      { path: ROUTES.NOTIFICATIONS, element: <Page><NotificationPage /></Page> },
      { path: ROUTES.SUPPORT, element: <Page><NotificationPage /></Page> },
    ],
  },

  // ─── Shop Routes ────────────────────────────────────────────────────────────
  {
    path: '/shop',
    element: <ShopLayout />,
    children: [
      { index: true, element: <PermissionRoute allowedRoles={SHOP_ADMIN_ROLE}><Page><ShopDashboardPage /></Page></PermissionRoute> },
      { path: 'products', element: <PermissionRoute allowedRoles={SHOP_ADMIN_ROLE}><Page><ShopProductListPage /></Page></PermissionRoute> },
      { path: 'products/create', element: <PermissionRoute allowedRoles={SHOP_ADMIN_ROLE}><Page><CreateProductPage /></Page></PermissionRoute> },
      { path: 'products/edit/:id', element: <PermissionRoute allowedRoles={SHOP_ADMIN_ROLE}><Page><CreateProductPage /></Page></PermissionRoute> },
      { path: 'orders', element: <PermissionRoute allowedRoles={SHOP_ADMIN_ROLE}><Page><ShopOrderListPage /></Page></PermissionRoute> },
      { path: 'inventory', element: <PermissionRoute allowedRoles={SHOP_ADMIN_ROLE}><Page><ShopInventoryPage /></Page></PermissionRoute> },
      { path: 'reviews', element: <PermissionRoute allowedRoles={SHOP_ADMIN_ROLE}><Page><ShopReviewsPage /></Page></PermissionRoute> },
      { path: 'promotions', element: <PermissionRoute allowedRoles={SHOP_ADMIN_ROLE}><Page><ShopPromotionsPage /></Page></PermissionRoute> },
      { path: 'reports', element: <PermissionRoute allowedRoles={SHOP_ADMIN_ROLE}><Page><ShopReportsPage /></Page></PermissionRoute> },
      { path: 'finance', element: <PermissionRoute allowedRoles={SHOP_ADMIN_ROLE}><Page><ShopFinancePage /></Page></PermissionRoute> },
      { path: 'payments', element: <PermissionRoute allowedRoles={SHOP_ADMIN_ROLE}><Page><ShopPaymentPage /></Page></PermissionRoute> },
      { path: 'support', element: <PermissionRoute allowedRoles={SHOP_ADMIN_ROLE}><Page><ShopSupportPage /></Page></PermissionRoute> },
      { path: 'shipping', element: <PermissionRoute allowedRoles={SHOP_ADMIN_ROLE}><Page><ShopShippingPage /></Page></PermissionRoute> },
      { path: 'profile', element: <PermissionRoute allowedRoles={SHOP_ADMIN_ROLE}><Page><ShopProfilePage /></Page></PermissionRoute> },
    ],
  },

  // ─── Admin Routes ───────────────────────────────────────────────────────────
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <PermissionRoute allowedRoles={ADMIN_ROLE}><Page><AdminDashboardPage /></Page></PermissionRoute> },
      { path: 'products', element: <PermissionRoute allowedRoles={ADMIN_ROLE}><Page><AdminProductPage /></Page></PermissionRoute> },
      { path: 'orders', element: <PermissionRoute allowedRoles={ADMIN_ROLE}><Page><AdminOrderPage /></Page></PermissionRoute> },
      { path: 'customers', element: <PermissionRoute allowedRoles={ADMIN_ROLE}><Page><AdminCustomerPage /></Page></PermissionRoute> },
      { path: 'stores', element: <PermissionRoute allowedRoles={ADMIN_ROLE}><Page><AdminStorePage /></Page></PermissionRoute> },
      { path: 'payments', element: <PermissionRoute allowedRoles={ADMIN_ROLE}><Page><AdminPaymentPage /></Page></PermissionRoute> },
      { path: 'reviews', element: <PermissionRoute allowedRoles={ADMIN_ROLE}><Page><AdminReviewPage /></Page></PermissionRoute> },
      { path: 'promotions', element: <PermissionRoute allowedRoles={ADMIN_ROLE}><Page><AdminPromotionPage /></Page></PermissionRoute> },
      { path: 'support', element: <PermissionRoute allowedRoles={ADMIN_ROLE}><Page><AdminSupportPage /></Page></PermissionRoute> },
      { path: 'reports', element: <PermissionRoute allowedRoles={ADMIN_ROLE}><Page><AdminReportsPage /></Page></PermissionRoute> },
      { path: 'notifications', element: <PermissionRoute allowedRoles={ADMIN_ROLE}><Page><AdminNotificationPage /></Page></PermissionRoute> },
      { path: 'access', element: <PermissionRoute allowedRoles={ADMIN_ROLE}><Page><AdminAccessPage /></Page></PermissionRoute> },
      { path: 'finance', element: <PermissionRoute allowedRoles={ADMIN_ROLE}><Page><AdminFinancePage /></Page></PermissionRoute> },
    ],
  },

  // ─── Error Routes ───────────────────────────────────────────────────────────
  { path: ROUTES.NOT_FOUND, element: <Page><NotFoundPage /></Page> },
  { path: ROUTES.FORBIDDEN, element: <Page><ForbiddenPage /></Page> },
  { path: ROUTES.SERVER_ERROR, element: <Page><ServerErrorPage /></Page> },

  // ─── Catch-all ─────────────────────────────────────────────────────────────
  { path: '*', element: <Navigate to={ROUTES.NOT_FOUND} replace /> },
]);
