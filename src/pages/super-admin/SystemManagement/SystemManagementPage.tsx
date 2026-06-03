import '../super-admin-pages.css';

export const SystemManagementPage = () => {
  return (
    <div className="superadmin-page">
      <div className="page-actions">
        <h2 style={{ margin: 0, fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
          Cấu Hình Hệ Thống
        </h2>
      </div>
      <div className="data-table-wrapper" style={{ padding: 'var(--space-5)' }}>
        {[
          { label: 'Tên nền tảng', value: 'HenzoStore', editable: true },
          { label: 'Phiên bản', value: 'v2.4.1', editable: false },
          { label: 'URL API', value: 'https://api.henzo.vn', editable: true },
          { label: 'Email hỗ trợ', value: 'support@henzo.vn', editable: true },
          { label: 'Hotline', value: '1900 1234', editable: true },
          { label: 'Chế độ bảo trì', value: 'Tắt', editable: true },
          { label: 'Debug mode', value: 'Tắt', editable: true },
          { label: 'SSL Certificate', value: 'Active - Còn 30 ngày', editable: false },
        ].map(item => (
          <div key={item.label} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: 'var(--space-4) 0', borderBottom: '1px solid var(--color-border)'
          }}>
            <div>
              <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-text-primary)', fontSize: 'var(--font-size-sm)' }}>{item.label}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>{item.value}</span>
              {item.editable && <button className="action-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
