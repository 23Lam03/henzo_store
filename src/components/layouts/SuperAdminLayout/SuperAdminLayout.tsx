import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Sidebar } from '../../sidebar/Sidebar';
import type { SidebarItem } from '../../sidebar/Sidebar';
import { BackToTop } from '../../common/BackToTop/BackToTop';
import { useAuth } from '../../../contexts/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';
import { usePageTitle } from '../../../hooks';
import './SuperAdminLayout.css';

const superAdminMenuItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Tổng quan', icon: 'dashboard', href: '/super-admin' },
  { id: 'admins', label: 'Quản trị viên', icon: 'users', href: '/super-admin/admins' },
  { id: 'permissions', label: 'Phân quyền', icon: 'access', href: '/super-admin/permissions' },
  { id: 'system', label: 'Hệ thống', icon: 'settings', href: '/super-admin/system' },
  { id: 'financial', label: 'Tài chính', icon: 'finance', href: '/super-admin/financial' },
  { id: 'logs', label: 'Nhật ký hệ thống', icon: 'reports', href: '/super-admin/logs' },
  { id: 'notifications', label: 'Thông báo', icon: 'notifications', href: '/super-admin/notifications' },
  { id: 'settings', label: 'Cài đặt', icon: 'settings', href: '/super-admin/settings' },
];

const SUPER_ADMIN_NOTIFICATIONS = [
  { id: '1', title: 'Cập nhật hệ thống', message: 'Hệ thống sẽ được bảo trì vào lúc 02:00 - 04:00 AM.', time: '10 phút trước', unread: true, type: 'system' },
  { id: '2', title: 'Admin mới được tạo', message: 'Tài khoản admin mới đã được tạo bởi Quản trị viên A.', time: '1 giờ trước', unread: true, type: 'admin' },
  { id: '3', title: 'Cảnh báo bảo mật', message: 'Phát hiện 3 đăng nhập không thành công từ IP lạ.', time: '2 giờ trước', unread: false, type: 'system' },
  { id: '4', title: 'Phân quyền được cập nhật', message: 'Quyền của vai trò SHOP đã được sửa đổi.', time: '3 giờ trước', unread: false, type: 'permission' },
  { id: '5', title: 'Báo cáo tài chính', message: 'Báo cáo tài chính tháng 5/2026 đã sẵn sàng.', time: '5 giờ trước', unread: false, type: 'finance' },
];

export const SuperAdminLayout = () => {
  usePageTitle();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = SUPER_ADMIN_NOTIFICATIONS.filter(n => n.unread).length;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setUserMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) navigate(`/search?q=${encodeURIComponent(searchVal)}`);
  };

  return (
    <div className="superadmin-layout">
      <aside className={`superadmin-layout__sidebar ${collapsed ? 'superadmin-layout__sidebar--collapsed' : ''} ${mobileOpen ? 'superadmin-layout__sidebar--mobile-open' : ''}`}>
        <div className="superadmin-layout__sidebar-header">
          <Link to="/super-admin" className="superadmin-layout__logo">
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="10" fill="url(#logoGradSuperAdmin)"/>
              <path d="M10 26L18 10L26 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 20H23" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <defs>
                <linearGradient id="logoGradSuperAdmin" x1="0" y1="0" x2="36" y2="36">
                  <stop offset="0%" stopColor="#DC2626"/>
                  <stop offset="100%" stopColor="#EF4444"/>
                </linearGradient>
              </defs>
            </svg>
            {!collapsed && <span className="superadmin-layout__logo-text">Super Admin</span>}
          </Link>
          <button className="superadmin-layout__collapse-btn hide-mobile" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {collapsed ? (
                <polyline points="9 18 15 12 9 6"/>
              ) : (
                <polyline points="15 18 9 12 15 6"/>
              )}
            </svg>
          </button>
        </div>
        <Sidebar items={superAdminMenuItems} title={collapsed ? '' : 'Quản Trị Cao Cấp'} />
      </aside>

      {mobileOpen && (
        <div className="superadmin-layout__mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <div className={`superadmin-layout__main ${collapsed ? 'superadmin-layout__main--collapsed' : ''}`}>
        <header className="superadmin-layout__topbar">
          <button className="superadmin-layout__mobile-toggle hide-desktop" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>

          <form className="superadmin-layout__topbar-search hide-mobile" onSubmit={handleSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm admin, logs, cấu hình..."
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
            />
          </form>

          <div className="superadmin-layout__topbar-actions">
            <button
              className="superadmin-layout__theme-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            <div className="superadmin-layout__notif-wrapper" ref={notifRef}>
              <button
                className="superadmin-layout__notif-btn"
                onClick={() => { setNotifOpen(!notifOpen); setUserMenuOpen(false); }}
                aria-label="Notifications"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                {unreadCount > 0 && <span className="superadmin-layout__notif-badge">{unreadCount}</span>}
              </button>

              {notifOpen && (
                <div className="superadmin-layout__notif-panel">
                  <div className="superadmin-layout__notif-panel-header">
                    <h3>Thông báo</h3>
                    <Link to="/super-admin/notifications" className="superadmin-layout__notif-panel-link" onClick={() => setNotifOpen(false)}>
                      Xem tất cả
                    </Link>
                  </div>
                  <div className="superadmin-layout__notif-list">
                    {SUPER_ADMIN_NOTIFICATIONS.map(n => (
                      <div key={n.id} className={`superadmin-layout__notif-item ${n.unread ? 'unread' : ''}`}>
                        <div className={`superadmin-layout__notif-icon superadmin-layout__notif-icon--${n.type}`}>
                          {n.type === 'system' && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                          )}
                          {n.type === 'admin' && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                          )}
                          {n.type === 'permission' && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                          )}
                          {n.type === 'finance' && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                          )}
                        </div>
                        <div className="superadmin-layout__notif-content">
                          <p className="superadmin-layout__notif-title">{n.title}</p>
                          <p className="superadmin-layout__notif-msg">{n.message}</p>
                          <span className="superadmin-layout__notif-time">{n.time}</span>
                        </div>
                        {n.unread && <span className="superadmin-layout__notif-dot" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="superadmin-layout__user-wrapper" ref={userMenuRef}>
              <div
                className="superadmin-layout__user"
                onClick={() => { setUserMenuOpen(!userMenuOpen); setNotifOpen(false); }}
              >
                {user && (
                  <>
                    <img src={user.avatar} alt={user.name} className="superadmin-layout__user-avatar" />
                    <span className="superadmin-layout__user-name hide-mobile">{user.name}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="hide-mobile">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </>
                )}
              </div>

              {userMenuOpen && (
                <div className="superadmin-layout__user-dropdown">
                  <div className="superadmin-layout__user-dropdown__info">
                    {user && (
                      <>
                        <img src={user.avatar} alt={user.name} className="superadmin-layout__user-dropdown__avatar" />
                        <div>
                          <p className="superadmin-layout__user-dropdown__name">{user.name}</p>
                          <p className="superadmin-layout__user-dropdown__role">Super Admin</p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="superadmin-layout__user-dropdown-divider" />
                  <Link to="/" className="superadmin-layout__user-dropdown-item" onClick={() => setUserMenuOpen(false)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                    Về trang chủ
                  </Link>
                  <div className="superadmin-layout__user-dropdown-divider" />
                  <button className="superadmin-layout__user-dropdown-item superadmin-layout__user-dropdown-item--danger" onClick={handleLogout}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="superadmin-layout__content">
          <Outlet />
        </div>
      </div>
      <BackToTop />
    </div>
  );
};
