import { Breadcrumb } from '../../../components/breadcrumb';
import './AdminReportsPage.css';

export const AdminReportsPage = () => {
  const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];
  const revenue = [1245, 1456, 1678, 1345, 1890, 2340];
  const maxRev = Math.max(...revenue);

  return (
    <div className="admin-reports-page">
      <Breadcrumb />
      <h1 className="page-heading">Báo Cáo Hệ Thống</h1>
      <div className="report-cards">
        {[
          { label: 'Tổng doanh thu', value: '9,954,000,000đ', change: '+15.2%', icon: '💰', color: '#4F46E5' },
          { label: 'Tổng đơn hàng', value: '8,234', change: '+12.8%', icon: '📦', color: '#06B6D4' },
          { label: 'Tổng khách hàng', value: '50,432', change: '+8.5%', icon: '👥', color: '#10B981' },
          { label: 'Tổng cửa hàng', value: '234', change: '+5.3%', icon: '🏪', color: '#F59E0B' },
        ].map((s, i) => (
          <div key={i} className="stat-card card">
            <div className="stat-card__icon" style={{ background: `${s.color}15`, color: s.color }}>{s.icon}</div>
            <div className="stat-card__info">
              <p className="stat-card__label">{s.label}</p>
              <p className="stat-card__value">{s.value}</p>
              <span className="stat-card__change">{s.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card mb-4">
        <div className="card__header"><h3>Doanh thu 6 tháng (triệu đồng)</h3></div>
        <div className="report-chart">
          {months.map((month, i) => (
            <div key={i} className="report-chart__bar-group">
              <div className="report-chart__bar-wrapper">
                <div className="report-chart__bar" style={{ height: `${(revenue[i] / maxRev) * 100}%` }}>
                  <span className="report-chart__bar-value">{revenue[i]}M</span>
                </div>
              </div>
              <span className="report-chart__label">{month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="report-grid">
        <div className="card">
          <div className="card__header"><h3>Top sản phẩm bán chạy</h3></div>
          {[
            { name: 'iPhone 16 Pro Max', sold: 1234, revenue: '43.1T', img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=60' },
            { name: 'MacBook Pro M4', sold: 567, revenue: '31.2T', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=60' },
            { name: 'Samsung Galaxy S25', sold: 890, revenue: '29.4T', img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=60' },
          ].map((p, i) => (
            <div key={i} className="report-row">
              <span className="report-row__rank">{i + 1}</span>
              <img src={p.img} alt={p.name} className="report-row__img" loading="lazy" />
              <span className="report-row__name">{p.name}</span>
              <span className="report-row__sold">{p.sold} đã bán</span>
              <span className="report-row__revenue">{p.revenue}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card__header"><h3>Top cửa hàng</h3></div>
          {[
            { name: 'Henzo Tech Store', orders: 1234, revenue: '2.3T' },
            { name: 'TechPro Shop', orders: 987, revenue: '1.8T' },
            { name: 'GameZone Store', orders: 654, revenue: '1.2T' },
          ].map((s, i) => (
            <div key={i} className="report-row">
              <span className="report-row__rank">{i + 1}</span>
              <span className="report-row__name">{s.name}</span>
              <span className="report-row__sold">{s.orders} đơn</span>
              <span className="report-row__revenue">{s.revenue}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
