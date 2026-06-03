import { Suspense, lazy, type ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PermissionRoute } from '../guards';
import { ROUTES } from '../constants/routes';
import { RouteLoader } from '../components/common/RouteLoader/RouteLoader';
import { MainLayout, ShopLayout, AdminLayout } from '../components/layouts';

// ─── Lazy Page Loading ────────────────────────────────────────────────────────
const load = <T extends object>(fn: () => Promise<T>, key: keyof T) =>
  lazy(async () => {
    const mod = await fn();
    return { default: mod[key] as unknown as React.ComponentType };
  });

// Customer pages (existing in codebase)
const HomePage = load(() => import('../pages/customer/Home'), 'HomePage');
const ProductListPage = load(() => import('../pages/customer/ProductList'), 'ProductListPage');
const ProductDetailPage = load(() => import('../pages/customer/ProductDetail'), 'ProductDetailPage');
const CategoryPage = load(() => import('../pages/customer/Category'), 'CategoryPage');
const BrandPage = load(() => import('../pages/customer/Brand'), 'BrandPage');
const ComparePage = load(() => import('../pages/customer/Compare'), 'ComparePage');

// Shop pages (existing in codebase)
const ShopDashboardPage = load(() => import('../pages/shop/ShopDashboard'), 'ShopDashboardPage');
const ShopProductListPage = load(() => import('../pages/shop/ShopProductList'), 'ShopProductListPage');
const CreateProductPage = load(() => import('../pages/shop/CreateProduct'), 'CreateProductPage');
const ShopOrderListPage = load(() => import('../pages/shop/ShopOrderList'), 'ShopOrderListPage');
const ShopInventoryPage = load(() => import('../pages/shop/ShopInventory'), 'ShopInventoryPage');
const ShopReviewsPage = load(() => import('../pages/shop/ShopReviews'), 'ShopReviewsPage');
const ShopPromotionsPage = load(() => import('../pages/shop/ShopPromotions'), 'ShopPromotionsPage');
const ShopReportsPage = load(() => import('../pages/shop/ShopReports'), 'ShopReportsPage');
const ShopFinancePage = load(() => import('../pages/shop/ShopFinance'), 'ShopFinancePage');
const ShopPaymentPage = load(() => import('../pages/shop/ShopPayment'), 'ShopPaymentPage');
const ShopSupportPage = load(() => import('../pages/shop/ShopSupport'), 'ShopSupportPage');
const ShopProfilePage = load(() => import('../pages/shop/ShopProfile'), 'ShopProfilePage');
const ShopShippingPage = load(() => import('../pages/shop/ShopShipping'), 'ShopShippingPage');

// Admin pages (existing in codebase)
const AdminDashboardPage = load(() => import('../pages/admin/AdminDashboard'), 'AdminDashboardPage');
const AdminProductPage = load(() => import('../pages/admin/AdminProduct'), 'AdminProductPage');
const AdminOrderPage = load(() => import('../pages/admin/AdminOrder'), 'AdminOrderPage');
const AdminCustomerPage = load(() => import('../pages/admin/AdminCustomer'), 'AdminCustomerPage');
const AdminStorePage = load(() => import('../pages/admin/AdminStore'), 'AdminStorePage');
const AdminPaymentPage = load(() => import('../pages/admin/AdminPayment'), 'AdminPaymentPage');
const AdminReportsPage = load(() => import('../pages/admin/AdminReports'), 'AdminReportsPage');
const AdminNotificationPage = load(() => import('../pages/admin/AdminNotification'), 'AdminNotificationPage');
const AdminSupportPage = load(() => import('../pages/admin/AdminSupport'), 'AdminSupportPage');
const AdminReviewPage = load(() => import('../pages/admin/AdminReview'), 'AdminReviewPage');
const AdminPromotionPage = load(() => import('../pages/admin/AdminPromotion'), 'AdminPromotionPage');
const AdminAccessPage = load(() => import('../pages/admin/AdminAccess'), 'AdminAccessPage');
const AdminFinancePage = load(() => import('../pages/admin/AdminFinance'), 'AdminFinancePage');

