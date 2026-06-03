import { Breadcrumb } from '../../../components/breadcrumb';
import './AdminReviewPage.css';

const REVIEWS = [
  { id: '1', product: 'iPhone 16 Pro Max 256GB', shop: 'Henzo Tech Store', customer: 'Nguyễn Văn A', rating: 5, comment: 'Sản phẩm tuyệt vời! Giao hàng nhanh, đóng gói cẩn thận. Camera chụp ảnh rất đẹp!', date: '2025-05-28', status: 'Hiển thị' },
  { id: '2', product: 'MacBook Pro M4 14"', shop: 'TechPro Shop', customer: 'Trần Thị B', rating: 1, comment: 'Máy bị lỗi ngay từ ngày đầu. Shop không hỗ trợ bảo hành đàng hoàng.', date: '2025-05-25', status: 'Đã ẩn' },
  { id: '3', product: 'Samsung Galaxy S25 Ultra', shop: 'Henzo Tech Store', customer: 'Lê Văn C', rating: 4, comment: 'Sản phẩm tốt, pin trâu. Giao hàng đúng hẹn. Khuyến mãi hấp dẫn.', date: '2025-05-20', status: 'Hiển thị' },
];

export const AdminReviewPage = () => {
  return (
    <div className="admin-review-page">
      <Breadcrumb />
      <h1 className="page-heading">Quản Lý Đánh Giá</h1>
      <div className="card">
        <div className="review-table">
          <div className="review-table__head"><span>Sản phẩm</span><span>Cửa hàng</span><span>Khách hàng</span><span>Đánh giá</span><span>Nhận xét</span><span>Ngày</span><span>Trạng thái</span><span></span></div>
          {REVIEWS.map(r => (
            <div key={r.id} className="review-table__row">
              <span className="review-table__product">{r.product}</span>
              <span className="review-table__shop">{r.shop}</span>
              <span>{r.customer}</span>
              <div className="review-table__stars">
                {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
              </div>
              <span className="review-table__comment">{r.comment}</span>
              <span className="review-table__date">{new Date(r.date).toLocaleDateString('vi-VN')}</span>
              <span className={`badge ${r.status === 'Hiển thị' ? 'badge-success' : 'badge-secondary'}`}>{r.status}</span>
              <div className="review-table__actions">
                <button className="btn btn-sm btn-outline">{r.status === 'Hiển thị' ? 'Ẩn' : 'Hiện'}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
