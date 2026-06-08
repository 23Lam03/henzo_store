import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useOrder, useReview } from '../../../contexts';
import { ROUTES } from '../../../constants/routes';
import './OrderHistoryPage.css';

type ReviewFormState = {
  orderId: string;
  productId: string;
  productName: string;
  productImage: string;
};

const fmt = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(p);

const STATUS_LABELS: Record<string, string> = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  processing: 'Đang xử lý',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
};

const STATUS_CLASSES: Record<string, string> = {
  pending: 'badge-warning',
  confirmed: 'badge-primary',
  processing: 'badge-accent',
  shipping: 'badge-accent',
  delivered: 'badge-success',
  cancelled: 'badge-danger',
};

export const OrderHistoryPage = () => {
  const { user } = useAuth();
  const { orders } = useOrder();
  const { createReview, hasReviewedProduct } = useReview();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [reviewTarget, setReviewTarget] = useState<ReviewFormState | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const filtered = orders.filter(order => {
    if (filter !== 'all' && order.status !== filter) return false;
    if (search && !order.orderNumber.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const filterBtns = [
    { id: 'all', label: 'Tất cả' },
    { id: 'pending', label: 'Chờ xác nhận' },
    { id: 'confirmed', label: 'Đã xác nhận' },
    { id: 'shipping', label: 'Đang giao' },
    { id: 'delivered', label: 'Đã giao' },
    { id: 'cancelled', label: 'Đã hủy' },
  ];

  const openReview = (orderId: string, productId: string, productName: string, productImage: string) => {
    setReviewTarget({ orderId, productId, productName, productImage });
    setRating(5);
    setComment('');
  };

  const submitReview = () => {
    if (!reviewTarget || !comment.trim()) return;

    createReview({
      orderId: reviewTarget.orderId,
      productId: reviewTarget.productId,
      productName: reviewTarget.productName,
      productImage: reviewTarget.productImage,
      userId: user?.id || 'user-1',
      userName: user?.name || 'Khách hàng',
      userAvatar: user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=henzo-customer',
      rating,
      comment,
    });

    setReviewTarget(null);
    setComment('');
    setRating(5);
  };

  return (
    <div className="order-history-page">
      <div className="container">
        <h1 className="order-history-page__title">Lịch sử đơn hàng</h1>

        <div className="order-history-filters">
          <div className="order-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" placeholder="Tìm theo mã đơn hàng..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="order-filter-tabs">
            {filterBtns.map(btn => (
              <button key={btn.id} className={`filter-tab ${filter === btn.id ? 'active' : ''}`} onClick={() => setFilter(btn.id)}>
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="order-history-empty">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            <p>Không có đơn hàng nào.</p>
          </div>
        ) : (
          <div className="order-list">
            {filtered.map(order => {
              const firstProduct = order.items[0]?.product;
              const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0) || 1;
              const reviewDisabled = !firstProduct || hasReviewedProduct(order.id, firstProduct.id);

              return (
                <div key={order.id} className="order-card card">
                  <div className="order-card__header">
                    <div className="order-card__info">
                      <span className="order-card__num">{order.orderNumber}</span>
                      <span className="order-card__date">
                        Đặt ngày {new Date(order.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="order-card__meta">
                      <span className={`badge ${STATUS_CLASSES[order.status]}`}>{STATUS_LABELS[order.status]}</span>
                      <span className="order-card__items">{totalItems} sản phẩm</span>
                    </div>
                  </div>
                  <div className="order-card__footer">
                    <span className="order-card__total">
                      Tổng: <strong>{fmt(order.totalPrice)}</strong>
                    </span>
                    <div className="order-card__actions">
                      <Link to={ROUTES.ORDER_DETAIL.replace(':id', order.id)} className="btn btn-secondary btn-sm">Chi tiết</Link>
                      {order.status === 'delivered' && firstProduct && (
                        <button className="btn btn-outline btn-sm" onClick={() => openReview(order.id, firstProduct.id, firstProduct.name, firstProduct.images[0])} disabled={reviewDisabled}>
                          {reviewDisabled ? 'Đã đánh giá' : 'Đánh giá'}
                        </button>
                      )}
                      {order.status === 'shipping' && (
                        <Link to={ROUTES.ORDER_TRACKING.replace(':id', order.id)} className="btn btn-primary btn-sm">Theo dõi</Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {reviewTarget && (
        <div className="admin-modal-overlay" onClick={() => setReviewTarget(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 560 }}>
            <div className="admin-modal__header">
              <h3 className="admin-modal__title">Đánh giá sản phẩm</h3>
              <button className="admin-modal__close" onClick={() => setReviewTarget(null)}>×</button>
            </div>
            <div className="admin-modal__body">
              <p style={{ marginBottom: 12 }}>Sản phẩm: <strong>{reviewTarget.productName}</strong></p>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <button key={i} type="button" className="btn btn-ghost btn-sm" onClick={() => setRating(i + 1)}>
                    <span style={{ color: i < rating ? '#F59E0B' : '#CBD5E1', fontSize: 20 }}>★</span>
                  </button>
                ))}
              </div>
              <textarea className="input" rows={5} placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..." value={comment} onChange={e => setComment(e.target.value)} />
            </div>
            <div className="admin-modal__footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 20 }}>
              <button className="btn btn-secondary" onClick={() => setReviewTarget(null)}>Hủy</button>
              <button className="btn btn-primary" onClick={submitReview} disabled={!comment.trim()}>Gửi đánh giá</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
