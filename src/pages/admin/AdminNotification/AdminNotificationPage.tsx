import { Breadcrumb } from '../../../components/breadcrumb';
import './AdminNotificationPage.css';

const NOTIFS = [
  { id: '1', title: 'Cảnh báo: Shop TechPro vi phạm', message: 'Shop TechPro bị khách hàng phản ánh bán hàng giả. Đang chờ kiểm duyệt.', type: 'warning', date: '2025-06-03' },
  { id: '2', title: 'Khuyến mãi mới được duyệt', message: 'Khuyến mãi "Flash Sale Cuối Tuần" đã được duyệt và đang hoạt động.', type: 'success', date: '2025-06-02' },
  { id: '3', title: 'Yêu cầu hỗ trợ từ Shop Henzo Tech', message: 'Shop Henzo Tech yêu cầu hỗ trợ về kỹ thuật.', type: 'info', date: '2025-06-01' },
];

export const AdminNotificationPage = () => {
  return (
    <div className="admin-notification-page">
      <Breadcrumb />
      <div className="admin-notification-page__header">
        <h1 className="page-heading">Quản Lý Thông Báo</h1>
        <button className="btn btn-primary">+ Gửi thông báo mới</button>
      </div>
      <div className="notif-list">
        {NOTIFS.map(n => (
          <div key={n.id} className={`notif-card card notif-card--${n.type}`}>
            <div className="notif-card__icon">
              {n.type === 'warning' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
              {n.type === 'success' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
              {n.type === 'info' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>}
            </div>
            <div className="notif-card__content">
              <p className="notif-card__title">{n.title}</p>
              <p className="notif-card__message">{n.message}</p>
              <span className="notif-card__date">{new Date(n.date).toLocaleDateString('vi-VN')}</span>
            </div>
            <button className="btn btn-sm btn-outline">Xem</button>
          </div>
        ))}
      </div>
    </div>
  );
};
