import { Breadcrumb } from '../../../components/breadcrumb';
import './ShopShippingPage.css';

const SHIPMENTS = [
  { id: 'GH-001', orderId: 'SHOP-001', customer: 'Nguyễn Văn A', address: '123 Nguyễn Trãi, Q.1, TP.HCM', carrier: 'Giao hàng nhanh', trackingCode: 'GHN123456789', status: 'Đang vận chuyển', eta: '2025-06-05' },
  { id: 'GH-002', orderId: 'SHOP-003', customer: 'Lê Văn C', address: '456 Lê Lợi, Q.3, TP.HCM', carrier: 'Giao hàng tiết kiệm', trackingCode: 'GHTK987654321', status: 'Đã giao', eta: '2025-06-03' },
  { id: 'GH-003', orderId: 'SHOP-004', customer: 'Phạm Thị D', address: '789 Trần Hưng Đạo, Q.5, TP.HCM', carrier: 'Giao hàng nhanh', trackingCode: 'GHN456789123', status: 'Chờ lấy hàng', eta: '2025-06-04' },
];

export const ShopShippingPage = () => {
  return (
    <div className="shop-shipping-page">
      <Breadcrumb />
      <h1 className="page-heading">Quản Lý Vận Chuyển</h1>
      <div className="card">
        <div className="shipping-summary">
          {[
            { label: 'Chờ lấy hàng', value: SHIPMENTS.filter(s => s.status === 'Chờ lấy hàng').length, color: '#F59E0B' },
            { label: 'Đang vận chuyển', value: SHIPMENTS.filter(s => s.status === 'Đang vận chuyển').length, color: '#3B82F6' },
            { label: 'Đã giao', value: SHIPMENTS.filter(s => s.status === 'Đã giao').length, color: '#10B981' },
          ].map((s, i) => (
            <div key={i} className="shipping-summary__card" style={{ borderTop: `3px solid ${s.color}` }}>
              <span className="shipping-summary__value" style={{ color: s.color }}>{s.value}</span>
              <span className="shipping-summary__label">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="shipping-table">
          <div className="shipping-table__head"><span>Vận đơn</span><span>Đơn hàng</span><span>Khách hàng</span><span>Địa chỉ</span><span>Đơn vị vận chuyển</span><span>ETA</span><span>Trạng thái</span><span></span></div>
          {SHIPMENTS.map(s => (
            <div key={s.id} className="shipping-table__row">
              <code className="shipping-table__id">{s.id}</code>
              <code className="shipping-table__order">{s.orderId}</code>
              <div className="shipping-table__customer">
                <strong>{s.customer}</strong>
                <small>{s.address}</small>
              </div>
              <span className="shipping-table__carrier">{s.carrier}</span>
              <code className="shipping-table__tracking">{s.trackingCode}</code>
              <span className="shipping-table__eta">{s.eta}</span>
              <span className={`badge ${s.status === 'Đã giao' ? 'badge-success' : s.status === 'Đang vận chuyển' ? 'badge-primary' : 'badge-warning'}`}>{s.status}</span>
              <button className="btn btn-sm btn-outline">Cập nhật</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
