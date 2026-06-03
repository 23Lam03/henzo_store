import '../super-admin-pages.css';

export const PermissionManagementPage = () => {
  const permissions = [
    { feature: 'Dashboard', superAdmin: true, admin: true, shop: false, customer: false },
    { feature: 'Quản lý sản phẩm', superAdmin: true, admin: true, shop: true, customer: false },
    { feature: 'Quản lý đơn hàng', superAdmin: true, admin: true, shop: true, customer: false },
    { feature: 'Quản lý khách hàng', superAdmin: true, admin: true, shop: false, customer: false },
    { feature: 'Quản lý cửa hàng', superAdmin: true, admin: true, shop: false, customer: false },
    { feature: 'Quản lý thanh toán', superAdmin: true, admin: true, shop: true, customer: false },
    { feature: 'Quản lý đánh giá', superAdmin: true, admin: true, shop: true, customer: false },
    { feature: 'Quản lý khuyến mãi', superAdmin: true, admin: true, shop: true, customer: false },
    { feature: 'Quản lý hỗ trợ', superAdmin: true, admin: true, shop: true, customer: false },
    { feature: 'Quản lý báo cáo', superAdmin: true, admin: true, shop: true, customer: false },
    { feature: 'Quản lý phân quyền', superAdmin: true, admin: false, shop: false, customer: false },
    { feature: 'Quản lý Admin', superAdmin: true, admin: false, shop: false, customer: false },
    { feature: 'Cài đặt hệ thống', superAdmin: true, admin: false, shop: false, customer: false },
    { feature: 'Xem nhật ký hệ thống', superAdmin: true, admin: true, shop: false, customer: false },
    { feature: 'Mua hàng', superAdmin: false, admin: false, shop: false, customer: true },
  ];

  return (
    <div className="superadmin-page">
      <div className="page-actions">
        <div className="page-actions__left">
          <h2 style={{ margin: 0, fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            Ma Trận Phân Quyền
          </h2>
        </div>
        <div className="page-actions__right">
          <button className="btn btn-primary">Lưu Thay Đổi</button>
        </div>
      </div>

      <div className="data-table-wrapper">
        <table className="permission-matrix">
          <thead>
            <tr>
              <th>Tính năng</th>
              <th>Super Admin</th>
              <th>Admin</th>
              <th>Shop</th>
              <th>Customer</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map(p => (
              <tr key={p.feature}>
                <td>{p.feature}</td>
                {[p.superAdmin, p.admin, p.shop, p.customer].map((allowed, i) => (
                  <td key={i}>
                    <span className={`permission-check permission-check--${allowed ? 'yes' : 'no'}`}>
                      {allowed ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      )}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
