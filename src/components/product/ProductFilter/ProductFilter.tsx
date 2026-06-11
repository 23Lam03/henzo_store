import { useState } from 'react';
import './ProductFilter.css';

interface FilterState {
  brands: string[];
  categories: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
  hasDiscount: boolean;
}

interface ProductFilterProps {
  brands: { name: string; count: number }[];
  categories: { name: string; slug: string; count: number }[];
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

const SECTIONS = [
  {
    key: 'category',
    title: 'Danh mục',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    key: 'brand',
    title: 'Thương hiệu',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    key: 'price',
    title: 'Khoảng giá',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    key: 'rating',
    title: 'Đánh giá',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    key: 'other',
    title: 'Lựa chọn khác',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v3m0 14v3M2 12h3m14 0h3"/>
      </svg>
    ),
  },
] as const;

const PRICE_RANGES = [
  { label: 'Tất cả', min: 0, max: 200000000 },
  { label: 'Dưới 5 triệu', min: 0, max: 5000000 },
  { label: '5 - 15 triệu', min: 5000000, max: 15000000 },
  { label: '15 - 30 triệu', min: 15000000, max: 30000000 },
  { label: '30 - 50 triệu', min: 30000000, max: 50000000 },
  { label: 'Trên 50 triệu', min: 50000000, max: 200000000 },
];

