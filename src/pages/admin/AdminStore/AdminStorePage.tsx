export const AdminStorePage = () => (
  <div className="admin-page">
    <div className="admin-page-header">
      <div><h1 className="admin-page__title">Quản Lý Cửa Hàng</h1><p className="admin-page__subtitle">Xem và quản lý thông tin cửa hàng</p></div>
      <button className="btn btn-primary">+ Thêm cửa hàng</button>
    </div>
    <div className="card" style={{ padding: 24 }}>
      {[
        { name: 'Henzo Store - Quận 1', address: '123 Nguyễn Trãi, Q.1, TP.HCM', rating: 4.8, products: 1234, verified: true },
        { name: 'Henzo Store - Quận 3', address: '456 Lê Lợi, Q.3, TP.HCM', rating: 4.7, products: 876, verified: true },
      ].map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${i}`} alt={s.name} style={{ width: 48, height: 48, borderRadius: 12 }} />
            <div>
              <strong style={{ display: 'block', fontSize: 'var(--font-size-base)' }}>{s.name}</strong>
              <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{s.address}</span>
              <div style={{ marginTop: 4, display: 'flex', gap: 8 }}>
                <span className="badge badge-success">⭐ {s.rating}</span>
                <span className="badge badge-primary">{s.products} sản phẩm</span>
                {s.verified && <span className="badge badge-accent">✓ Đã xác thực</span>}
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}><button className="btn btn-secondary btn-sm">Sửa</button><button className="btn btn-outline btn-sm">Xem</button></div>
        </div>
      ))}
    </div>
  </div>
);
