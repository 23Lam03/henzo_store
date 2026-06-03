import { Breadcrumb } from '../../../components/breadcrumb';
import './ShopFinancePage.css';

export const ShopFinancePage = () => {
  const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];
  const revenue = [145, 167, 189, 156, 203, 234];
  const maxRev = Math.max(...revenue);

  return (
    <div className="shop-finance-page">
      <Breadcrumb />
      <h1 className="page-heading">Tài Chính Cửa Hàng</h1>

      <div className="finance-summary">
        {[
          { label: 'Tổng doanh thu', value: '1,094,000,000đ', change: '+18.5%', icon: '💰', color: '#4F46E5' },
          { label: 'Doanh thu tháng này', value: '234,000,000đ', change: '+18.5%', icon: '📈', color: '#10B981' },
          { label: 'Số dư khả dụng', value: '89,500,000đ', change: '+5.2%', icon: '🏦', color: '#06B6D4' },
          { label: 'Đang chờ thanh toán', value: '45,000,000đ', change: '', icon: '⏳', color: '#F59E0B' },
        ].map((s, i) => (
          <div key={i} className="stat-card card">
            <div className="stat-card__icon" style={{ background: `${s.color}15`, color: s.color }}>{s.icon}</div>
            <div className="stat-card__info">
              <p className="stat-card__label">{s.label}</p>
              <p className="stat-card__value">{s.value}</p>
              {s.change && <span className="stat-card__change">{s.change}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="card mb-4">
        <div className="card__header"><h3>Biểu đồ doanh thu 6 tháng</h3></div>
        <div className="finance-chart">
          {months.map((month, i) => (
            <div key={i} className="finance-chart__bar-group">
              <div className="finance-chart__bar-wrapper">
                <div className="finance-chart__bar" style={{ height: `${(revenue[i] / maxRev) * 100}%` }}>
                  <span className="finance-chart__bar-value">{revenue[i]}M</span>
                </div>
              </div>
              <span className="finance-chart__label">{month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-4">
        <div className="card__header"><h3>Lịch sử giao dịch</h3></div>
        <table className="finance-table">
          <thead>
            <tr><th>Ngày</th><th>Mô tả</th><th>Loại</th><th>Số tiền</th><th>Trạng thái</th></tr>
          </thead>
          <tbody>
            {[
              { date: '2025-06-03', desc: 'Thanh toán đơn hàng #SHOP-001', type: 'Thu', amount: '+42,990,000đ', status: 'Hoàn thành', color: '#10B981' },
              { date: '2025-06-02', desc: 'Rút tiền về tài khoản ngân hàng', type: 'Chi', amount: '-20,000,000đ', status: 'Hoàn thành', color: '#EF4444' },
              { date: '2025-06-01', desc: 'Thanh toán đơn hàng #SHOP-002', type: 'Thu', amount: '+18,990,000đ', status: 'Hoàn thành', color: '#10B981' },
              { date: '2025-05-31', desc: 'Phí hoa hồng nền tảng', type: 'Chi', amount: '-4,299,000đ', status: 'Hoàn thành', color: '#EF4444' },
              { date: '2025-05-30', desc: 'Thanh toán đơn hàng #SHOP-003', type: 'Thu', amount: '+89,990,000đ', status: 'Hoàn thành', color: '#10B981' },
            ].map((t, i) => (
              <tr key={i}>
                <td>{new Date(t.date).toLocaleDateString('vi-VN')}</td>
                <td style={{ fontWeight: 500 }}>{t.desc}</td>
                <td><span className={`badge ${t.type === 'Thu' ? 'badge-success' : 'badge-secondary'}`}>{t.type}</span></td>
                <td style={{ fontWeight: 700, color: t.color }}>{t.amount}</td>
                <td><span className="badge badge-success">{t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card__header"><h3>Rút tiền</h3></div>
        <div className="withdraw-form">
          <div className="input-group">
            <label className="input-label">Số tiền muốn rút</label>
            <input type="number" className="input" placeholder="Nhập số tiền..." defaultValue={50000000} />
          </div>
          <div className="input-group">
            <label className="input-label">Số tài khoản</label>
            <input type="text" className="input" placeholder="Nhập số tài khoản..." defaultValue="1234567890 - Ngân hàng Vietcombank" />
          </div>
          <button className="btn btn-primary">Yêu cầu rút tiền</button>
        </div>
      </div>
    </div>
  );
};
