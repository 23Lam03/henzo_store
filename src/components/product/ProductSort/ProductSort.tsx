import './ProductSort.css';

interface ProductSortProps {
  sort: string;
  total: number;
  viewMode: 'grid' | 'list';
  onSortChange: (sort: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const ProductSort = ({ sort, total, viewMode, onSortChange, onViewModeChange }: ProductSortProps) => {
  const sortOptions = [
    { value: 'bestseller', label: 'Bán chạy nhất' },
    { value: 'newest', label: 'Mới nhất' },
    { value: 'price-asc', label: 'Giá: Thấp → Cao' },
    { value: 'price-desc', label: 'Giá: Cao → Thấp' },
    { value: 'rating', label: 'Đánh giá cao nhất' },
  ];

  return (
    <div className="product-sort">
      <div className="product-sort__info">
        <span className="product-sort__total">{total} sản phẩm</span>
      </div>

      <div className="product-sort__controls">
        <div className="product-sort__view-toggle">
          <button
            className={`product-sort__view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => onViewModeChange('grid')}
            title="Lưới"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
            </svg>
          </button>
          <button
            className={`product-sort__view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => onViewModeChange('list')}
            title="Danh sách"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
              <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
              <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="product-sort__select-wrap">
          <label className="product-sort__label">Sắp xếp:</label>
          <select
            className="product-sort__select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <svg className="product-sort__select-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </div>
    </div>
  );
};
