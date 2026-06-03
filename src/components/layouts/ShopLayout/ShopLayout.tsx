import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../../sidebar/Sidebar';
import type { SidebarItem } from '../../sidebar/Sidebar';
import { BackToTop } from '../../common/BackToTop/BackToTop';
import { useAuth } from '../../../contexts/AuthContext';
import './AdminLayout.css';

const shopMenuItems: SidebarItem[] = [
  { id: 'dash', label: 'Tổng quan', icon: 'dashboard', href: '/shop' },
  { id: 'products', label: 'Sản phẩm', icon: 'products', href: '/shop/products', children: [
    { id: 'post', label: 'Đăng sản phẩm', href: '/shop/products/post' },
    { id: 'list', label: 'Danh sách', href: '/shop/products' },
    { id: 'inventory', label: 'Kho hàng', href: '/shop/inventory' },
  ]},
  { id: 'orders', label: 'Đơn hàng', icon: 'orders', href: '/shop/orders' },
  { id: 'payments', label: 'Thanh toán', icon: 'payments', href: '/shop/payments' },
  { id: 'reviews', label: 'Đánh giá', icon: 'reviews', href: '/shop/reviews' },
  { id: 'promotions', label: 'Khuyến mãi', icon: 'promotions', href: '/shop/promotions' },
  { id: 'shipping', label: 'Vận chuyển', icon: 'shipping', href: '/shop/shipping' },
  { id: 'reports', label: 'Báo cáo', icon: 'reports', href: '/shop/reports' },
  { id: 'support', label: 'Hỗ trợ', icon: 'support', href: '/shop/support' },
  { id: 'finance', label: 'Tài chính', icon: 'finance', href: '/shop/finance' },
];

export const ShopLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-layout__sidebar ${collapsed ? 'admin-layout__sidebar--collapsed' : ''} ${mobileOpen ? 'admin-layout__sidebar--mobile-open' : ''}`}>
        <div className="admin-layout__sidebar-header">
          <Link to="/shop" className="admin-layout__logo">
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="10" fill="url(#logoGradShop)"/>
              <path d="M10 26L18 10L26 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 20H23" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <defs>
                <linearGradient id="logoGradShop" x1="0" y1="0" x2="36" y2="36">
                  <stop offset="0%" stopColor="#4F46E5"/>
                  <stop offset="100%" stopColor="#6366F1"/>
                </linearGradient>
              </defs>
            </svg>
            {!collapsed && <span className="admin-layout__logo-text">Shop Panel</span>}
          </Link>
          <button className="admin-layout__collapse-btn hide-mobile" onClick={() => setCollapsed(!collapsed)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {collapsed ? (
                <polyline points="9 18 15 12 9 6"/>
              ) : (
                <polyline points="15 18 9 12 15 6"/>
              )}
            </svg>
          </button>
        </div>
        <Sidebar items={shopMenuItems} title={collapsed ? '' : 'Cửa Hàng'} />
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="admin-layout__mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main Content */}
      <div className={`admin-layout__main ${collapsed ? 'admin-layout__main--collapsed' : ''}`}>
        {/* Topbar */}
        <header className="admin-layout__topbar">
          <button className="admin-layout__mobile-toggle hide-desktop" onClick={() => setMobileOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div className="admin-layout__topbar-spacer hide-mobile" />
          <div className="admin-layout__topbar-actions">
            {user && (
              <div className="admin-layout__user">
                <img src={user.avatar} alt={user.name} className="admin-layout__user-avatar" />
                <span className="admin-layout__user-name">{user.name}</span>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div className="admin-layout__content">
          <Outlet />
        </div>
      </div>
      <BackToTop />
    </div>
  );
};
