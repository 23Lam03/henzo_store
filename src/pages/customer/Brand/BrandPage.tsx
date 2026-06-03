import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from '../../../components/breadcrumb';
import { BackToTop } from '../../../components/common/BackToTop';
import { ProductGrid } from '../../../components/product/ProductGrid';
import { ProductSort } from '../../../components/product/ProductSort';
import { Pagination } from '../../../components/product/Pagination';
import { mockApi } from '../../../services';
import type { Product } from '../../../types';
import './BrandPage.css';

const BRAND_DATA: Record<string, { name: string; logo: string; description: string; color: string }> = {
  apple: { name: 'Apple', logo: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200', description: 'Apple - Thương hiệu công nghệ hàng đầu thế giới với iPhone, iPad, MacBook.', color: '#1d1d1f' },
  samsung: { name: 'Samsung', logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200', description: 'Samsung - Tập đoàn điện tử lớn nhất Hàn Quốc, chuyên smartphone, TV, thiết bị gia dụng.', color: '#1428A0' },
  asus: { name: 'ASUS', logo: 'https://images.unsplash.com/photo-1601807091851-58c3b8e5e7e5?w=200', description: 'ASUS - Thương hiệu laptop, card đồ họa, linh kiện máy tính hàng đầu.', color: '#0057B8' },
  msi: { name: 'MSI', logo: 'https://images.unsplash.com/photo-1612831819720-28dc9953b6ba?w=200', description: 'MSI - Laptop gaming và bo mạch chủ hàng đầu thế giới.', color: '#E3001B' },
  logitech: { name: 'Logitech', logo: 'https://images.unsplash.com/photo-1563297007-0686b7003af7?w=200', description: 'Logitech - Thiết bị ngoại vi máy tính: chuột, bàn phím, tai nghe.', color: '#00B8FC' },
};

export const BrandPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('sold');
  const [page, setPage] = useState(1);

  const data = BRAND_DATA[slug || ''] || { name: slug || 'Thương hiệu', logo: '', description: '', color: '' };
  const pageSize = 20;

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      setLoading(true);
      const result = await mockApi.getProductsByBrand(slug, { page });
      setProducts(result.products);
      setTotal(result.total);
      setLoading(false);
    };
    load();
  }, [slug, sort, page]);

  return (
    <div className="container">
      <Breadcrumb items={[{ label: 'Trang chủ', href: '/' }, { label: 'Thương hiệu', href: '/products' }, { label: data.name }]} />

      <div className="brand-page__header">
        {data.logo && (
          <img src={data.logo} alt={data.name} className="brand-page__logo" />
        )}
        <div className="brand-page__info">
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <span className="brand-page__count">{total} sản phẩm</span>
        </div>
      </div>

      <div className="brand-page">
        <ProductSort sort={sort} total={total} viewMode="grid" onSortChange={setSort} onViewModeChange={() => {}} />
        <ProductGrid products={products} viewMode="grid" loading={loading} />
        {Math.ceil(total / pageSize) > 1 && (
          <Pagination currentPage={page} totalPages={Math.ceil(total / pageSize)} onPageChange={setPage} />
        )}
      </div>

      <BackToTop />
    </div>
  );
};
