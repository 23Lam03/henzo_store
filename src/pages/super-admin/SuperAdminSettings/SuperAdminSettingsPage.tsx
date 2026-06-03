import '../super-admin-pages.css';

export const SuperAdminSettingsPage = () => (
  <div className="superadmin-page">
    <div className="page-actions">
      <h2 style={{ margin: 0, fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
        Cài Đặt Hệ Thống
      </h2>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
      {[
        {
          title: 'Bảo mật',
          items: [
            { label: 'Yêu cầu mật khẩu mạnh', value: 'Bật', enabled: true },
            { label: 'Xác thực 2 lớp (2FA)', value: 'Bật', enabled: true },
            { label: 'Giới hạn đăng nhập sai', value: '5 lần', enabled: false },
            { label: 'Session timeout', value: '30 phút', enabled: false },
          ]
        },
        {
          title: 'Thông báo',
          items: [
            { label: 'Email thông báo', value: 'Bật', enabled: true },
            { label: 'Slack webhook', value: 'Tắt', enabled: false },
            { label: 'SMS alert', value: 'Tắt', enabled: false },
            { label: 'Log retention', value: '90 ngày', enabled: false },
          ]
        },
        {
          title: 'Vận hành',
          items: [
            { label: 'Chế độ bảo trì', value: 'Tắt', enabled: true },
            { label: 'Auto backup', value: 'Hàng ngày', enabled: false },
            { label: 'Cache TTL', value: '1 giờ', enabled: false },
            { label: 'Rate limit API', value: '1000 req/phút', enabled: false },
          ]
        },
        {
          title: 'Tài khoản',
          items: [
            { label: 'Cho phép đăng ký', value: 'Bật', enabled: true },
            { label: 'Yêu cầu xác thực email', value: 'Bật', enabled: false },
            { label: 'Cho phép Shop tự đăng ký', value: 'Bật', enabled: false },
            { label: 'Phê duyệt Shop thủ công', value: 'Tắt', enabled: false },
          ]
        },
      ].map(section => (
        <div key={section.title} className="data-table-wrapper" style={{ padding: 'var(--space-5)' }}>
          <h3 style={{ margin: '0 0 var(--space-4)', fontSize: 'var(--font-size-md)', fontWeight: 700, color: 'var(--color-text-primary)' }}>{section.title}</h3>
          {section.items.map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>{item.label}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)', fontWeight: 500 }}>{item.value}</span>
                <button className="action-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);
