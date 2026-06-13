import { useParams, Link } from 'react-router-dom';
import { useAdmin } from '../../../contexts/AdminContext';
import { formatNumber } from '../../../utils';
import './AdminOrderDetailPage.css';

const STATUS_LABELS: Record<string, string> = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  processing: 'Đang xử lý',
  shipping: 'Đang giao',
  delivered: 'Hoàn thành',
  cancelled: 'Đã hủy',
};

export const AdminOrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useAdmin();
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="admin-page">
        <div className="admin-page__header">
          <Link to="/admin/orders" className="btn btn-sm btn-secondary">
            ← Quay lại
          </Link>
        </div>
        <div className="admin-section">
          <p className="text-muted">Không tìm thấy đơn hàng.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div className="admin-page-header__back">
          <Link to="/admin/orders" className="btn btn-sm btn-secondary">
            ← Quay lại
          </Link>
        </div>
        <div>
          <h1 className="admin-page__title">Chi tiết đơn hàng #{order.orderNumber}</h1>
          <p className="admin-page__subtitle">
            Đặt ngày {new Date(order.createdAt).toLocaleDateString('vi-VN')}
          </p>
        </div>
        <div className="admin-page-header__actions">
          <span className={`admin-status admin-status--${order.status}`}>
            {STATUS_LABELS[order.status]}
          </span>
        </div>
      </div>

      <div className="admin-section admin-section--split">
        <div className="admin-detail-card">
          <h3 className="admin-detail-card__title">Thông tin giao hàng</h3>
          <div className="admin-detail-card__row">
            <span>Người nhận</span>
            <strong>{order.customerName}</strong>
          </div>
          <div className="admin-detail-card__row">
            <span>Điện thoại</span>
            <strong>{order.customerPhone}</strong>
          </div>
          <div className="admin-detail-card__row">
            <span>Địa chỉ</span>
            <strong>{order.shippingAddress}</strong>
          </div>
          <div className="admin-detail-card__row">
            <span>Phương thức thanh toán</span>
            <span className="badge badge-secondary">{order.paymentMethod}</span>
          </div>
        </div>

        <div className="admin-detail-card">
          <h3 className="admin-detail-card__title">Tóm tắt đơn hàng</h3>
          <div className="admin-detail-card__row">
            <span>Tạm tính</span>
            <span>{formatNumber(order.subtotal)}đ</span>
          </div>
          <div className="admin-detail-card__row">
            <span>Phí vận chuyển</span>
            <span>{formatNumber(order.shippingFee)}đ</span>
          </div>
          {order.discount > 0 && (
            <div className="admin-detail-card__row">
              <span>Giảm giá</span>
              <span className="text-danger">-{formatNumber(order.discount)}đ</span>
            </div>
          )}
          <div className="admin-detail-card__row admin-detail-card__row--total">
            <span>Tổng cộng</span>
            <strong className="text-danger">{formatNumber(order.totalPrice)}đ</strong>
          </div>
        </div>
      </div>

      <div className="admin-section">
        <h3 className="admin-section__title">Sản phẩm trong đơn</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th style={{ textAlign: 'right' }}>Đơn giá</th>
              <th style={{ textAlign: 'center' }}>Số lượng</th>
              <th style={{ textAlign: 'right' }}>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <div className="order-item-cell">
                    <img src={item.image} alt={item.name} className="order-item-thumb"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/48x48/cccccc/999999?text=No'; }} />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>{formatNumber(item.price)}đ</td>
                <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                <td style={{ textAlign: 'right' }}>{formatNumber(item.price * item.quantity)}đ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
