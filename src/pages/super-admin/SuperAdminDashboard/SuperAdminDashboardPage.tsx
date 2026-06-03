import '../super-admin-pages.css';

export const SuperAdminDashboardPage = () => {
  return (
    <div className="superadmin-dashboard">
      <div className="page-header">
        <h1 className="page-title">Dashboard Super Admin</h1>
        <p className="page-subtitle">Tổng quan hệ thống toàn nền tảng</p>
      </div>

      <div className="stats-grid">
        {[
          { label: 'Tổng Admin', value: '12', icon: '👤', color: '#4F46E5' },
          { label: 'Tổng Shop', value: '1,247', icon: '🏪', color: '#06B6D4' },
          { label: 'Tổng Khách hàng', value: '89,432', icon: '👥', color: '#10B981' },
          { label: 'Tổng Đơn hàng', value: '234,891', icon: '📦', color: '#F59E0B' },
        ].map((stat) => (
          <div key={stat.label} className="stat-card" style={{ '--accent': stat.color } as React.CSSProperties}>
            <div className="stat-card__icon">{stat.icon}</div>
            <div className="stat-card__info">
              <p className="stat-card__value">{stat.value}</p>
              <p className="stat-card__label">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h3 className="card__title">Hoạt động hệ thống gần đây</h3>
          <div className="activity-list">
            {[
              { time: '2 phút trước', action: 'Admin Nguyễn Văn A đăng nhập', type: 'login' },
              { time: '15 phút trước', action: 'Tạo admin mới: Trần Thị B', type: 'create' },
              { time: '1 giờ trước', action: 'Cập nhật quyền SHOP', type: 'update' },
              { time: '2 giờ trước', action: 'Backup database thành công', type: 'system' },
              { time: '3 giờ trước', action: 'Khóa tài khoản shop vi phạm', type: 'warning' },
            ].map((item, i) => (
              <div key={i} className="activity-item">
                <span className="activity-item__time">{item.time}</span>
                <span className="activity-item__action">{item.action}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="card__title">Cảnh báo hệ thống</h3>
          <div className="alert-list">
            {[
              { severity: 'warning', text: 'Lưu lượng truy cập cao - Server load 78%' },
              { severity: 'info', text: 'Backup tự động sắp chạy (2 giờ nữa)' },
              { severity: 'success', text: 'SSL certificate hết hạn sau 30 ngày' },
            ].map((alert, i) => (
              <div key={i} className={`alert-item alert-item--${alert.severity}`}>
                <span className="alert-item__dot" />
                <span>{alert.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
