import { Breadcrumb } from '../../../components/breadcrumb';
import './AdminFinancePage.css';

export const AdminFinancePage = () => {
  return (
    <div className="admin-finance-page">
      <Breadcrumb />
      <h1 className="page-heading">Quản Lý Tài Chính</h1>
      <div className="finance-grid">
        {[
          { label: 'Tổng doanh thu', value: '9,954,000,000đ', change: '+15.2%', icon: '💰', color: '#4F46E5' },
          { label: 'Doanh thu tháng này', value: '2,340,000,000đ', change: '+18.5%', icon: '📈', color: '#10B981' },
          { label: 'Hoa hồng nền tảng', value: '234,000,000đ', change: '+18.5%', icon: '💵', color: '#F59E0B' },
          { label: 'Số dư nền tảng', value: '1,560,000,000đ', change: '', icon: '🏦', color: '#06B6D4' },
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
      <div className="card">
        <div className="card__header"><h3>Lịch sử giao dịch hệ thống</h3></div>
        <table className="finance-table">
          <thead><tr><th>Ngày</th><th>Mô tả</th><th>Loại</th><th>Số tiền</th><th>Trạng thái</th></tr></thead>
          <tbody>
            {[
              { date: '2025-06-03', desc: 'Hoa hồng từ Henzo Tech Store', type: 'Thu', amount: '+4,299,000đ', status: 'Hoàn thành' },
              { date: '2025-06-02', desc: 'Phí nền tảng tháng 5', type: 'Thu', amount: '+12,000,000đ', status: 'Hoàn thành' },
              { date: '2025-06-01', desc: 'Chi phí vận hành server', type: 'Chi', amount: '-5,000,000đ', status: 'Hoàn thành' },
            ].map((t, i) => (
              <tr key={i}>
                <td>{new Date(t.date).toLocaleDateString('vi-VN')}</td>
                <td style={{ fontWeight: 500 }}>{t.desc}</td>
                <td><span className={`badge ${t.type === 'Thu' ? 'badge-success' : 'badge-secondary'}`}>{t.type}</span></td>
                <td style={{ fontWeight: 700, color: t.amount.startsWith('+') ? '#10B981' : '#EF4444' }}>{t.amount}</td>
                <td><span className="badge badge-success">{t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
