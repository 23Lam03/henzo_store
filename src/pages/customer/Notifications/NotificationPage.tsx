import { useState } from 'react';
import './NotificationPage.css';

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'order', title: 'Đơn hàng đã được xác nhận', msg: 'Đơn hàng #HDN-20250603-001 đã được xác nhận và đang được chuẩn bị.', time: '2025-06-03T10:00:00Z', read: false },
  { id: 2, type: 'promotion', title: 'Khuyến mãi 20% cho iPhone 16 Series', msg: 'Giảm ngay 20% cho tất cả iPhone 16 Series. Chỉ áp dụng đến hết ngày 15/06/2025.', time: '2025-06-01T09:00:00Z', read: false },
  { id: 3, type: 'voucher', title: 'Voucher 200K cho đơn hàng đầu tiên', msg: 'Chào mừng bạn đến với HenzoStore! Sử dụng mã HENZO200 để được giảm 200K.', time: '2025-05-28T14:00:00Z', read: true },
  { id: 4, type: 'system', title: 'Cập nhật hệ thống thành công', msg: 'HenzoStore đã cập nhật phiên bản mới. Trải nghiệm ngay!', time: '2025-05-25T08:00:00Z', read: true },
  { id: 5, type: 'order', title: 'Đơn hàng đã được giao thành công', msg: 'Đơn hàng #HDN-20250528-042 đã được giao thành công.', time: '2025-05-21T15:00:00Z', read: true },
];

const TYPE_ICONS: Record<string, string> = {
  order: '📦', promotion: '🎉', voucher: '🎟️', system: '⚙️',
};

const TYPE_LABELS: Record<string, string> = {
  order: 'Đơn hàng', promotion: 'Khuyến mãi', voucher: 'Voucher', system: 'Hệ thống',
};

export const NotificationPage = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const filtered = filter === 'all' ? notifications
    : notifications.filter(n => n.type === filter);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const filters = [
    { id: 'all', label: 'Tất cả' },
    { id: 'order', label: 'Đơn hàng' },
    { id: 'promotion', label: 'Khuyến mãi' },
    { id: 'voucher', label: 'Voucher' },
    { id: 'system', label: 'Hệ thống' },
  ];

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Hôm nay';
    if (days === 1) return 'Hôm qua';
    if (days < 7) return `${days} ngày trước`;
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="notification-page">
      <div className="container">
        <div className="notification-page__header">
          <h1 className="notification-page__title">Thông báo</h1>
          {unreadCount > 0 && (
            <button className="btn btn-secondary btn-sm" onClick={markAllRead}>
              Đánh dấu tất cả đã đọc
            </button>
          )}
        </div>

        <div className="notification-filters">
          {filters.map(f => (
            <button key={f.id} className={`filter-tab ${filter === f.id ? 'active' : ''}`} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="notification-list">
          {filtered.length === 0 ? (
            <div className="notification-empty">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <p>Không có thông báo nào.</p>
            </div>
          ) : (
            filtered.map(n => (
              <div key={n.id} className={`notif-card card ${!n.read ? 'unread' : ''}`} onClick={() => markRead(n.id)}>
                <div className="notif-card__icon">{TYPE_ICONS[n.type]}</div>
                <div className="notif-card__content">
                  <div className="notif-card__header">
                    <span className="notif-card__type">{TYPE_LABELS[n.type]}</span>
                    {!n.read && <span className="notif-card__dot" />}
                  </div>
                  <h3 className="notif-card__title">{n.title}</h3>
                  <p className="notif-card__msg">{n.msg}</p>
                  <span className="notif-card__time">{formatTime(n.time)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
