import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumb } from '../../../components/breadcrumb';
import { BackToTop } from '../../../components/common/BackToTop';
import { ProductGrid } from '../../../components/product/ProductGrid';
import { ProductFilter } from '../../../components/product/ProductFilter';
import { ProductSort } from '../../../components/product/ProductSort';
import { Pagination } from '../../../components/product/Pagination';
import { mockApi } from '../../../services';
import type { Product } from '../../../types';
import './ProductListPage.css';

const CATEGORIES = [
  { name: 'Điện thoại', slug: 'dien-thoai', count: 25 },
  { name: 'Laptop', slug: 'laptop', count: 25 },
  { name: 'PC Gaming', slug: 'pc-gaming', count: 15 },
  { name: 'Màn hình', slug: 'man-hinh', count: 15 },
  { name: 'Chuột', slug: 'chuot', count: 10 },
  { name: 'Bàn phím', slug: 'ban-phim', count: 10 },
  { name: 'Tai nghe', slug: 'tai-nghe', count: 8 },
];

const BRANDS = [
  { name: 'Apple', count: 25 }, { name: 'Samsung', count: 20 }, { name: 'ASUS', count: 18 },
  { name: 'MSI', count: 12 }, { name: 'Logitech', count: 15 }, { name: 'Razer', count: 10 },
  { name: 'Corsair', count: 12 }, { name: 'Dell', count: 8 }, { name: 'HP', count: 6 },
  { name: 'Lenovo', count: 7 }, { name: 'Acer', count: 8 }, { name: 'Xiaomi', count: 5 },
];

export const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterOpen, setFilterOpen] = useState(false);

  const page = parseInt(searchParams.get('page') || '1');
  const sort = searchParams.get('sort') || 'bestseller';
  const search = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const brand = searchParams.get('brand') || '';

  const pageSize = 20;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const sortMap: Record<string, string> = {
        bestseller: 'sold', newest: 'newest', 'price-asc': 'price',
        'price-desc': 'price', rating: 'rating',
      };
      const orderMap: Record<string, 'asc' | 'desc'> = {
        'price-asc': 'asc', 'price-desc': 'desc',
      };
      const result = await mockApi.getProducts({
        search: search || undefined,
        categoryId: category || undefined,
        brand: brand || undefined,
        sort: sortMap[sort] || 'sold',
        order: orderMap[sort] || 'desc',
        page,
        pageSize,
      });
      setProducts(result.products);
      setTotal(result.total);
      setLoading(false);
    };
    load();
  }, [search, category, brand, sort, page]);

  const totalPages = Math.ceil(total / pageSize);

  const handleSortChange = (newSort: string) => {
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      p.set('sort', newSort);
      p.set('page', '1');
      return p;
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      p.set('page', String(newPage));
      return p;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeCategoryName = CATEGORIES.find(c => c.slug === category)?.name || 'Tất cả sản phẩm';

  return (
    <div className="container">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: search ? `Tìm kiếm: "${search}"` : activeCategoryName },
        ]}
      />

      <div className="product-list-page">
        <div className="product-list-page__header">
          <h1 className="product-list-page__title">
            {search ? `Kết quả tìm kiếm: "${search}"` : activeCategoryName}
          </h1>
          <button
            className="product-list-page__filter-toggle"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="16" y2="12"/><line x1="4" y1="18" x2="12" y2="18"/>
            </svg>
            Bộ lọc
          </button>
        </div>

        <div className="product-list-page__layout">
          <div className={`product-list-page__sidebar ${filterOpen ? 'open' : ''}`}>
            <ProductFilter
              brands={BRANDS}
              categories={CATEGORIES}
              onFilterChange={(filters) => {
                setSearchParams(prev => {
                  const p = new URLSearchParams(prev);
                  p.set('brand', filters.brands.join(','));
                  p.set('page', '1');
                  return p;
                });
              }}
              onReset={() => {
                setSearchParams(prev => {
                  const p = new URLSearchParams(prev);
                  p.delete('brand');
                  p.set('page', '1');
                  return p;
                });
              }}
            />
          </div>

          <div className="product-list-page__main">
            <ProductSort
              sort={sort}
              total={total}
              viewMode={viewMode}
              onSortChange={handleSortChange}
              onViewModeChange={setViewMode}
            />

            <ProductGrid products={products} viewMode={viewMode} loading={loading} />

            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  );
};
