import { Breadcrumb } from '../../../components/breadcrumb';
import './ShopPromotionsPage.css';

const PROMOTIONS = [
  { id: '1', name: 'Flash Sale Cuối Tuần', type: 'Giảm giá', discount: '20%', minOrder: '5,000,000đ', startDate: '2025-06-01', endDate: '2025-06-30', status: 'Đang hoạt động', usedCount: 234, maxUse: 1000 },
  { id: '2', name: 'Voucher Giảm 200K', type: 'Voucher', discount: '200,000đ', minOrder: '2,000,000đ', startDate: '2025-05-01', endDate: '2025-06-30', status: 'Đang hoạt động', usedCount: 567, maxUse: 2000 },
  { id: '3', name: 'Mua 1 Tặng 1 Phụ Kiện', type: 'Khuyến mãi', discount: 'Mua 1 Tặng 1', minOrder: 'Không', startDate: '2025-05-15', endDate: '2025-05-31', status: 'Đã kết thúc', usedCount: 89, maxUse: 200 },
];

export const ShopPromotionsPage = () => {
  return (
    <div className="shop-promotions-page">
      <Breadcrumb />
      <div className="shop-promotions-page__header">
        <h1 className="page-heading">Quản Lý Khuyến Mãi</h1>
        <button className="btn btn-primary">+ Tạo khuyến mãi mới</button>
      </div>
      <div className="card">
        <div className="promotions-table">
          <div className="promotions-table__head"><span>Khuyến mãi</span><span>Loại</span><span>Giảm</span><span>Đơn tối thiểu</span><span>Thời gian</span><span>Đã dùng</span><span>Trạng thái</span><span></span></div>
          {PROMOTIONS.map(p => (
            <div key={p.id} className="promotions-table__row">
              <div>
                <p className="promotions-table__name">{p.name}</p>
              </div>
              <span className="badge badge-secondary">{p.type}</span>
              <span className="promotions-table__discount">{p.discount}</span>
              <span>{p.minOrder}</span>
              <div className="promotions-table__date">
                <span>{new Date(p.startDate).toLocaleDateString('vi-VN')}</span>
                <span className="text-muted">→</span>
                <span>{new Date(p.endDate).toLocaleDateString('vi-VN')}</span>
              </div>
              <div className="promotions-table__progress">
                <div className="promotions-table__progress-bar">
                  <div className="promotions-table__progress-fill" style={{ width: `${(p.usedCount / p.maxUse) * 100}%` }} />
                </div>
                <span>{p.usedCount}/{p.maxUse}</span>
              </div>
              <span className={`badge ${p.status === 'Đang hoạt động' ? 'badge-success' : 'badge-secondary'}`}>{p.status}</span>
              <div className="promotions-table__actions">
                <button className="btn btn-sm btn-outline">Sửa</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
