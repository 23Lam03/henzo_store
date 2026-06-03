import './ShippingTrackingPage.css';

const TRACKING = [
  { step: 'ordered', label: 'Đơn hàng đã đặt', time: '10:00 - 03/06/2025', location: 'TP. Hồ Chí Minh', done: true, current: false },
  { step: 'confirmed', label: 'Đã xác nhận', time: '10:30 - 03/06/2025', location: 'TP. Hồ Chí Minh', done: true, current: false },
  { step: 'processing', label: 'Đang chuẩn bị', time: '14:00 - 03/06/2025', location: 'Kho hàng Q.1', done: true, current: false },
  { step: 'handover', label: 'Bàn giao vận chuyển', time: '09:00 - 04/06/2025', location: 'Bưu cục Q.1', done: true, current: false },
  { step: 'shipping', label: 'Đang vận chuyển', time: '15:30 - 04/06/2025', location: 'Trung tâm phân loại HCM', done: false, current: true },
  { step: 'delivering', label: 'Đang giao hàng', time: '', location: '', done: false, current: false },
  { step: 'delivered', label: 'Giao thành công', time: '', location: '', done: false, current: false },
];

export const ShippingTrackingPage = () => {
  return (
    <div className="shipping-tracking-page">
      <div className="container">
        <h1 className="shipping-tracking-page__title">Theo dõi vận chuyển</h1>

        <div className="shipping-info card">
          <div className="shipping-info__header">
            <div>
              <span className="shipping-info__label">Mã vận đơn</span>
              <span className="shipping-info__value">VCN-20250603001</span>
            </div>
            <div>
              <span className="shipping-info__label">Đơn vị vận chuyển</span>
              <span className="shipping-info__value">Giao hàng nhanh (GHN)</span>
            </div>
            <div>
              <span className="shipping-info__label">Dự kiến giao</span>
              <span className="shipping-info__value">05/06/2025 - 07/06/2025</span>
            </div>
          </div>
        </div>

        <div className="shipping-timeline card">
          <h3>Chi tiết lộ trình</h3>
          <div className="tracking-timeline">
            {TRACKING.map((t, i) => (
              <div key={t.step} className={`tracking-step ${t.done ? 'done' : ''} ${t.current ? 'current' : ''}`}>
                <div className="tracking-step__track">
                  <div className="tracking-step__dot">
                    {t.done ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    ) : t.current ? (
                      <div className="tracking-step__pulse" />
                    ) : null}
                  </div>
                  {i < TRACKING.length - 1 && <div className={`tracking-step__line ${t.done ? 'done' : ''}`} />}
                </div>
                <div className="tracking-step__content">
                  <span className="tracking-step__label">{t.label}</span>
                  {t.time && <span className="tracking-step__time">{t.time}</span>}
                  {t.location && <span className="tracking-step__location">{t.location}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
