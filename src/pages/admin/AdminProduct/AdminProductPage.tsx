import { useState } from 'react';
import { useAdmin } from '../../../contexts/AdminContext';
import { AdminDataTable } from '../../../components/admin/AdminDataTable';
import { MOCK_PRODUCTS } from '../../../data/products';
import type { Product } from '../../../types';
import { formatNumber } from '../../../utils';
import './AdminProductPage.css';

const STATUS_OPTIONS = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Còn hàng', value: 'instock' },
  { label: 'Hết hàng', value: 'outofstock' },
  { label: 'Hot', value: 'hot' },
  { label: 'Mới', value: 'new' },
];

export const AdminProductPage = () => {
  const { reviews } = useAdmin();
  const [filter, setFilter] = useState('all');

  const productsWithReviewCount = MOCK_PRODUCTS.slice(0, 300).map((p) => ({
    ...p,
    reviewCount: reviews.filter(r => r.productId === p.id).length,
  }));

  const filtered = filter === 'all' ? productsWithReviewCount :
    filter === 'instock' ? productsWithReviewCount.filter(p => p.stock > 0) :
    filter === 'outofstock' ? productsWithReviewCount.filter(p => p.stock === 0) :
    filter === 'hot' ? productsWithReviewCount.filter(p => p.isHot) :
    productsWithReviewCount.filter(p => p.isNew);

  const columns = [
    {
      key: 'name', label: 'Sản phẩm', sortable: true,
      render: (_: unknown, r: Product) => (
        <div className="product-cell">
          <img src={(r as Product).images[0]} alt="" className="product-thumb" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48'; }} />
          <div>
            <p className="product-name">{(r as Product).name}</p>
            <p className="product-brand">{r.brand}</p>
          </div>
        </div>
      ),
    },
    { key: 'categoryName', label: 'Danh mục', width: '130px',
      render: (_: unknown, r: Product) => <span className="badge badge-secondary">{(r as Product).categoryName}</span>,
    },
    { key: 'price', label: 'Giá', sortable: true, align: 'right' as const, width: '140px',
      render: (_: unknown, r: Product) => (
        <div className="product-price-cell">
          <span className="product-price">{formatNumber((r as Product).price)}đ</span>
          {(r as Product).discount > 0 && (
            <span className="product-discount">-{r.discount}%</span>
          )}
        </div>
      ),
    },
    { key: 'stock', label: 'Tồn kho', sortable: true, align: 'center' as const, width: '90px',
      render: (_: unknown, r: Product) => (
        <span className={(r as Product).stock === 0 ? 'text-danger' : (r as Product).stock < 10 ? 'text-warning' : ''}>
          {(r as Product).stock}
        </span>
      ),
    },
    { key: 'sold', label: 'Đã bán', sortable: true, align: 'center' as const, width: '90px',
      render: (_: unknown, r: Product) => <span>{(r as Product).sold.toLocaleString()}</span>,
    },
    {
      key: 'rating', label: 'Đánh giá', align: 'center' as const, width: '130px',
      render: (_: unknown, r: Product) => (
        <div className="product-rating">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <span className="rating-value">{(r as Product).rating.toFixed(1)}</span>
          <span className="rating-count">({(r as Product).reviewCount})</span>
        </div>
      ),
    },
    {
      key: 'isHot', label: 'Trạng thái', align: 'center' as const, width: '120px',
      render: (_: unknown, r: Product) => {
        if (r.isHot) return <span className="badge badge-danger">🔥 Hot</span>;
        if (r.isNew) return <span className="badge badge-accent">✨ Mới</span>;
        if (r.isFeatured) return <span className="badge badge-primary">⭐ Nổi bật</span>;
        return <span className="badge badge-secondary">Bình thường</span>;
      },
    },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Quản Lý Sản Phẩm</h1>
          <p className="admin-page__subtitle">Kiểm duyệt và quản lý các sản phẩm trên toàn hệ thống</p>
        </div>
        <div className="admin-page-header__actions">
          <span className="admin-page__meta">{formatNumber(filtered.length)} sản phẩm</span>
          <button className="btn btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Thêm sản phẩm
          </button>
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
          searchableFields={['name', 'brand', 'categoryName']}
          actions={() => (
            <>
              <button className="btn btn-sm btn-secondary">Chi tiết</button>
              <button className="btn btn-sm btn-outline">Sửa</button>
            </>
          )}
          emptyText="Không có sản phẩm nào"
        />
      </div>
    </div>
  );
};
