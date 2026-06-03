import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../../../components/breadcrumb';
import { mockApi } from '../../../services';
import type { Product } from '../../../types';
import './ShopProductListPage.css';

export const ShopProductListPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    mockApi.getProducts({ pageSize: 50 }).then(data => {
      setProducts(data.products);
      setLoading(false);
    });
  }, []);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    if (filterStatus === 'out-of-stock') return matchSearch && p.stock === 0;
    if (filterStatus === 'low-stock') return matchSearch && p.stock > 0 && p.stock < 10;
    return matchSearch;
  });

  const pageSize = 10;
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleStatus = (id: string) => setProducts(prev => prev.map(p => p.id === id ? { ...p, isFeatured: !p.isFeatured } : p));

  return (
    <div className="shop-product-list-page">
      <Breadcrumb />
      <div className="shop-product-list-page__header">
        <div>
          <h1 className="shop-product-list-page__title">Quản Lý Sản Phẩm</h1>
          <p className="shop-product-list-page__subtitle">{products.length} sản phẩm</p>
        </div>
        <Link to="/shop/products/post" className="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Thêm sản phẩm mới
        </Link>
      </div>

      <div className="card">
        <div className="shop-product-list-page__toolbar">
          <div className="input-group" style={{ marginBottom: 0, flex: 1 }}>
            <input
              type="text"
              className="input"
              placeholder="Tìm kiếm sản phẩm..."
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <select className="input" style={{ width: 'auto' }} value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }}>
            <option value="all">Tất cả ({products.length})</option>
            <option value="out-of-stock">Hết hàng ({products.filter(p => p.stock === 0).length})</option>
            <option value="low-stock">Sắp hết ({products.filter(p => p.stock > 0 && p.stock < 10).length})</option>
          </select>
        </div>

        <div className="shop-product-table">
          <div className="shop-product-table__head">
            <span>Sản phẩm</span>
            <span>Danh mục</span>
            <span>Giá</span>
            <span>Tồn kho</span>
            <span>Đã bán</span>
            <span>Trạng thái</span>
            <span>Thao tác</span>
          </div>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="shop-product-table__row">
                {Array.from({ length: 7 }).map((_, j) => (
                  <div key={j} className="skeleton" style={{ height: 40, borderRadius: 8 }} />
                ))}
              </div>
            ))
          ) : paginated.length === 0 ? (
            <div className="empty-state" style={{ padding: 'var(--space-8)' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <h3>Không tìm thấy sản phẩm</h3>
            </div>
          ) : paginated.map(product => (
            <div key={product.id} className="shop-product-table__row">
              <div className="shop-product-table__product">
                <img src={product.images[0]} alt={product.name} className="shop-product-table__img" loading="lazy" />
                <div>
                  <p className="shop-product-table__name">{product.name}</p>
                  <p className="shop-product-table__brand">{product.brand}</p>
                </div>
              </div>
              <span className="shop-product-table__category">{product.categoryName}</span>
              <div className="shop-product-table__price">
                <span className="shop-product-table__current-price">{product.price.toLocaleString('vi-VN')}đ</span>
                {product.originalPrice > product.price && (
                  <span className="shop-product-table__original-price">{product.originalPrice.toLocaleString('vi-VN')}đ</span>
                )}
              </div>
              <span className={`shop-product-table__stock ${product.stock === 0 ? 'out-of-stock' : product.stock < 10 ? 'low-stock' : ''}`}>
                {product.stock === 0 ? 'Hết hàng' : product.stock < 10 ? `Còn ${product.stock}` : product.stock}
              </span>
              <span className="shop-product-table__sold">{product.sold}</span>
              <button
                className={`btn btn-sm ${product.isFeatured ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => toggleStatus(product.id)}
              >
                {product.isFeatured ? 'Nổi bật' : 'Bình thường'}
              </button>
              <div className="shop-product-table__actions">
                <Link to={`/shop/products/edit/${product.id}`} className="btn btn-sm btn-outline">Sửa</Link>
                <Link to={`/products/${product.slug}`} target="_blank" className="btn btn-sm btn-outline">Xem</Link>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination-wrapper">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
