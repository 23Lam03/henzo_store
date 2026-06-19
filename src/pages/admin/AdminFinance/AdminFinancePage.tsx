import { useState } from 'react';
import { useAdmin } from '../../../contexts/AdminContext';
import { MONTHLY_REVENUE } from '../../../data/adminData';
import { formatNumber } from '../../../utils';
import { useToast } from '../../../contexts/ToastContext/ToastContext';
import './AdminFinancePage.css';

const TRANSACTIONS = [
  { date: '2025-06-03', desc: 'Hoa hồng từ Henzo Tech Store', type: 'Thu', amount: 4299000, status: 'Hoàn thành' },
  { date: '2025-06-03', desc: 'Hoa hồng từ Apple House', type: 'Thu', amount: 8999000, status: 'Hoàn thành' },
  { date: '2025-06-02', desc: 'Phí nền tảng tháng 5 - TechPro Shop', type: 'Thu', amount: 12000000, status: 'Hoàn thành' },
  { date: '2025-06-02', desc: 'Hoa hồng từ Samsung World', type: 'Thu', amount: 2999000, status: 'Hoàn thành' },
  { date: '2025-06-01', desc: 'Chi phí vận hành server tháng 6', type: 'Chi', amount: 5000000, status: 'Hoàn thành' },
  { date: '2025-05-31', desc: 'Phí nền tảng - GameZone Store', type: 'Thu', amount: 8000000, status: 'Hoàn thành' },
  { date: '2025-05-30', desc: 'Chi phí marketing quảng cáo', type: 'Chi', amount: 15000000, status: 'Hoàn thành' },
  { date: '2025-05-28', desc: 'Hoa hồng từ Laptop Pro Center', type: 'Thu', amount: 1299000, status: 'Hoàn thành' },
];

export const AdminFinancePage = () => {
  const { stats } = useAdmin();
  const toast = useToast();
  const [exporting, setExporting] = useState(false);
  void exporting;
  const totalRevenue = stats.totalRevenue;
  const commissionRate = 0.05;
  const platformCommission = Math.floor(totalRevenue * commissionRate);
  const platformBalance = Math.floor(platformCommission * 0.3);
  const maxRev = Math.max(...MONTHLY_REVENUE.map(m => m.revenue));

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Quản Lý Tài Chính</h1>
          <p className="admin-page__subtitle">Theo dõi doanh thu, chi phí và lợi nhuận nền tảng</p>
        </div>
        <div className="admin-page-header__actions">
          <button className="btn btn-outline" onClick={() => { setExporting(true); setTimeout(() => { setExporting(false); toast({ title: 'Xuất Excel', message: 'Đang chuẩn bị file...', variant: 'info' }); }, 500); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Xuất Excel
          </button>
          <button className="btn btn-primary" onClick={() => { setExporting(true); setTimeout(() => { setExporting(false); toast({ title: 'Xuất PDF', message: 'Đang chuẩn bị file...', variant: 'info' }); }, 500); }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Xuất PDF
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="admin-stats admin-stats--4">
        {[
          { label: 'Tổng doanh thu', value: formatNumber(totalRevenue) + 'đ', change: '+15.2%', dir: 'up', color: '#4F46E5', icon: 'revenue' },
          { label: 'Doanh thu tháng này', value: formatNumber(MONTHLY_REVENUE[5].revenue) + 'đ', change: '+18.5%', dir: 'up', color: '#10B981', icon: 'month' },
          { label: 'Hoa hồng nền tảng (5%)', value: formatNumber(platformCommission) + 'đ', change: '+15.2%', dir: 'up', color: '#F59E0B', icon: 'commission' },
          { label: 'Số dư khả dụng', value: formatNumber(platformBalance) + 'đ', change: '', dir: 'up', color: '#06B6D4', icon: 'balance' },
        ].map((s, i) => (
          <div key={i} className="admin-stat-card">
            <div className="admin-stat-card__icon" style={{ background: `${s.color}15`, color: s.color }}>
              {s.icon === 'revenue' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
              {s.icon === 'month' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
              {s.icon === 'commission' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>}
              {s.icon === 'balance' && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>}
            </div>
            <div className="admin-stat-card__info">
              <p className="admin-stat-card__label">{s.label}</p>
              <p className="admin-stat-card__value">{s.value}</p>
              {s.change && <span className={`admin-stat-card__change admin-stat-card__change--${s.dir}`}>{s.change}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="admin-section">
        <div className="admin-section__header">
          <h3 className="admin-section__title">Doanh thu 6 tháng (VNĐ)</h3>
          <div className="finance-chart-legend">
            <span className="legend-item"><span className="legend-dot" style={{ background: 'var(--color-primary)' }} />Doanh thu</span>
            <span className="legend-item"><span className="legend-dot" style={{ background: '#10B981' }} />Hoa hồng (5%)</span>
          </div>
        </div>
        <div className="admin-section__body">
          <div className="admin-chart">
            {MONTHLY_REVENUE.map((m, i) => (
              <div key={i} className="admin-chart__bar-group">
                <div className="admin-chart__bar-wrapper">
                  <div className="admin-chart__bar" style={{ height: `${(m.revenue / maxRev) * 100}%` }}>
                    <span className="admin-chart__bar-value">
                      {m.revenue >= 1e9 ? `${(m.revenue / 1e9).toFixed(1)}B` : `${(m.revenue / 1e6).toFixed(0)}M`}
                    </span>
                  </div>
                </div>
                <span className="admin-chart__label">{m.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="admin-section">
        <div className="admin-section__header">
          <h3 className="admin-section__title">Lịch sử giao dịch nền tảng</h3>
          <div className="finance-summary">
            <span className="finance-summary__in">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="18 15 12 9 6 15"/></svg>
              Tổng thu: <strong>3,459,000đ</strong>
            </span>
            <span className="finance-summary__out">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
              Tổng chi: <strong>20,000,000đ</strong>
            </span>
          </div>
        </div>
        <table className="finance-table">
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Mô tả</th>
              <th>Loại</th>
              <th>Số tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {TRANSACTIONS.map((t, i) => (
              <tr key={i}>
                <td className="finance-date">{new Date(t.date).toLocaleDateString('vi-VN')}</td>
                <td className="finance-desc">{t.desc}</td>
                <td>
                  <span className={`badge ${t.type === 'Thu' ? 'badge-success' : 'badge-secondary'}`}>{t.type}</span>
                </td>
                <td className={`finance-amount ${t.type === 'Thu' ? 'finance-amount--in' : 'finance-amount--out'}`}>
                  {t.type === 'Thu' ? '+' : '-'}{formatNumber(t.amount)}đ
                </td>
                <td><span className="admin-status admin-status--completed">{t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
