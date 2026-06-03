import { Breadcrumb } from '../../../components/breadcrumb';
import './ShopPaymentPage.css';

const PAYMENTS = [
  { id: '1', order: 'SHOP-001', customer: 'Nguyễn Văn A', amount: '42,990,000đ', method: 'COD', status: 'Đã thanh toán', date: '2025-06-03' },
  { id: '2', order: 'SHOP-002', customer: 'Trần Thị B', amount: '18,990,000đ', method: 'COD', status: 'Đã thanh toán', date: '2025-06-02' },
  { id: '3', order: 'SHOP-003', customer: 'Lê Văn C', amount: '89,990,000đ', method: 'Chuyển khoản', status: 'Chờ xử lý', date: '2025-06-01' },
];

export const ShopPaymentPage = () => {
  return (
    <div className="shop-payment-page">
      <Breadcrumb />
      <h1 className="page-heading">Thanh Toán &amp; Giao Dịch</h1>
      <div className="card">
        <table className="payment-table">
          <thead><tr><th>Mã đơn</th><th>Khách hàng</th><th>Số tiền</th><th>Phương thức</th><th>Trạng thái</th><th>Ngày</th></tr></thead>
          <tbody>
            {PAYMENTS.map(p => (
              <tr key={p.id}>
                <td><code style={{ fontFamily: 'monospace', color: 'var(--color-primary)' }}>{p.order}</code></td>
                <td>{p.customer}</td>
                <td style={{ fontWeight: 700, color: 'var(--color-danger)' }}>{p.amount}</td>
                <td>{p.method}</td>
                <td><span className={`badge ${p.status === 'Đã thanh toán' ? 'badge-success' : 'badge-warning'}`}>{p.status}</span></td>
                <td>{new Date(p.date).toLocaleDateString('vi-VN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