// Error pages
const NotFoundPage = load(() => import('../pages/errors/ErrorPages'), 'NotFoundPage');
const ForbiddenPage = load(() => import('../pages/errors/ErrorPages'), 'ForbiddenPage');
const ServerErrorPage = load(() => import('../pages/errors/ErrorPages'), 'ServerErrorPage');

// ─── Route Wrapper ────────────────────────────────────────────────────────────
const Page = ({ children }: { children: ReactNode }) => (
  <Suspense fallback={<RouteLoader />}>{children}</Suspense>
);

// ─── UserRole type for permission routes ────────────────────────────────────
type AppRole = 'GUEST' | 'CUSTOMER' | 'SHOP' | 'ADMIN' | 'SUPER_ADMIN';

export const router = createBrowserRouter([
  // ─── Public Routes ──────────────────────────────────────────────────────────
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <Page><HomePage /></Page> },
      { path: ROUTES.PRODUCTS, element: <Page><ProductListPage /></Page> },
      { path: ROUTES.PRODUCT_DETAIL, element: <Page><ProductDetailPage /></Page> },
      { path: ROUTES.CATEGORY_DETAIL, element: <Page><CategoryPage /></Page> },
      { path: ROUTES.BRAND_DETAIL, element: <Page><BrandPage /></Page> },
      { path: ROUTES.COMPARE, element: <Page><ComparePage /></Page> },
    ],
  },

  // ─── Shop Routes ────────────────────────────────────────────────────────────
  {
    element: <ShopLayout />,
    children: [
      {
        index: true,
        element: (
          <PermissionRoute allowedRoles={['SHOP', 'ADMIN'] satisfies AppRole[]}>
            <Page><ShopDashboardPage /></Page>
          </PermissionRoute>
        ),
      },
      {
        path: 'products',
        element: <PermissionRoute allowedRoles={['SHOP', 'ADMIN'] satisfies AppRole[]}><Page><ShopProductListPage /></Page></PermissionRoute>,
      },
      {
        path: 'products/post',
        element: <PermissionRoute allowedRoles={['SHOP', 'ADMIN'] satisfies AppRole[]}><Page><CreateProductPage /></Page></PermissionRoute>,
      },
      {
        path: 'products/edit/:id',
        element: <PermissionRoute allowedRoles={['SHOP', 'ADMIN'] satisfies AppRole[]}><Page><CreateProductPage /></Page></PermissionRoute>,
      },
      {
        path: 'orders',
        element: <PermissionRoute allowedRoles={['SHOP', 'ADMIN'] satisfies AppRole[]}><Page><ShopOrderListPage /></Page></PermissionRoute>,
      },
      {
        path: 'inventory',
        element: <PermissionRoute allowedRoles={['SHOP', 'ADMIN'] satisfies AppRole[]}><Page><ShopInventoryPage /></Page></PermissionRoute>,
      },
      {
        path: 'reviews',
        element: <PermissionRoute allowedRoles={['SHOP', 'ADMIN'] satisfies AppRole[]}><Page><ShopReviewsPage /></Page></PermissionRoute>,
      },
      {
        path: 'promotions',
        element: <PermissionRoute allowedRoles={['SHOP', 'ADMIN'] satisfies AppRole[]}><Page><ShopPromotionsPage /></Page></PermissionRoute>,
      },
      {
        path: 'reports',
        element: <PermissionRoute allowedRoles={['SHOP', 'ADMIN'] satisfies AppRole[]}><Page><ShopReportsPage /></Page></PermissionRoute>,
      },
      {
        path: 'finance',
        element: <PermissionRoute allowedRoles={['SHOP', 'ADMIN'] satisfies AppRole[]}><Page><ShopFinancePage /></Page></PermissionRoute>,
      },
      {
        path: 'payments',
        element: <PermissionRoute allowedRoles={['SHOP', 'ADMIN'] satisfies AppRole[]}><Page><ShopPaymentPage /></Page></PermissionRoute>,
      },
      {
        path: 'support',
        element: <PermissionRoute allowedRoles={['SHOP', 'ADMIN'] satisfies AppRole[]}><Page><ShopSupportPage /></Page></PermissionRoute>,
      },
      {
        path: 'shipping',
        element: <PermissionRoute allowedRoles={['SHOP', 'ADMIN'] satisfies AppRole[]}><Page><ShopShippingPage /></Page></PermissionRoute>,
      },
      {
        path: 'profile',
        element: <PermissionRoute allowedRoles={['SHOP', 'ADMIN'] satisfies AppRole[]}><Page><ShopProfilePage /></Page></PermissionRoute>,
      },
    ],
  },

  // ─── Admin Routes ───────────────────────────────────────────────────────────
  {
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: (
          <PermissionRoute allowedRoles={['ADMIN'] satisfies AppRole[]}>
            <Page><AdminDashboardPage /></Page>
          </PermissionRoute>
        ),
      },
      {
        path: 'products',
        element: <PermissionRoute allowedRoles={['ADMIN'] satisfies AppRole[]}><Page><AdminProductPage /></Page></PermissionRoute>,
      },
      {
        path: 'orders',
        element: <PermissionRoute allowedRoles={['ADMIN'] satisfies AppRole[]}><Page><AdminOrderPage /></Page></PermissionRoute>,
      },
      {
        path: 'customers',
        element: <PermissionRoute allowedRoles={['ADMIN'] satisfies AppRole[]}><Page><AdminCustomerPage /></Page></PermissionRoute>,
      },
      {
        path: 'stores',
        element: <PermissionRoute allowedRoles={['ADMIN'] satisfies AppRole[]}><Page><AdminStorePage /></Page></PermissionRoute>,
      },
      {
        path: 'payments',
        element: <PermissionRoute allowedRoles={['ADMIN'] satisfies AppRole[]}><Page><AdminPaymentPage /></Page></PermissionRoute>,
      },
      {
        path: 'reviews',
        element: <PermissionRoute allowedRoles={['ADMIN'] satisfies AppRole[]}><Page><AdminReviewPage /></Page></PermissionRoute>,
      },
      {
        path: 'promotions',
        element: <PermissionRoute allowedRoles={['ADMIN'] satisfies AppRole[]}><Page><AdminPromotionPage /></Page></PermissionRoute>,
      },
      {
        path: 'support',
        element: <PermissionRoute allowedRoles={['ADMIN'] satisfies AppRole[]}><Page><AdminSupportPage /></Page></PermissionRoute>,
      },
      {
        path: 'reports',
        element: <PermissionRoute allowedRoles={['ADMIN'] satisfies AppRole[]}><Page><AdminReportsPage /></Page></PermissionRoute>,
      },
      {
        path: 'notifications',
        element: <PermissionRoute allowedRoles={['ADMIN'] satisfies AppRole[]}><Page><AdminNotificationPage /></Page></PermissionRoute>,
      },
      {
        path: 'access',
        element: <PermissionRoute allowedRoles={['ADMIN'] satisfies AppRole[]}><Page><AdminAccessPage /></Page></PermissionRoute>,
      },
      {
        path: 'finance',
        element: <PermissionRoute allowedRoles={['ADMIN'] satisfies AppRole[]}><Page><AdminFinancePage /></Page></PermissionRoute>,
      },
    ],
  },

  // ─── Error Routes ───────────────────────────────────────────────────────────
  { path: ROUTES.NOT_FOUND, element: <Page><NotFoundPage /></Page> },
  { path: ROUTES.FORBIDDEN, element: <Page><ForbiddenPage /></Page> },
  { path: ROUTES.SERVER_ERROR, element: <Page><ServerErrorPage /></Page> },

  // ─── Catch-all ─────────────────────────────────────────────────────────────
  { path: '*', element: <Navigate to={ROUTES.NOT_FOUND} replace /> },
]);
