export const AdminCustomerPage = () => (
  <div className="admin-page">
    <h1 className="admin-page__title">Quản Lý Khách Hàng</h1>
    <p className="admin-page__subtitle">Xem và quản lý thông tin khách hàng</p>
    <div className="card" style={{ padding: 24 }}>
      {[
        { name: 'Nguyễn Văn A', email: 'nguyen.van.a@email.com', orders: 12, spent: '125,000,000đ' },
        { name: 'Trần Thị B', email: 'tran.thi.b@email.com', orders: 8, spent: '89,000,000đ' },
        { name: 'Lê Văn C', email: 'le.van.c@email.com', orders: 5, spent: '456,000,000đ' },
      ].map((c, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt={c.name} style={{ width: 40, height: 40, borderRadius: '50%' }} />
            <div><strong style={{ display: 'block', fontSize: 'var(--font-size-base)' }}>{c.name}</strong><span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{c.email}</span></div>
          </div>
          <div style={{ textAlign: 'right' }}><div style={{ fontWeight: 700, color: 'var(--color-danger)' }}>{c.spent}</div><div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{c.orders} đơn hàng</div></div>
        </div>
      ))}
    </div>
  </div>
);
