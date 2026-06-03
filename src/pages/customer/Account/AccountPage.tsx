import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts';
import { ROUTES } from '../../../constants/routes';
import './AccountPage.css';

const fmt = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(p);

const MOCK_STATS = {
  totalOrders: 12,
  pendingOrders: 1,
  completedOrders: 10,
  totalSpent: 156789000,
  vouchers: 5,
  points: 1250,
};

const MOCK_ORDERS = [
  { id: 'order-1', number: 'HDN-20250603-001', date: '2025-06-03', total: 39980000, status: 'confirmed', items: 2 },
  { id: 'order-2', number: 'HDN-20250528-042', date: '2025-05-28', total: 56990000, status: 'delivered', items: 1 },
  { id: 'order-3', number: 'HDN-20250515-008', date: '2025-05-15', total: 24990000, status: 'delivered', items: 1 },
];

const STATUS_LABELS: Record<string, string> = {
  pending: 'Chờ xác nhận', confirmed: 'Đã xác nhận', processing: 'Đang xử lý',
  shipping: 'Đang giao', delivered: 'Đã giao', cancelled: 'Đã hủy',
};

const STATUS_CLASSES: Record<string, string> = {
  pending: 'badge-warning', confirmed: 'badge-primary', processing: 'badge-accent',
  shipping: 'badge-accent', delivered: 'badge-success', cancelled: 'badge-danger',
};

