import './AdminProductPage.css';
export const AdminProductPage = () => (
  <div className="admin-page">
    <div className="admin-page-header">
      <div>
        <h1 className="admin-page__title">Quản Lý Sản Phẩm</h1>
        <p className="admin-page__subtitle">Kiểm duyệt và quản lý các sản phẩm trên hệ thống</p>
      </div>
      <button className="btn btn-primary">+ Thêm sản phẩm</button>
    </div>
    <div className="card" style={{ padding: 24 }}>
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr><th>Sản phẩm</th><th>Danh mục</th><th>Giá</th><th>Tồn kho</th><th>Trạng thái</th><th>Thao tác</th></tr>
          </thead>
          <tbody>
            {[
              { name: 'ASUS ROG Strix G16', cat: 'Laptop', price: '42,990,000đ', stock: 15, status: 'Đang bán' },
              { name: 'MacBook Pro 16" M4 Max', cat: 'Laptop', price: '89,990,000đ', stock: 8, status: 'Đang bán' },
              { name: 'iPhone 16 Pro Max', cat: 'Điện thoại', price: '34,990,000đ', stock: 50, status: 'Hot' },
              { name: 'Samsung Galaxy S25 Ultra', cat: 'Điện thoại', price: '29,990,000đ', stock: 35, status: 'Đang bán' },
            ].map((p, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{p.name}</td>
                <td style={{ color: 'var(--color-text-muted)' }}>{p.cat}</td>
                <td style={{ fontWeight: 700, color: 'var(--color-danger)' }}>{p.price}</td>
                <td>{p.stock}</td>
                <td><span className="badge badge-success">{p.status}</span></td>
                <td><button className="btn btn-secondary btn-sm">Sửa</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
