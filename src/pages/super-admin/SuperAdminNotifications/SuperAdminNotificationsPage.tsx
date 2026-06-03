import { useState } from 'react';
import '../super-admin-pages.css';

export const SuperAdminNotificationsPage = () => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'system' | 'security' | 'admin'>('all');

  const notifications = [
    { id: 1, title: 'Cập nhật hệ thống', message: 'Hệ thống sẽ được bảo trì vào lúc 02:00 - 04:00 AM.', time: '10 phút trước', unread: true, type: 'system' },
    { id: 2, title: 'Admin mới được tạo', message: 'Tài khoản admin mới đã được tạo bởi Quản trị viên A.', time: '1 giờ trước', unread: true, type: 'admin' },
    { id: 3, title: 'Cảnh báo bảo mật', message: 'Phát hiện 3 đăng nhập không thành công từ IP lạ.', time: '2 giờ trước', unread: false, type: 'security' },
    { id: 4, title: 'Phân quyền được cập nhật', message: 'Quyền của vai trò SHOP đã được sửa đổi.', time: '3 giờ trước', unread: false, type: 'admin' },
    { id: 5, title: 'Backup hoàn tất', message: 'Backup database tự động hoàn tất lúc 09:00 AM.', time: '5 giờ trước', unread: false, type: 'system' },
  ];

  const filtered = selectedTab === 'all' ? notifications : notifications.filter(n => n.type === selectedTab);

  return (
    <div className="superadmin-page">
      <div className="page-actions">
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {(['all', 'system', 'security', 'admin'] as const).map(tab => (
            <button key={tab} className={`btn ${selectedTab === tab ? 'btn-primary' : 'btn-secondary'} btn-sm`} onClick={() => setSelectedTab(tab)}>
              {tab === 'all' ? 'Tất cả' : tab === 'system' ? 'Hệ thống' : tab === 'security' ? 'Bảo mật' : 'Admin'}
            </button>
          ))}
        </div>
        <button className="btn btn-secondary btn-sm">Đánh dấu đã đọc tất cả</button>
      </div>
      <div className="data-table-wrapper">
        {filtered.map(n => (
          <div key={n.id} style={{
            display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)',
            padding: 'var(--space-4) var(--space-5)',
            borderBottom: '1px solid var(--color-border)',
            background: n.unread ? 'rgba(79,70,229,0.02)' : 'transparent'
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'rgba(79,70,229,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {n.type === 'system' ? '⚙️' : n.type === 'security' ? '🔒' : '👤'}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 4px', fontWeight: n.unread ? 700 : 500, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)' }}>{n.title}</p>
              <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{n.message}</p>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{n.time}</span>
            </div>
            {n.unread && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', flexShrink: 0, marginTop: 6 }} />}
          </div>
        ))}
      </div>
    </div>
  );
};