export const AccountPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Tổng quan' },
    { id: 'profile', label: 'Hồ sơ' },
    { id: 'orders', label: 'Đơn hàng' },
    { id: 'password', label: 'Bảo mật' },
    { id: 'notifications', label: 'Thông báo' },
  ];

  return (
    <div className="account-page">
      <div className="container">
        <h1 className="account-page__title">Tài Khoản Của Tôi</h1>

        <div className="account-layout">
          <aside className="account-sidebar">
            <div className="account-profile card">
              <div className="account-profile__avatar">
                <img src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'} alt={user?.name} />
              </div>
              <div className="account-profile__info">
                <h3>{user?.name || 'Khách hàng'}</h3>
                <p>{user?.email}</p>
                <span className="badge badge-primary">{user?.role === 'CUSTOMER' ? 'Khách hàng' : user?.role}</span>
              </div>
            </div>

            <nav className="account-nav">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`account-nav__item ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
              <button className="account-nav__item account-nav__item--logout" onClick={() => {}}>
                Đăng xuất
              </button>
            </nav>
          </aside>

          <main className="account-content">
            {activeTab === 'overview' && (
              <div className="account-overview">
                <div className="account-stats">
                  {[
                    { label: 'Tổng đơn hàng', value: MOCK_STATS.totalOrders, icon: '📦', color: 'var(--color-primary)' },
                    { label: 'Đơn đang xử lý', value: MOCK_STATS.pendingOrders, icon: '⏳', color: 'var(--color-warning)' },
                    { label: 'Đã hoàn thành', value: MOCK_STATS.completedOrders, icon: '✅', color: 'var(--color-success)' },
                    { label: 'Tổng chi tiêu', value: fmt(MOCK_STATS.totalSpent), icon: '💰', color: 'var(--color-accent)' },
                  ].map((stat, i) => (
                    <div key={i} className="stat-card card">
                      <span className="stat-card__icon" style={{ background: `${stat.color}18` }}>{stat.icon}</span>
                      <div className="stat-card__info">
                        <span className="stat-card__value">{stat.value}</span>
                        <span className="stat-card__label">{stat.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="recent-orders card">
                  <div className="card-header">
                    <h3>Đơn hàng gần đây</h3>
                    <Link to={ROUTES.ORDERS} className="btn btn-ghost btn-sm">Xem tất cả</Link>
                  </div>
                  <div className="recent-orders__list">
                    {MOCK_ORDERS.map(order => (
                      <div key={order.id} className="recent-order">
                        <div className="recent-order__info">
                          <span className="recent-order__num">{order.number}</span>
                          <span className="recent-order__date">{new Date(order.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                        <span className={`badge ${STATUS_CLASSES[order.status]}`}>{STATUS_LABELS[order.status]}</span>
                        <span className="recent-order__total">{fmt(order.total)}</span>
                        <Link to={`/orders/${order.id}`} className="btn btn-ghost btn-sm">Chi tiết</Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="account-quick-links">
                  <Link to={ROUTES.WISHLIST} className="quick-link card">
                    <span className="quick-link__icon">❤️</span>
                    <span className="quick-link__label">Danh sách yêu thích</span>
                  </Link>
                  <Link to={ROUTES.CART} className="quick-link card">
                    <span className="quick-link__icon">🛒</span>
                    <span className="quick-link__label">Giỏ hàng</span>
                  </Link>
                  <Link to={ROUTES.NOTIFICATIONS} className="quick-link card">
                    <span className="quick-link__icon">🔔</span>
                    <span className="quick-link__label">Thông báo</span>
                  </Link>
                  <Link to={ROUTES.SUPPORT} className="quick-link card">
                    <span className="quick-link__icon">💬</span>
                    <span className="quick-link__label">Hỗ trợ</span>
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="account-profile-form card">
                <h3 className="card-header__title">Thông tin cá nhân</h3>
                <form className="profile-form">
                  <div className="profile-form__avatar">
                    <img src={user?.avatar || ''} alt="avatar" />
                    <button type="button" className="btn btn-secondary btn-sm">Đổi ảnh</button>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Họ và tên</label>
                    <input type="text" className="input" defaultValue={user?.name} />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Email</label>
                    <input type="email" className="input" defaultValue={user?.email} />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Số điện thoại</label>
                    <input type="tel" className="input" defaultValue={user?.phone} />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Địa chỉ</label>
                    <input type="text" className="input" defaultValue={user?.address} />
                  </div>
                  <button type="button" className="btn btn-primary">Lưu thay đổi</button>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="account-orders">
                <h2 className="account-section-title">Lịch sử đơn hàng</h2>
                {MOCK_ORDERS.map(order => (
                  <div key={order.id} className="order-card card">
                    <div className="order-card__header">
                      <div className="order-card__info">
                        <span className="order-card__num">{order.number}</span>
                        <span className="order-card__date">Ngày đặt: {new Date(order.date).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <span className={`badge ${STATUS_CLASSES[order.status]}`}>{STATUS_LABELS[order.status]}</span>
                    </div>
                    <div className="order-card__body">
                      <p>{order.items} sản phẩm</p>
                      <span className="order-card__total">Tổng: <strong>{fmt(order.total)}</strong></span>
                    </div>
                    <div className="order-card__actions">
                      <Link to={`/orders/${order.id}`} className="btn btn-secondary btn-sm">Chi tiết</Link>
                      {order.status === 'delivered' && <button className="btn btn-outline btn-sm">Đánh giá</button>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'password' && (
              <div className="account-security card">
                <h3 className="card-header__title">Đổi mật khẩu</h3>
                <form className="password-form">
                  <div className="input-group">
                    <label className="input-label">Mật khẩu hiện tại</label>
                    <input type="password" className="input" placeholder="Nhập mật khẩu hiện tại" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Mật khẩu mới</label>
                    <input type="password" className="input" placeholder="Nhập mật khẩu mới" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Xác nhận mật khẩu mới</label>
                    <input type="password" className="input" placeholder="Nhập lại mật khẩu mới" />
                  </div>
                  <button type="button" className="btn btn-primary">Cập nhật mật khẩu</button>
                </form>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="account-notifications">
                <h2 className="account-section-title">Thông báo</h2>
                {[
                  { title: 'Đơn hàng đã được xác nhận', msg: 'Đơn hàng #HDN-20250603-001 đã được xác nhận.', time: '2 giờ trước', unread: true },
                  { title: 'Khuyến mãi 20% iPhone 16', msg: 'Giảm ngay 20% cho tất cả iPhone 16 Series.', time: '2 ngày trước', unread: true },
                  { title: 'Đơn hàng đã giao thành công', msg: 'Đơn hàng #HDN-20250528-042 đã giao thành công.', time: '6 ngày trước', unread: false },
                ].map((n, i) => (
                  <div key={i} className={`notif-item card ${n.unread ? 'unread' : ''}`}>
                    <div className="notif-item__dot" />
                    <div className="notif-item__content">
                      <h4>{n.title}</h4>
                      <p>{n.msg}</p>
                      <span className="notif-item__time">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
