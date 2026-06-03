import { formatNumber } from '../../../utils';
import './DashboardPage.css';

const statCards = [
  { label: 'Tổng doanh thu', value: '₫2.4T', change: '+12.5%', icon: '💰', color: '#4F46E5' },
  { label: 'Đơn hàng mới', value: '1,234', change: '+8.2%', icon: '📦', color: '#06B6D4' },
  { label: 'Sản phẩm', value: '5,678', change: '+23.1%', icon: '🛍️', color: '#10B981' },
  { label: 'Khách hàng', value: '50,432', change: '+5.7%', icon: '👥', color: '#F59E0B' },
];

export const AdminDashboardPage = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Tổng Quan Hệ Thống</h1>
          <p className="dashboard__subtitle">Chào mừng bạn đến với trang quản trị Henzo Store</p>
        </div>
        <div className="dashboard__date">
          {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="dashboard__stats">
        {statCards.map((stat, i) => (
          <div key={i} className="stat-card card">
            <div className="stat-card__icon" style={{ background: `${stat.color}15`, color: stat.color }}>{stat.icon}</div>
            <div className="stat-card__info">
              <p className="stat-card__label">{stat.label}</p>
              <p className="stat-card__value">{stat.value}</p>
              <span className="stat-card__change">{stat.change} so với tháng trước</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard__grid">
        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <h3 className="dashboard__section-title">Đơn hàng gần đây</h3>
          {[
            { id: 'HDN-20250103-001', customer: 'Nguyễn Văn A', amount: '42,990,000đ', status: 'Đang xử lý', statusColor: '#F59E0B' },
            { id: 'HDN-20250103-002', customer: 'Trần Thị B', amount: '18,990,000đ', status: 'Đã xác nhận', statusColor: '#3B82F6' },
            { id: 'HDN-20250102-003', customer: 'Lê Văn C', amount: '89,990,000đ', status: 'Đang vận chuyển', statusColor: '#06B6D4' },
            { id: 'HDN-20250102-004', customer: 'Phạm Thị D', amount: '34,990,000đ', status: 'Đã giao', statusColor: '#10B981' },
          ].map((order, i) => (
            <div key={i} className="dashboard__table-row">
              <span className="dashboard__table-id">{order.id}</span>
              <span>{order.customer}</span>
              <span style={{ fontWeight: 700, color: 'var(--color-danger)' }}>{order.amount}</span>
              <span style={{ color: order.statusColor, fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>{order.status}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding: 'var(--space-6)' }}>
          <h3 className="dashboard__section-title">Sản phẩm bán chạy</h3>
          {[
            { name: 'iPhone 16 Pro Max', sold: 1234, revenue: '42.1T' },
            { name: 'MacBook Pro M4', sold: 567, revenue: '48.9T' },
            { name: 'Samsung Galaxy S25', sold: 890, revenue: '25.7T' },
            { name: 'AirPods Pro 2', sold: 2341, revenue: '14.8T' },
          ].map((p, i) => (
            <div key={i} className="dashboard__table-row">
              <span style={{ fontWeight: 600 }}>{p.name}</span>
              <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>{formatNumber(p.sold)} đã bán</span>
              <span style={{ fontWeight: 700, color: 'var(--color-danger)' }}>{p.revenue}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
