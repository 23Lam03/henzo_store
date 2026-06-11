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

// Map category slug → categoryId used in MOCK_PRODUCTS
const CATEGORY_SLUG_TO_ID: Record<string, string> = {
  'dien-thoai': 'cat-phone',
  'laptop': 'cat-laptop',
  'pc-gaming': 'cat-pc',
  'man-hinh': 'cat-monitor',
  'chuot': 'cat-mouse',
  'ban-phim': 'cat-keyboard',
  'tai-nghe': 'cat-headphone',
};

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

  // Read all filter params from URL
  const brandsParam = searchParams.get('brands') || '';
  const categoriesParam = searchParams.get('categories') || '';
  const priceMinParam = searchParams.get('priceMin');
  const priceMaxParam = searchParams.get('priceMax');
  const ratingParam = searchParams.get('rating');
  const inStockParam = searchParams.get('inStock');
  const hasDiscountParam = searchParams.get('hasDiscount');

  const activeBrands = brandsParam ? brandsParam.split(',').filter(Boolean) : [];
  const activeCategories = categoriesParam ? categoriesParam.split(',').filter(Boolean) : [];
  const activePriceMin = priceMinParam ? parseInt(priceMinParam) : undefined;
  const activePriceMax = priceMaxParam ? parseInt(priceMaxParam) : 200000000;
  const activeRating = ratingParam ? parseInt(ratingParam) : 0;
  const activeInStock = inStockParam === '1';
  const activeHasDiscount = hasDiscountParam === '1';

  const pageSize = 20;

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      // Build list of categoryIds from slug list
      const categoryIds = activeCategories
        .map(slug => CATEGORY_SLUG_TO_ID[slug])
        .filter(Boolean);

      // When multiple categories are selected, fetch from each then merge
      let results: Product[] = [];

      if (categoryIds.length > 0) {
        const responses = await Promise.all(
          categoryIds.map(catId =>
            mockApi.getProducts({
              search: search || undefined,
              categoryId: catId,
              brand: activeBrands.length === 1 ? activeBrands[0] : undefined,
              minPrice: activePriceMin,
              maxPrice: activePriceMax,
              rating: activeRating || undefined,
              inStock: activeInStock || undefined,
              sort: sort,
              order: sort === 'price-asc' ? 'asc' : sort === 'price-desc' ? 'desc' : undefined,
              page: 1,
              pageSize: 500,
            })
          )
        );
        const combined = responses.flatMap(r => r.products);
        const seen = new Set<string>();
        results = combined.filter(p => {
          if (seen.has(p.id)) return false;
          seen.add(p.id);
          // Cross-filter by remaining single brand
          if (activeBrands.length > 1) {
            const match = activeBrands.some(b => p.brand.toLowerCase() === b.toLowerCase());
            if (!match) return false;
          }
          return true;
        });
      } else {
        // No category filter — search across all
        const res = await mockApi.getProducts({
          search: search || undefined,
          brand: activeBrands.length === 1 ? activeBrands[0] : undefined,
          minPrice: activePriceMin,
          maxPrice: activePriceMax,
          rating: activeRating || undefined,
          inStock: activeInStock || undefined,
          sort: sort,
          order: sort === 'price-asc' ? 'asc' : sort === 'price-desc' ? 'desc' : undefined,
          page: 1,
          pageSize: 500,
        });
        results = res.products;

        // Multi-brand filter
        if (activeBrands.length > 1) {
          results = results.filter(p =>
            activeBrands.some(b => p.brand.toLowerCase() === b.toLowerCase())
          );
        }
      }

      // hasDiscount filter (not in mockApi)
      if (activeHasDiscount) {
        results = results.filter(p => p.discount > 0);
      }

      setTotal(results.length);

      // Sort locally
      const sorted = [...results];
      switch (sort) {
        case 'price-asc': sorted.sort((a, b) => a.price - b.price); break;
        case 'price-desc': sorted.sort((a, b) => b.price - a.price); break;
        case 'rating': sorted.sort((a, b) => b.rating - a.rating); break;
        case 'newest': sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
        default: sorted.sort((a, b) => b.sold - a.sold);
      }

      setProducts(sorted.slice((page - 1) * pageSize, page * pageSize));
      setLoading(false);
    };
    load();
  }, [search, activeCategories.join(','), activeBrands.join(','), activePriceMin, activePriceMax, activeRating, activeInStock, activeHasDiscount, sort, page]);

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

  const activeCategoryName = CATEGORIES.find(c => c.slug === searchParams.get('category'))?.name || 'Tất cả sản phẩm';

  const updateFilters = (patch: Record<string, string | null>) => {
    setSearchParams(prev => {
      const p = new URLSearchParams(prev);
      for (const [key, value] of Object.entries(patch)) {
        if (value === null || value === '') {
          p.delete(key);
        } else {
          p.set(key, value);
        }
      }
      p.set('page', '1');
      return p;
    });
  };

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
                updateFilters({
                  brands: filters.brands.join(',') || null,
                  categories: filters.categories.join(',') || null,
                  priceMin: filters.priceRange[0] > 0 ? String(filters.priceRange[0]) : null,
                  priceMax: filters.priceRange[1] < 200000000 ? String(filters.priceRange[1]) : null,
                  rating: filters.rating > 0 ? String(filters.rating) : null,
                  inStock: filters.inStock ? '1' : null,
                  hasDiscount: filters.hasDiscount ? '1' : null,
                });
              }}
              onReset={() => {
                updateFilters({
                  brands: null,
                  categories: null,
                  priceMin: null,
                  priceMax: null,
                  rating: null,
                  inStock: null,
                  hasDiscount: null,
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
