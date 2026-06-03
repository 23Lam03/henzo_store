import { useState } from 'react';
import { Link } from 'react-router-dom';
import './OrderHistoryPage.css';

const fmt = (p: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(p);

const MOCK_ORDERS = [
  { id: 'order-1', number: 'HDN-20250603-001', date: '2025-06-03T10:00:00Z', total: 39980000, status: 'confirmed', items: 2 },
  { id: 'order-2', number: 'HDN-20250528-042', date: '2025-05-28T14:00:00Z', total: 56990000, status: 'delivered', items: 1 },
  { id: 'order-3', number: 'HDN-20250515-008', date: '2025-05-15T09:00:00Z', total: 24990000, status: 'delivered', items: 1 },
  { id: 'order-4', number: 'HDN-20250420-015', date: '2025-04-20T11:00:00Z', total: 18990000, status: 'cancelled', items: 1 },
  { id: 'order-5', number: 'HDN-20250410-003', date: '2025-04-10T08:00:00Z', total: 34990000, status: 'delivered', items: 2 },
];

const STATUS_LABELS: Record<string, string> = {
  pending: 'Chờ xác nhận', confirmed: 'Đã xác nhận', processing: 'Đang xử lý',
  shipping: 'Đang giao', delivered: 'Đã giao', cancelled: 'Đã hủy',
};

const STATUS_CLASSES: Record<string, string> = {
  pending: 'badge-warning', confirmed: 'badge-primary', processing: 'badge-accent',
  shipping: 'badge-accent', delivered: 'badge-success', cancelled: 'badge-danger',
};

export const OrderHistoryPage = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = MOCK_ORDERS.filter(o => {
    if (filter !== 'all' && o.status !== filter) return false;
    if (search && !o.number.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const filterBtns = [
    { id: 'all', label: 'Tất cả' },
    { id: 'confirmed', label: 'Đã xác nhận' },
    { id: 'shipping', label: 'Đang giao' },
    { id: 'delivered', label: 'Đã giao' },
    { id: 'cancelled', label: 'Đã hủy' },
  ];

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
            {filtered.map(order => (
              <div key={order.id} className="order-card card">
                <div className="order-card__header">
                  <div className="order-card__info">
                    <span className="order-card__num">{order.number}</span>
                    <span className="order-card__date">
                      Đặt ngày {new Date(order.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="order-card__meta">
                    <span className={`badge ${STATUS_CLASSES[order.status]}`}>{STATUS_LABELS[order.status]}</span>
                    <span className="order-card__items">{order.items} sản phẩm</span>
                  </div>
                </div>
                <div className="order-card__footer">
                  <span className="order-card__total">
                    Tổng: <strong>{fmt(order.total)}</strong>
                  </span>
                  <div className="order-card__actions">
                    <Link to={`/orders/${order.id}`} className="btn btn-secondary btn-sm">Chi tiết</Link>
                    {order.status === 'delivered' && <button className="btn btn-outline btn-sm">Đánh giá</button>}
                    {order.status === 'shipping' && <button className="btn btn-primary btn-sm">Theo dõi</button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
