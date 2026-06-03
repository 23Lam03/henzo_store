import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from '../../../components/breadcrumb';
import { BackToTop } from '../../../components/common/BackToTop';
import { ProductGrid } from '../../../components/product/ProductGrid';
import { ProductSort } from '../../../components/product/ProductSort';
import { Pagination } from '../../../components/product/Pagination';
import { mockApi } from '../../../services';
import type { Product } from '../../../types';
import './CategoryPage.css';

const CATEGORY_DATA: Record<string, { name: string; banner: string; description: string }> = {
  'dien-thoai': {
    name: 'Điện thoại', banner: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1400',
    description: 'Khám phá bộ sưu tập điện thoại thông minh mới nhất từ Apple, Samsung, Xiaomi và nhiều thương hiệu hàng đầu.'
  },
  'laptop': {
    name: 'Laptop', banner: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1400',
    description: 'Laptop gaming, laptop văn phòng, MacBook - Đáp ứng mọi nhu cầu công việc và giải trí.'
  },
  'pc-gaming': {
    name: 'PC Gaming', banner: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1400',
    description: 'PC gaming cấu hình mạnh, build tùy chỉnh, máy workstation cho render 3D và AI.'
  },
  'man-hinh': {
    name: 'Màn hình', banner: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1400',
    description: 'Màn hình OLED, Mini LED, Gaming 360Hz, màn hình thiết kế 4K - Henzo Store có tất cả.'
  },
  'chuot': {
    name: 'Chuột', banner: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1400',
    description: 'Chuột gaming wireless, chuột văn phòng không dây từ Logitech, Razer, ASUS.'
  },
  'ban-phim': {
    name: 'Bàn phím', banner: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=1400',
    description: 'Bàn phím cơ gaming, bàn phím không dây, switch tùy chọn từ các thương hiệu hàng đầu.'
  },
  'tai-nghe': {
    name: 'Tai nghe', banner: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1400',
    description: 'Tai nghe gaming wireless, tai nghe ANC, tai nghe studio cho creator.'
  },
};

export const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('sold');
  const [page, setPage] = useState(1);

  const data = CATEGORY_DATA[slug || ''] || { name: slug || 'Danh mục', banner: '', description: '' };
  const pageSize = 20;

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      setLoading(true);
      const result = await mockApi.getProductsByCategory(slug, { sort, page });
      setProducts(result.products);
      setTotal(result.total);
      setLoading(false);
    };
    load();
  }, [slug, sort, page]);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="container">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: data.name }]} />

      {data.banner && (
        <div className="category-page__banner" style={{ backgroundImage: `url(${data.banner})` }}>
          <div className="category-page__banner-overlay">
            <h1>{data.name}</h1>
            <p>{data.description}</p>
          </div>
        </div>
      )}

      <div className="category-page">
        <div className="category-page__sidebar">
          <div className="category-page__filter-group">
            <h3>Bộ lọc</h3>
            <div className="category-page__filter-section">
              <h4>Thương hiệu</h4>
              {['Apple', 'Samsung', 'ASUS', 'MSI', 'Logitech'].map(b => (
                <label key={b} className="category-page__filter-item">
                  <input type="checkbox" /> {b}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="category-page__main">
          <ProductSort sort={sort} total={total} viewMode="grid" onSortChange={setSort} onViewModeChange={() => {}} />
          <ProductGrid products={products} viewMode="grid" loading={loading} />
          {totalPages > 1 && (
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </div>
      </div>

      <BackToTop />
    </div>
  );
};
