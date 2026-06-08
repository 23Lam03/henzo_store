import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart, useAuth, useOrder } from '../../../contexts';
import { ROUTES } from '../../../constants/routes';
import './CheckoutPage.css';

const fmt = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(p);

const PROVINCES = ['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Hải Phòng', 'Biên Hòa', 'Nha Trang', 'Huế'];
const DISTRICTS: Record<string, string[]> = {
  'TP. Hồ Chí Minh': ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10', 'Quận 11', 'Quận 12', 'Bình Thạnh', 'Gò Vấp', 'Phú Nhuận', 'Tân Bình', 'Tân Phú', 'Thủ Đức', 'Bình Tân', 'Hóc Môn', 'Củ Chi', 'Nhà Bè', 'Cần Giờ'],
  'Hà Nội': ['Ba Đình', 'Hoàn Kiếm', 'Hai Bà Trưng', 'Đống Đa', 'Tây Hồ', 'Cầu Giấy', 'Thanh Xuân', 'Hoàng Mai', 'Long Biên', 'Nam Từ Liêm', 'Bắc Từ Liêm', 'Hà Đông'],
};

export const CheckoutPage = () => {
  const { items, clearSelectedItems } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrder();
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState('COD');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [createdOrderId, setCreatedOrderId] = useState('');
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    note: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedItems = items.filter(i => i.selected);
  const total = selectedItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const shipping = total >= 500000 ? 0 : 30000;

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Vui lòng nhập họ tên.';
    if (!form.phone.trim()) errs.phone = 'Vui lòng nhập số điện thoại.';
    else if (!/^0[0-9]{9}$/.test(form.phone)) errs.phone = 'Số điện thoại không hợp lệ.';
    if (!province) errs.province = 'Vui lòng chọn tỉnh/thành phố.';
    if (!district) errs.district = 'Vui lòng chọn quận/huyện.';
    if (!form.address.trim()) errs.address = 'Vui lòng nhập địa chỉ cụ thể.';
    return errs;
  };

  const handlePlaceOrder = () => {
    if (step === 1) {
      const errs = validateStep1();
      if (Object.keys(errs).length > 0) { setErrors(errs); return; }
      setErrors({});
      setStep(2);
    } else {
      const shippingAddress = `${form.address}, ${district}, ${province}`;
      const order = createOrder({
        items: selectedItems,
        totalPrice: total + shipping,
        shippingAddress,
        paymentMethod: payment,
      });

      clearSelectedItems();
      setCreatedOrderId(order.id);
      setOrderNumber(order.orderNumber);
      setOrderPlaced(true);
    }
  };

  if (orderPlaced) {
    return (
      <div className="checkout-page checkout-page--success">
        <div className="checkout-success">
          <div className="checkout-success__icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h2>Đặt hàng thành công!</h2>
          <p>Mã đơn hàng của bạn: <strong>{orderNumber}</strong></p>
          <p className="checkout-success__detail">
            Cảm ơn bạn đã đặt hàng tại HenzoStore. Đơn hàng đã được ghi nhận với trạng thái chờ xác nhận.
          </p>
          <div className="checkout-success__actions">
            <Link to={createdOrderId ? ROUTES.ORDER_DETAIL.replace(':id', createdOrderId) : ROUTES.ORDERS} className="btn btn-primary">Xem chi tiết đơn</Link>
            <Link to={ROUTES.ORDERS} className="btn btn-secondary">Lịch sử đơn hàng</Link>
          </div>
        </div>
      </div>
    );
  }

  if (selectedItems.length === 0) {
    return (
      <div className="checkout-page checkout-page--empty">
        <p>Giỏ hàng trống. <Link to={ROUTES.PRODUCTS}>Tiếp tục mua sắm</Link></p>
      </div>
    );
  }

  const f = (key: string) => ({
    value: (form as Record<string, string>)[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm({ ...form, [key]: e.target.value });
      if (errors[key]) setErrors({ ...errors, [key]: '' });
    },
  });

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="checkout-page__title">Thanh toán</h1>

        <div className="checkout-page__layout">
          <div className="checkout-page__main">
            <div className="checkout-steps">
              <div className={`checkout-step ${step >= 1 ? 'active' : ''}`}>
                <span className="checkout-step__num">1</span>
                <span className="checkout-step__label">Địa chỉ giao hàng</span>
              </div>
              <div className="checkout-step__line" />
              <div className={`checkout-step ${step >= 2 ? 'active' : ''}`}>
                <span className="checkout-step__num">2</span>
                <span className="checkout-step__label">Thanh toán</span>
              </div>
            </div>

            {step === 1 && (
              <div className="checkout-section card">
                <h2 className="checkout-section__title">Thông tin giao hàng</h2>

                <div className="checkout-form">
                  <div className="checkout-form__row">
                    <div className="input-group">
                      <label className="input-label">Họ và tên</label>
                      <input type="text" className={`input ${errors.name ? 'input-error' : ''}`} placeholder="Nguyễn Văn A" {...f('name')} />
                      {errors.name && <span className="input-error-message">{errors.name}</span>}
                    </div>
                    <div className="input-group">
                      <label className="input-label">Số điện thoại</label>
                      <input type="tel" className={`input ${errors.phone ? 'input-error' : ''}`} placeholder="0xxx xxx xxx" {...f('phone')} />
                      {errors.phone && <span className="input-error-message">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="checkout-form__row">
                    <div className="input-group">
                      <label className="input-label">Tỉnh / Thành phố</label>
                      <select className={`input ${errors.province ? 'input-error' : ''}`} value={province} onChange={e => { setProvince(e.target.value); setDistrict(''); }}>
                        <option value="">Chọn tỉnh/thành phố</option>
                        {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                      {errors.province && <span className="input-error-message">{errors.province}</span>}
                    </div>
                    <div className="input-group">
                      <label className="input-label">Quận / Huyện</label>
                      <select className={`input ${errors.district ? 'input-error' : ''}`} value={district} onChange={e => setDistrict(e.target.value)} disabled={!province}>
                        <option value="">Chọn quận/huyện</option>
                        {(DISTRICTS[province] || []).map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                      {errors.district && <span className="input-error-message">{errors.district}</span>}
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Địa chỉ cụ thể</label>
                    <input type="text" className={`input ${errors.address ? 'input-error' : ''}`} placeholder="Số nhà, đường, phường/xã" {...f('address')} />
                    {errors.address && <span className="input-error-message">{errors.address}</span>}
                  </div>

                  <div className="input-group">
                    <label className="input-label">Ghi chú (tùy chọn)</label>
                    <textarea className="input" rows={3} placeholder="Ghi chú về đơn hàng, ví dụ: thời gian giao hàng mong muốn." {...f('note')} />
                  </div>
                </div>

                <button className="btn btn-primary btn-lg" onClick={handlePlaceOrder}>
                  Tiếp tục thanh toán
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="checkout-section card">
                <h2 className="checkout-section__title">Phương thức thanh toán</h2>

                <div className="payment-methods">
                  {[
                    { id: 'COD', label: 'Thanh toán khi nhận hàng (COD)', desc: 'Trả tiền mặt khi nhận được hàng', icon: '💵' },
                    { id: 'VNPay', label: 'Thanh toán qua VNPay', desc: 'Thanh toán trực tuyến qua ATM, Visa, Mastercard', icon: '💳' },
                    { id: 'Momo', label: 'Thanh toán qua MoMo', desc: 'Quét mã MoMo để thanh toán', icon: '📱' },
                    { id: 'ZaloPay', label: 'Thanh toán qua ZaloPay', desc: 'Thanh toán nhanh qua ví ZaloPay', icon: '📲' },
                  ].map(m => (
                    <label key={m.id} className={`payment-method ${payment === m.id ? 'selected' : ''}`}>
                      <input type="radio" name="payment" value={m.id} checked={payment === m.id} onChange={() => setPayment(m.id)} />
                      <span className="payment-method__icon">{m.icon}</span>
                      <div className="payment-method__info">
                        <span className="payment-method__label">{m.label}</span>
                        <span className="payment-method__desc">{m.desc}</span>
                      </div>
                      <span className="payment-method__check">
                        {payment === m.id && (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="checkout-section__nav">
                  <button className="btn btn-secondary" onClick={() => setStep(1)}>Quay lại</button>
                  <button className="btn btn-primary btn-lg" onClick={handlePlaceOrder}>
                    Đặt hàng ngay · {fmt(total + shipping)}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="checkout-page__sidebar">
            <div className="checkout-order card">
              <h3 className="checkout-order__title">Đơn hàng ({selectedItems.length})</h3>
              {selectedItems.map(item => (
                <div key={item.product.id} className="checkout-order__item">
                  <img src={item.product.images[0]} alt={item.product.name} />
                  <div>
                    <p className="checkout-order__name">{item.product.name}</p>
                    <p className="checkout-order__qty">x{item.quantity}</p>
                  </div>
                  <span className="checkout-order__price">{fmt(item.product.price * item.quantity)}</span>
                </div>
              ))}
              <div className="checkout-order__divider" />
              <div className="checkout-order__row"><span>Tạm tính</span><span>{fmt(total)}</span></div>
              <div className="checkout-order__row"><span>Phí vận chuyển</span><span>{shipping === 0 ? 'Miễn phí' : fmt(shipping)}</span></div>
              <div className="checkout-order__divider" />
              <div className="checkout-order__row checkout-order__row--total"><span>Tổng cộng</span><span>{fmt(total + shipping)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
