import { Breadcrumb } from '../../../components/breadcrumb';
import './ShopReviewsPage.css';

const REVIEWS = [
  { id: '1', product: 'iPhone 16 Pro Max 256GB', customer: 'Nguyễn Văn A', rating: 5, comment: 'Sản phẩm tuyệt vời! Camera chụp ảnh rất đẹp, pin trâu. Giao hàng nhanh, đóng gói cẩn thận.', date: '2025-05-28', status: 'Hiển thị' },
  { id: '2', product: 'MacBook Pro M4 14"', customer: 'Trần Thị B', rating: 4, comment: 'Máy chạy mượt, thiết kế đẹp. Nhưng giá hơi cao so với cấu hình.', date: '2025-05-25', status: 'Hiển thị' },
  { id: '3', product: 'AirPods Pro 2', customer: 'Lê Văn C', rating: 5, comment: 'Âm thanh cực kỳ hay, chống ồn tốt. Tai nghe nhẹ, đeo thoải mái.', date: '2025-05-20', status: 'Ẩn' },
];

export const ShopReviewsPage = () => {
  const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <div className="shop-reviews-page">
      <Breadcrumb />
      <h1 className="page-heading">Quản Lý Đánh Giá</h1>
      <div className="card mb-4">
        <div className="reviews-stats">
          <div className="reviews-stats__score">
            <span className="reviews-stats__number">{avgRating}</span>
            <span className="reviews-stats__max">/5</span>
            <div className="reviews-stats__stars">{'★'.repeat(5)}</div>
          </div>
          <div className="reviews-stats__bars">
            {[5, 4, 3, 2, 1].map(n => (
              <div key={n} className="reviews-stats__bar">
                <span>{n}★</span>
                <div className="reviews-stats__bar-fill" style={{ width: `${(REVIEWS.filter(r => r.rating === n).length / REVIEWS.length) * 100}%` }} />
                <span>{REVIEWS.filter(r => r.rating === n).length}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="card">
        <div className="reviews-table">
          <div className="reviews-table__head"><span>Sản phẩm</span><span>Khách hàng</span><span>Đánh giá</span><span>Nhận xét</span><span>Ngày</span><span>Trạng thái</span><span></span></div>
          {REVIEWS.map(r => (
            <div key={r.id} className="reviews-table__row">
              <span className="reviews-table__product">{r.product}</span>
              <span className="reviews-table__customer">{r.customer}</span>
              <span className="reviews-table__stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              <span className="reviews-table__comment">{r.comment}</span>
              <span className="reviews-table__date">{new Date(r.date).toLocaleDateString('vi-VN')}</span>
              <span className={`badge ${r.status === 'Hiển thị' ? 'badge-success' : 'badge-secondary'}`}>{r.status}</span>
              <button className="btn btn-sm btn-outline">{r.status === 'Hiển thị' ? 'Ẩn' : 'Hiện'}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
