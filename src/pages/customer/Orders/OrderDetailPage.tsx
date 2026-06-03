import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import './OrderDetailPage.css';

const fmt = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(p);

const MOCK_ORDER = {
  id: 'order-1',
  number: 'HDN-20250603-001',
  date: '2025-06-03T10:00:00Z',
  status: 'confirmed',
  paymentMethod: 'VNPay',
  shippingAddress: '123 Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh',
  items: [
    { id: 1, name: 'iPhone 16 Pro Max 256GB', brand: 'Apple', price: 34990000, originalPrice: 37990000, qty: 1, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200' },
    { id: 2, name: 'AirPods Pro 2', brand: 'Apple', price: 4990000, originalPrice: 5490000, qty: 1, image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=200' },
  ],
  subtotal: 39980000,
  shipping: 0,
  discount: 0,
  total: 39980000,
};

const TIMELINE = [
  { step: 'order', label: 'Đặt hàng', time: '10:00 - 03/06/2025', done: true },
  { step: 'confirm', label: 'Xác nhận', time: '10:30 - 03/06/2025', done: true },
  { step: 'process', label: 'Đang xử lý', time: '', done: false },
  { step: 'shipping', label: 'Đang giao', time: '', done: false },
  { step: 'delivered', label: 'Giao thành công', time: '', done: false },
];

export const OrderDetailPage = () => {
  return (
    <div className="order-detail-page">
      <div className="container">
        <div className="order-detail-page__breadcrumb">
          <Link to={ROUTES.ORDERS}>← Lịch sử đơn hàng</Link>
        </div>

        <h1 className="order-detail-page__title">Chi tiết đơn hàng {MOCK_ORDER.number}</h1>

        <div className="order-detail-layout">
          <div className="order-detail-main">
            {/* Timeline */}
            <div className="order-timeline card">
              <h3>Trạng thái đơn hàng</h3>
              <div className="timeline">
                {TIMELINE.map((t, i) => (
                  <div key={t.step} className={`timeline-item ${t.done ? 'done' : ''} ${i === TIMELINE.length - 1 ? 'last' : ''}`}>
                    <div className="timeline-item__dot">
                      {t.done && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </div>
                    <div className="timeline-item__info">
                      <span className="timeline-item__label">{t.label}</span>
                      {t.time && <span className="timeline-item__time">{t.time}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items */}
            <div className="order-items card">
              <h3>Sản phẩm đã đặt</h3>
              {MOCK_ORDER.items.map(item => (
                <div key={item.id} className="order-item">
                  <img src={item.image} alt={item.name} />
                  <div className="order-item__info">
                    <span className="order-item__brand">{item.brand}</span>
                    <span className="order-item__name">{item.name}</span>
                    <span className="order-item__qty">x{item.qty}</span>
                  </div>
                  <span className="order-item__price">{fmt(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="order-detail-sidebar">
            <div className="order-summary card">
              <h3>Tổng cộng</h3>
              <div className="order-summary__row"><span>Tạm tính</span><span>{fmt(MOCK_ORDER.subtotal)}</span></div>
              <div className="order-summary__row"><span>Phí vận chuyển</span><span>{MOCK_ORDER.shipping === 0 ? 'Miễn phí' : fmt(MOCK_ORDER.shipping)}</span></div>
              {MOCK_ORDER.discount > 0 && (
                <div className="order-summary__row order-summary__row--discount"><span>Giảm giá</span><span>-{fmt(MOCK_ORDER.discount)}</span></div>
              )}
              <div className="order-summary__divider" />
              <div className="order-summary__row order-summary__row--total"><span>Tổng</span><span>{fmt(MOCK_ORDER.total)}</span></div>
            </div>

            <div className="order-info card">
              <h3>Thông tin đơn hàng</h3>
              <div className="order-info__row"><span>Ngày đặt</span><span>{new Date(MOCK_ORDER.date).toLocaleDateString('vi-VN')}</span></div>
              <div className="order-info__row"><span>Phương thức</span><span>{MOCK_ORDER.paymentMethod}</span></div>
              <div className="order-info__row"><span>Địa chỉ giao</span><span>{MOCK_ORDER.shippingAddress}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
