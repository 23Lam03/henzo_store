import { useState } from 'react';
import './ProductFilter.css';

interface FilterState {
  brands: string[];
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

export const ProductFilter = ({ brands, categories, onFilterChange, onReset }: ProductFilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    priceRange: [0, 200000000] as [number, number],
    rating: 0,
    inStock: false,
    hasDiscount: false,
  });

  const applyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleBrand = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    applyFilters({ ...filters, brands: newBrands });
  };

  const priceRanges = [
    { label: 'Tất cả', min: 0, max: 200000000 },
    { label: 'Dưới 5 triệu', min: 0, max: 5000000 },
    { label: '5 - 15 triệu', min: 5000000, max: 15000000 },
    { label: '15 - 30 triệu', min: 15000000, max: 30000000 },
    { label: '30 - 50 triệu', min: 30000000, max: 50000000 },
    { label: 'Trên 50 triệu', min: 50000000, max: 200000000 },
  ];

  const handlePriceRange = (min: number, max: number) => {
    applyFilters({ ...filters, priceRange: [min, max] });
  };

  return (
    <aside className="product-filter">
      <div className="product-filter__header">
        <h3 className="product-filter__title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="16" y2="12"/><line x1="4" y1="18" x2="12" y2="18"/>
          </svg>
          Bộ lọc
        </h3>
        <button className="product-filter__reset" onClick={() => { setFilters({ brands: [], priceRange: [0, 200000000], rating: 0, inStock: false, hasDiscount: false }); onReset(); }}>
          Đặt lại
        </button>
      </div>

      <div className="product-filter__section">
        <h4 className="product-filter__section-title">Danh mục</h4>
        <div className="product-filter__list">
          {categories.map(cat => (
            <label key={cat.slug} className="product-filter__item">
              <input type="checkbox" className="product-filter__checkbox" />
              <span className="product-filter__label">{cat.name}</span>
              <span className="product-filter__count">({cat.count})</span>
            </label>
          ))}
        </div>
      </div>

      <div className="product-filter__section">
        <h4 className="product-filter__section-title">Thương hiệu</h4>
        <div className="product-filter__list">
          {brands.map(brand => (
            <label key={brand.name} className="product-filter__item">
              <input
                type="checkbox"
                className="product-filter__checkbox"
                checked={filters.brands.includes(brand.name)}
                onChange={() => toggleBrand(brand.name)}
              />
              <span className="product-filter__label">{brand.name}</span>
              <span className="product-filter__count">({brand.count})</span>
            </label>
          ))}
        </div>
      </div>

      <div className="product-filter__section">
        <h4 className="product-filter__section-title">Khoảng giá</h4>
        <div className="product-filter__price-list">
          {priceRanges.map(pr => (
            <button
              key={pr.label}
              className={`product-filter__price-btn ${filters.priceRange[0] === pr.min && filters.priceRange[1] === pr.max ? 'active' : ''}`}
              onClick={() => handlePriceRange(pr.min, pr.max)}
            >
              {pr.label}
            </button>
          ))}
        </div>
      </div>

      <div className="product-filter__section">
        <h4 className="product-filter__section-title">Đánh giá</h4>
        {[4, 3, 2, 1].map(stars => (
          <label key={stars} className="product-filter__rating-item">
            <input
              type="radio"
              name="rating"
              className="product-filter__radio"
              checked={filters.rating === stars}
              onChange={() => applyFilters({ ...filters, rating: stars })}
            />
            <div className="product-filter__stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < stars ? '#F59E0B' : '#E5E7EB'}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <span className="product-filter__rating-text">Từ {stars} sao trở lên</span>
          </label>
        ))}
      </div>

      <div className="product-filter__section">
        <label className="product-filter__toggle-item">
          <input
            type="checkbox"
            className="product-filter__toggle"
            checked={filters.inStock}
            onChange={() => applyFilters({ ...filters, inStock: !filters.inStock })}
          />
          <span>Chỉ hiển thị sản phẩm còn hàng</span>
        </label>
        <label className="product-filter__toggle-item">
          <input
            type="checkbox"
            className="product-filter__toggle"
            checked={filters.hasDiscount}
            onChange={() => applyFilters({ ...filters, hasDiscount: !filters.hasDiscount })}
          />
          <span>Chỉ hiển thị sản phẩm giảm giá</span>
        </label>
      </div>
    </aside>
  );
};
