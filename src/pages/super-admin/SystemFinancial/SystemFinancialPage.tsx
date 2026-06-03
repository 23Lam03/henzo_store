import '../super-admin-pages.css';

export const SystemFinancialPage = () => (
  <div className="superadmin-page">
    <div className="stats-grid">
      {[
        { label: 'Tổng doanh thu', value: '125.4 tỷ', icon: '💰', color: '#10B981' },
        { label: 'Hoa hồng platform', value: '6.27 tỷ', icon: '📊', color: '#4F46E5' },
        { label: 'Chi phí vận hành', value: '2.1 tỷ', icon: '💸', color: '#EF4444' },
        { label: 'Lợi nhuận ròng', value: '4.17 tỷ', icon: '📈', color: '#06B6D4' },
      ].map(s => (
        <div key={s.label} className="stat-card" style={{ '--accent': s.color } as React.CSSProperties}>
          <div className="stat-card__icon">{s.icon}</div>
          <div className="stat-card__info">
            <p className="stat-card__value">{s.value}</p>
            <p className="stat-card__label">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="data-table-wrapper" style={{ marginTop: 'var(--space-5)' }}>
      <table className="data-table">
        <thead>
          <tr>
            <th>Tháng</th><th>Doanh thu</th><th>Hoa hồng</th><th>Chi phí</th><th>Lợi nhuận</th><th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {[
            { month: 'Tháng 6/2026', revenue: '25.2 tỷ', commission: '1.26 tỷ', expense: '420 triệu', profit: '840 triệu', status: 'active' },
            { month: 'Tháng 5/2026', revenue: '22.8 tỷ', commission: '1.14 tỷ', expense: '380 triệu', profit: '760 triệu', status: 'active' },
            { month: 'Tháng 4/2026', revenue: '21.5 tỷ', commission: '1.07 tỷ', expense: '350 triệu', profit: '720 triệu', status: 'active' },
          ].map(row => (
            <tr key={row.month}>
              <td style={{ fontWeight: 600 }}>{row.month}</td>
              <td>{row.revenue}</td>
              <td style={{ color: '#4F46E5' }}>{row.commission}</td>
              <td style={{ color: '#EF4444' }}>{row.expense}</td>
              <td style={{ color: '#10B981' }}>{row.profit}</td>
              <td><span className="badge badge--active">Hoàn tất</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
