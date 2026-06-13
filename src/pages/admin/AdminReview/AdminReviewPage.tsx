import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../../../contexts/AdminContext';
import { AdminDataTable } from '../../../components/admin/AdminDataTable';
import { MOCK_PRODUCTS } from '../../../data/products';
import type { Review } from '../../../types';
import { useToast } from '../../../contexts';
import { ConfirmModal } from '../../../components/common/ConfirmModal';
import './AdminReviewPage.css';

const STATUS_OPTIONS = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Hiển thị', value: 'visible' },
  { label: 'Đã ẩn', value: 'hidden' },
];

const renderStars = (rating: number) => (
  <div className="admin-stars">
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < rating ? '#F59E0B' : 'none'} stroke="#F59E0B" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
);

export const AdminReviewPage = () => {
  const { reviews } = useAdmin();
  const toast = useToast();
  const [filter, setFilter] = useState('all');
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(new Set());
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const enrichedReviews = reviews.map(r => ({
    ...r,
    productName: MOCK_PRODUCTS[parseInt(r.productId.replace('product-', ''), 10)]?.name || `Sản phẩm #${r.productId}`,
    storeName: ['Henzo Tech Store', 'TechPro Shop', 'Apple House', 'Samsung World', 'GameZone Store'][Math.floor(Math.random() * 5)],
    isHidden: hiddenIds.has(r.id),
  }));

  const filtered = filter === 'all' ? enrichedReviews :
    filter === 'visible' ? enrichedReviews.filter(r => !r.isHidden) :
    enrichedReviews.filter(r => r.isHidden);

  const columns = [
    {
      key: 'productName', label: 'Sản phẩm', sortable: true,
      render: (_: unknown, r: Review & { productName: string; storeName: string; isHidden: boolean }) => (
        <div className="review-product-cell">
          <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${(r as Review).productId}`} alt="" className="review-product-img" />
          <div>
            <p className="review-product-name">{(r as Review & { productName: string }).productName}</p>
            <p className="review-shop-name">{(r as Review & { storeName: string }).storeName}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'userName', label: 'Khách hàng',
      render: (_: unknown, r: Review) => (
        <div className="review-customer">
          <img src={(r as Review).userAvatar} alt="" className="admin-avatar admin-avatar--sm" />
          <span className="review-customer-name">{(r as Review).userName}</span>
          {(r as Review).isVerified && <span className="verified-badge">✓ Đã mua</span>}
        </div>
      ),
    },
    {
      key: 'rating', label: 'Đánh giá', sortable: true, align: 'center' as const, width: '130px',
      render: (_: unknown, r: Review) => (
        <div className="review-rating-cell">
          {renderStars((r as Review).rating)}
          <span className="review-rating-num">{(r as Review).rating}/5</span>
        </div>
      ),
    },
    { key: 'comment', label: 'Nhận xét',
      render: (_: unknown, r: Review) => (
        <span className="review-comment">{(r as Review).comment}</span>
      ),
    },
    { key: 'createdAt', label: 'Ngày', sortable: true, width: '100px',
      render: (_: unknown, r: Review) => new Date((r as Review).createdAt).toLocaleDateString('vi-VN'),
    },
    {
      key: 'isHidden', label: 'Trạng thái', align: 'center' as const, width: '110px',
      render: (_: unknown, r: Review & { isHidden: boolean }) => (
        <span className={`admin-status ${(r as Review & { isHidden: boolean }).isHidden ? 'admin-status--locked' : 'admin-status--active'}`}>
          {(r as Review & { isHidden: boolean }).isHidden ? 'Đã ẩn' : 'Hiển thị'}
        </span>
      ),
    },
  ];

  const handleToggle = (id: string, currentlyHidden: boolean) => {
    setHiddenIds(prev => {
      const next = new Set(prev);
      if (currentlyHidden) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Quản Lý Đánh Giá</h1>
          <p className="admin-page__subtitle">Kiểm duyệt và quản lý đánh giá sản phẩm từ khách hàng</p>
        </div>
        <div className="admin-page-header__actions">
          <span className="admin-page__meta">{reviews.length} đánh giá</span>
        </div>
      </div>

      <div className="admin-section">
        <AdminDataTable
          columns={columns}
          data={filtered}
          rowKey="id"
          filterable
          filterOptions={STATUS_OPTIONS}
          currentFilter={filter}
          onFilterChange={setFilter}
          searchable
          searchableFields={['userName', 'comment', 'productName', 'storeName']}
          actions={(record) => {
            const r = record as Review & { isHidden: boolean };
            return (
              <>
                <button className="btn btn-sm btn-secondary" onClick={() => navigate(`/admin/reviews/${r.id}`)}>Chi tiết</button>
                <button
                  className={`btn btn-sm ${r.isHidden ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => handleToggle(r.id, r.isHidden)}
                >
                  {r.isHidden ? 'Hiện' : 'Ẩn'}
                </button>
                <button className="btn btn-sm btn-outline" style={{ color: 'var(--color-danger)' }} onClick={() => setPendingDelete(r.id)}>Xóa</button>
              </>
            );
          }}
          emptyText="Không có đánh giá nào"
        />

        <ConfirmModal
          open={!!pendingDelete}
          title="Xóa đánh giá"
          message="Bạn có chắc muốn xóa đánh giá này? Hành động này không thể hoàn tác."
          confirmLabel="Xóa"
          variant="danger"
          onConfirm={() => {
            if (pendingDelete) {
              handleToggle(pendingDelete, true);
              toast({ title: 'Đã xóa đánh giá', variant: 'success' });
              setPendingDelete(null);
            }
          }}
          onCancel={() => setPendingDelete(null)}
        />
      </div>
    </div>
  );
};
