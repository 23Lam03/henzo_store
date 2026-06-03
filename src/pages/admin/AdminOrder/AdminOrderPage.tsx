import './AdminOrderPage.css';
export const AdminOrderPage = () => (
  <div className="admin-page">
    <h1 className="admin-page__title">Quản Lý Đơn Hàng</h1>
    <p className="admin-page__subtitle">Xem và xử lý các đơn hàng từ khách hàng</p>
    <div className="card" style={{ padding: 24 }}>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Mã đơn</th><th>Khách hàng</th><th>Tổng tiền</th><th>Trạng thái</th><th>Ngày đặt</th><th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: 'HDN-20250103-001', customer: 'Nguyễn Văn A', amount: '42,990,000đ', status: 'Đang xử lý', date: '03/01/2025' },
            { id: 'HDN-20250103-002', customer: 'Trần Thị B', amount: '18,990,000đ', status: 'Đã xác nhận', date: '03/01/2025' },
            { id: 'HDN-20250102-003', customer: 'Lê Văn C', amount: '89,990,000đ', status: 'Đang vận chuyển', date: '02/01/2025' },
          ].map((o, i) => (
            <tr key={i}>
              <td><code style={{ fontSize: 'var(--font-size-xs)' }}>{o.id}</code></td>
              <td>{o.customer}</td>
              <td style={{ fontWeight: 700, color: 'var(--color-danger)' }}>{o.amount}</td>
              <td><span className="badge badge-primary">{o.status}</span></td>
              <td>{o.date}</td>
              <td><button className="btn btn-secondary btn-sm">Xem</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
