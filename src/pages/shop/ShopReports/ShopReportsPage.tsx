import { Breadcrumb } from '../../../components/breadcrumb';
import './ShopReportsPage.css';

export const ShopReportsPage = () => {
  const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];
  const revenue = [145, 167, 189, 156, 203, 234];

  return (
    <div className="shop-reports-page">
      <Breadcrumb />
      <h1 className="page-heading">Báo Cáo &amp; Thống Kê</h1>

      <div className="report-summary">
        {[
          { label: 'Doanh thu tháng này', value: '234,000,000đ', change: '+18.5%', color: '#4F46E5' },
          { label: 'Số đơn tháng này', value: '213', change: '+12.7%', color: '#06B6D4' },
          { label: 'Tỷ lệ chuyển đổi', value: '3.4%', change: '+0.8%', color: '#10B981' },
          { label: 'Khách hàng mới', value: '156', change: '+25.3%', color: '#F59E0B' },
        ].map((s, i) => (
          <div key={i} className="report-card card">
            <div className="report-card__header">
              <span className="report-card__label">{s.label}</span>
              <span className="report-card__change" style={{ color: s.color }}>{s.change}</span>
            </div>
            <p className="report-card__value">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card mb-4">
        <div className="card__header"><h3>Doanh thu 6 tháng gần nhất (triệu đồng)</h3></div>
        <div className="chart">
          {months.map((month, i) => (
            <div key={i} className="chart__bar-group">
              <div className="chart__bar-wrapper">
                <div className="chart__bar" style={{ height: `${(revenue[i] / 250) * 100}%`, background: 'var(--color-primary)' }}>
                  <span className="chart__bar-value">{revenue[i]}M</span>
                </div>
              </div>
              <span className="chart__label">{month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="report-grid">
        <div className="card">
          <div className="card__header"><h3>Top sản phẩm bán chạy</h3></div>
          {[
            { name: 'iPhone 16 Pro Max', sold: 234, revenue: '8.2T' },
            { name: 'MacBook Pro M4', sold: 156, revenue: '8.5T' },
            { name: 'Samsung Galaxy S25', sold: 189, revenue: '6.2T' },
            { name: 'AirPods Pro 2', sold: 445, revenue: '3.1T' },
          ].map((p, i) => (
            <div key={i} className="report-row">
              <span className="report-row__rank">{i + 1}</span>
              <span className="report-row__name">{p.name}</span>
              <span className="report-row__sold">{p.sold} đã bán</span>
              <span className="report-row__revenue">{p.revenue}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card__header"><h3>Đơn hàng theo trạng thái</h3></div>
          {[
            { label: 'Hoàn thành', value: 187, color: '#10B981' },
            { label: 'Đang vận chuyển', value: 45, color: '#06B6D4' },
            { label: 'Đang xử lý', value: 23, color: '#F59E0B' },
            { label: 'Đã hủy', value: 12, color: '#EF4444' },
          ].map((s, i) => (
            <div key={i} className="report-row">
              <div className="report-row__dot" style={{ background: s.color }} />
              <span className="report-row__name">{s.label}</span>
              <span className="report-row__sold">{s.value} đơn</span>
              <div className="report-row__bar" style={{ '--bar-width': `${(s.value / 200) * 100}%` } as React.CSSProperties}>
                <div style={{ width: 'var(--bar-width)', height: '100%', background: s.color, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