export const ProductFilter = ({ brands, categories, onFilterChange, onReset }: ProductFilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    categories: [],
    priceRange: [0, 200000000],
    rating: 0,
    inStock: false,
    hasDiscount: false,
  });

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const applyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    applyFilters({ ...filters, brands: next });
  };

  const toggleCategory = (slug: string) => {
    const next = filters.categories.includes(slug)
      ? filters.categories.filter(c => c !== slug)
      : [...filters.categories, slug];
    applyFilters({ ...filters, categories: next });
  };

  const activeCount =
    filters.brands.length +
    filters.categories.length +
    (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 200000000 ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.hasDiscount ? 1 : 0);

  const toggleSection = (key: string) => {
    setCollapsed(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const resetAll = () => {
    setFilters({ brands: [], categories: [], priceRange: [0, 200000000], rating: 0, inStock: false, hasDiscount: false });
    onReset();
  };

  return (
    <aside className="product-filter">
      <div className="product-filter__header">
        <h3 className="product-filter__title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="4" y1="12" x2="16" y2="12"/>
            <line x1="4" y1="18" x2="12" y2="18"/>
          </svg>
          Bộ lọc
          {activeCount > 0 && (
            <span className="product-filter__active-badge">{activeCount}</span>
          )}
        </h3>
        <button className="product-filter__reset" onClick={resetAll}>
          Đặt lại
        </button>
      </div>

      {/* ─── Danh mục ──────────────────────────────────────────────── */}
      <div className="product-filter__section">
        <div
          className={`product-filter__section-header ${collapsed.category ? 'collapsed' : ''}`}
          onClick={() => toggleSection('category')}
        >
          <h4 className="product-filter__section-title">
            {SECTIONS[0].icon}
            {SECTIONS[0].title}
          </h4>
          <svg className="product-filter__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
        <div className={`product-filter__section-body ${collapsed.category ? 'collapsed' : ''}`}>
          <div className="product-filter__list">
            {categories.map(cat => (
              <label
                key={cat.slug}
                className={`product-filter__item ${filters.categories.includes(cat.slug) ? 'active' : ''}`}
                onClick={() => toggleCategory(cat.slug)}
              >
                <div className="product-filter__checkbox-wrapper">
                  <input
                    type="checkbox"
                    className="product-filter__checkbox"
                    checked={filters.categories.includes(cat.slug)}
                    onChange={() => toggleCategory(cat.slug)}
                    onClick={e => e.stopPropagation()}
                  />
                  <div className="product-filter__checkbox-custom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                </div>
                <span className="product-filter__label">{cat.name}</span>
                <span className="product-filter__count">{cat.count}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Thương hiệu ───────────────────────────────────────────── */}
      <div className="product-filter__section">
        <div
          className={`product-filter__section-header ${collapsed.brand ? 'collapsed' : ''}`}
          onClick={() => toggleSection('brand')}
        >
          <h4 className="product-filter__section-title">
            {SECTIONS[1].icon}
            {SECTIONS[1].title}
          </h4>
          <svg className="product-filter__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
        <div className={`product-filter__section-body ${collapsed.brand ? 'collapsed' : ''}`}>
          <div className="product-filter__list">
            {brands.map(brand => (
              <label
                key={brand.name}
                className={`product-filter__item ${filters.brands.includes(brand.name) ? 'active' : ''}`}
                onClick={() => toggleBrand(brand.name)}
              >
                <div className="product-filter__checkbox-wrapper">
                  <input
                    type="checkbox"
                    className="product-filter__checkbox"
                    checked={filters.brands.includes(brand.name)}
                    onChange={() => toggleBrand(brand.name)}
                    onClick={e => e.stopPropagation()}
                  />
                  <div className="product-filter__checkbox-custom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                </div>
                <span className="product-filter__label">{brand.name}</span>
                <span className="product-filter__count">{brand.count}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Khoảng giá ────────────────────────────────────────────── */}
      <div className="product-filter__section">
        <div
          className={`product-filter__section-header ${collapsed.price ? 'collapsed' : ''}`}
          onClick={() => toggleSection('price')}
        >
          <h4 className="product-filter__section-title">
            {SECTIONS[2].icon}
            {SECTIONS[2].title}
          </h4>
          <svg className="product-filter__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
        <div className={`product-filter__section-body ${collapsed.price ? 'collapsed' : ''}`}>
          <div className="product-filter__price-list">
            {PRICE_RANGES.map(pr => (
              <button
                key={pr.label}
                className={`product-filter__price-btn ${
                  filters.priceRange[0] === pr.min && filters.priceRange[1] === pr.max ? 'active' : ''
                }`}
                onClick={() => applyFilters({ ...filters, priceRange: [pr.min, pr.max] })}
              >
                {pr.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Đánh giá ──────────────────────────────────────────────── */}
      <div className="product-filter__section">
        <div
          className={`product-filter__section-header ${collapsed.rating ? 'collapsed' : ''}`}
          onClick={() => toggleSection('rating')}
        >
          <h4 className="product-filter__section-title">
            {SECTIONS[3].icon}
            {SECTIONS[3].title}
          </h4>
          <svg className="product-filter__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
        <div className={`product-filter__section-body ${collapsed.rating ? 'collapsed' : ''}`}>
          <div className="product-filter__rating-list">
            {[4, 3, 2, 1].map(stars => (
              <label
                key={stars}
                className={`product-filter__rating-item ${filters.rating === stars ? 'active' : ''}`}
                onClick={() => applyFilters({ ...filters, rating: filters.rating === stars ? 0 : stars })}
              >
                <div className="product-filter__radio-wrapper">
                  <input
                    type="radio"
                    className="product-filter__radio"
                    name="rating-filter"
                    checked={filters.rating === stars}
                    onChange={() => applyFilters({ ...filters, rating: filters.rating === stars ? 0 : stars })}
                    onClick={e => e.stopPropagation()}
                  />
                  <div className="product-filter__radio-custom" />
                </div>
                <div className="product-filter__stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < stars ? '#F59E0B' : '#E5E7EB'}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  ))}
                </div>
                <span className="product-filter__rating-text">Từ {stars} sao trở lên</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Lựa chọn khác ─────────────────────────────────────────── */}
      <div className="product-filter__section">
        <div
          className={`product-filter__section-header ${collapsed.other ? 'collapsed' : ''}`}
          onClick={() => toggleSection('other')}
        >
          <h4 className="product-filter__section-title">
            {SECTIONS[4].icon}
            {SECTIONS[4].title}
          </h4>
          <svg className="product-filter__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
        <div className={`product-filter__section-body ${collapsed.other ? 'collapsed' : ''}`}>
          <div className="product-filter__toggles">
            <label
              className={`product-filter__toggle-item ${filters.inStock ? 'active' : ''}`}
              onClick={() => applyFilters({ ...filters, inStock: !filters.inStock })}
            >
              <div className="product-filter__toggle-wrapper">
                <input
                  type="checkbox"
                  className="product-filter__toggle"
                  checked={filters.inStock}
                  onChange={() => applyFilters({ ...filters, inStock: !filters.inStock })}
                  onClick={e => e.stopPropagation()}
                />
                <div className="product-filter__toggle-track" />
              </div>
              <span>Chỉ hiển thị sản phẩm còn hàng</span>
            </label>
            <label
              className={`product-filter__toggle-item ${filters.hasDiscount ? 'active' : ''}`}
              onClick={() => applyFilters({ ...filters, hasDiscount: !filters.hasDiscount })}
            >
              <div className="product-filter__toggle-wrapper">
                <input
                  type="checkbox"
                  className="product-filter__toggle"
                  checked={filters.hasDiscount}
                  onChange={() => applyFilters({ ...filters, hasDiscount: !filters.hasDiscount })}
                  onClick={e => e.stopPropagation()}
                />
                <div className="product-filter__toggle-track" />
              </div>
              <span>Chỉ hiển thị sản phẩm giảm giá</span>
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
};
