import { Breadcrumb } from '../../../components/breadcrumb';
import './AdminPaymentPage.css';

const PAYMENTS = [
  { id: '1', customer: 'Nguyễn Văn A', amount: '41,980,000đ', method: 'COD', status: 'Đã thanh toán', orderId: 'HDN-20250601-001', date: '2025-06-03' },
  { id: '2', customer: 'Trần Thị B', amount: '54,990,000đ', method: 'Chuyển khoản', status: 'Đã thanh toán', orderId: 'HDN-20250520-002', date: '2025-05-20' },
  { id: '3', customer: 'Lê Văn C', amount: '89,990,000đ', method: 'COD', status: 'Chờ xử lý', orderId: 'HDN-20250531-003', date: '2025-05-31' },
  { id: '4', customer: 'Phạm Thị D', amount: '18,990,000đ', method: 'VNPay', status: 'Đã thanh toán', orderId: 'HDN-20250515-004', date: '2025-05-15' },
];

export const AdminPaymentPage = () => {
  return (
    <div className="admin-payment-page">
      <Breadcrumb />
      <div className="admin-payment-page__header">
        <h1 className="page-heading">Quản Lý Thanh Toán</h1>
        <div className="payment-stats">
          <div className="payment-stat">
            <span className="payment-stat__value">156,890,000đ</span>
            <span className="payment-stat__label">Doanh thu tháng</span>
          </div>
          <div className="payment-stat">
            <span className="payment-stat__value">45,000,000đ</span>
            <span className="payment-stat__label">Đang chờ</span>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="admin-table">
          <div className="admin-table__head"><span>Khách hàng</span><span>Mã đơn</span><span>Số tiền</span><span>Phương thức</span><span>Trạng thái</span><span>Ngày</span></div>
          {PAYMENTS.map(p => (
            <div key={p.id} className="admin-table__row">
              <span className="admin-table__customer">{p.customer}</span>
              <code className="admin-table__order">{p.orderId}</code>
              <span className="admin-table__amount">{p.amount}</span>
              <span className="badge badge-secondary">{p.method}</span>
              <span className={`badge ${p.status === 'Đã thanh toán' ? 'badge-success' : 'badge-warning'}`}>{p.status}</span>
              <span className="admin-table__date">{new Date(p.date).toLocaleDateString('vi-VN')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
