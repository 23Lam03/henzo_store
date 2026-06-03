import { Breadcrumb } from '../../../components/breadcrumb';
import './AdminPromotionPage.css';

const PROMOS = [
  { id: '1', name: 'Flash Sale Cuối Tuần', type: 'Giảm giá sản phẩm', discount: '20%', scope: 'Toàn hệ thống', status: 'Đang hoạt động', start: '2025-06-01', end: '2025-06-30', participants: 1234 },
  { id: '2', name: 'Voucher 200K', type: 'Mã giảm giá', discount: '200,000đ', scope: 'Toàn hệ thống', status: 'Đang hoạt động', start: '2025-05-01', end: '2025-06-30', participants: 4567 },
  { id: '3', name: 'Sale iPhone', type: 'Giảm giá sản phẩm', discount: '15%', scope: 'Danh mục Điện thoại', status: 'Đã kết thúc', start: '2025-04-01', end: '2025-05-31', participants: 890 },
];

export const AdminPromotionPage = () => {
  return (
    <div className="admin-promotion-page">
      <Breadcrumb />
      <div className="admin-promotion-page__header">
        <h1 className="page-heading">Quản Lý Khuyến Mãi</h1>
        <button className="btn btn-primary">+ Tạo khuyến mãi mới</button>
      </div>
      <div className="card">
        <div className="promotion-table">
          <div className="promotion-table__head"><span>Khuyến mãi</span><span>Loại</span><span>Giảm</span><span>Phạm vi</span><span>Thời gian</span><span>Người tham gia</span><span>Trạng thái</span><span></span></div>
          {PROMOS.map(p => (
            <div key={p.id} className="promotion-table__row">
              <div>
                <p className="promotion-table__name">{p.name}</p>
              </div>
              <span className="badge badge-secondary">{p.type}</span>
              <span className="promotion-table__discount">{p.discount}</span>
              <span>{p.scope}</span>
              <div className="promotion-table__date">
                <span>{new Date(p.start).toLocaleDateString('vi-VN')}</span>
                <span className="text-muted">→</span>
                <span>{new Date(p.end).toLocaleDateString('vi-VN')}</span>
              </div>
              <span className="promotion-table__participants">{p.participants.toLocaleString('vi-VN')}</span>
              <span className={`badge ${p.status === 'Đang hoạt động' ? 'badge-success' : 'badge-secondary'}`}>{p.status}</span>
              <div className="promotion-table__actions">
                <button className="btn btn-sm btn-outline">Sửa</button>
                <button className="btn btn-sm btn-outline">Xóa</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
