import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mockApi } from '../../../services/mock/api';
import type { Product } from '../../../types';
import './HomePage.css';

const CATEGORIES = [
  { name: 'Điện thoại', icon: '📱', slug: 'dien-thoai', count: 25 },
  { name: 'Laptop', icon: '💻', slug: 'laptop', count: 20 },
  { name: 'PC Gaming', icon: '🖥️', slug: 'pc-gaming', count: 15 },
  { name: 'Màn hình', icon: '🖵', slug: 'man-hinh', count: 12 },
  { name: 'Chuột', icon: '🖱️', slug: 'chuot', count: 10 },
  { name: 'Bàn phím', icon: '⌨️', slug: 'ban-phim', count: 8 },
  { name: 'Tai nghe', icon: '🎧', slug: 'tai-nghe', count: 10 },
];

const BANNERS = [
  {
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=1400',
    title: 'iPhone 16 Series',
    subtitle: 'Giảm đến 3 triệu - Siêu phẩm công nghệ 2025',
    badge: 'Giảm 3 triệu',
  },
  {
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1400',
    title: 'Laptop Gaming',
    subtitle: 'Ưu đãi đặc biệt - Lên đến 5 triệu',
    badge: 'Hot Deal',
  },
  {
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1400',
    title: 'Phụ Kiện Gaming',
    subtitle: 'Giảm 30% chuột, bàn phím, tai nghe',
    badge: 'Flash Sale',
  },
];

const formatPrice = (p: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(p);

const StarRating = ({ rating }: { rating: number }) => (
  <div className="star-rating">
    {[1, 2, 3, 4, 5].map((s) => (
      <span key={s} className={s <= Math.round(rating) ? 'star filled' : 'star'}>★</span>
    ))}
    <span className="rating-num">{rating.toFixed(1)}</span>
  </div>
);

const ProductCard = ({ product }: { product: Product }) => (
  <Link to={`/products/${product.slug}`} className="product-card">
    <div className="product-card__image">
      <img src={product.images[0]} alt={product.name} loading="lazy" />
      {product.discount > 0 && (
        <span className="product-card__badge">-{product.discount}%</span>
      )}
      {product.isNew && <span className="product-card__new">Mới</span>}
      {product.isHot && <span className="product-card__hot">Hot</span>}
    </div>
    <div className="product-card__info">
      <span className="product-card__brand">{product.brand}</span>
      <h3 className="product-card__name">{product.name}</h3>
      <StarRating rating={product.rating} />
      <div className="product-card__price">
        <span className="price-current">{formatPrice(product.price)}</span>
        {product.discount > 0 && (
          <span className="price-original">{formatPrice(product.originalPrice)}</span>
        )}
      </div>
      <div className="product-card__meta">
        <span>Đã bán {product.sold}</span>
      </div>
    </div>
  </Link>
);

export const HomePage = () => {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [hot, setHot] = useState<Product[]>([]);
  const [flashSale, setFlashSale] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [bannerIdx, setBannerIdx] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [f, h, fs] = await Promise.all([
        mockApi.getFeaturedProducts(),
        mockApi.getHotProducts(),
        mockApi.getFlashSaleProducts(),
      ]);
      setFeatured(f.slice(0, 8));
      setHot(h.slice(0, 8));
      setFlashSale(fs.slice(0, 8));
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIdx((i) => (i + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-page">
      {/* ── Hero Banner ── */}
      <section className="hero-banner">
        <div className="hero-banner__slides">
          {BANNERS.map((b, i) => (
            <div key={i} className={`hero-banner__slide ${i === bannerIdx ? 'active' : ''}`}>
              <img src={b.image} alt={b.title} />
              <div className="hero-banner__overlay">
                <div className="hero-banner__content">
                  <span className="hero-banner__badge">{b.badge}</span>
                  <h1>{b.title}</h1>
                  <p>{b.subtitle}</p>
                  <Link to="/products" className="btn btn-primary btn-lg">Mua ngay</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hero-banner__dots">
          {BANNERS.map((_, i) => (
            <button key={i} className={i === bannerIdx ? 'active' : ''} onClick={() => setBannerIdx(i)} />
          ))}
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="section-categories">
        <h2 className="section-title">Danh mục sản phẩm</h2>
        <div className="categories-grid">
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} to={`/categories/${cat.slug}`} className="category-item">
              <span className="category-item__icon">{cat.icon}</span>
              <span className="category-item__name">{cat.name}</span>
              <span className="category-item__count">{cat.count} sản phẩm</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Flash Sale ── */}
      <section className="section-flash-sale">
        <div className="section-header">
          <div className="section-header__left">
            <h2 className="section-title section-title--accent">Flash Sale</h2>
            <span className="flash-sale__subtitle">Kết thúc sau 12:00:00</span>
          </div>
          <Link to="/products" className="section-link">Xem tất cả →</Link>
        </div>
        <div className="products-scroll">
          {loading ? (
            <div className="loading-grid">
              {[...Array(8)].map((_, i) => <div key={i} className="product-skeleton" />)}
            </div>
          ) : (
            flashSale.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="section-featured">
        <div className="section-header">
          <div className="section-header__left">
            <h2 className="section-title">Sản phẩm nổi bật</h2>
          </div>
          <Link to="/products" className="section-link">Xem tất cả →</Link>
        </div>
        <div className="products-grid">
          {loading ? (
            <div className="loading-grid">
              {[...Array(8)].map((_, i) => <div key={i} className="product-skeleton" />)}
            </div>
          ) : (
            featured.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </div>
      </section>

      {/* ── Banner Promotion ── */}
      <section className="section-banner-promo">
        <div className="promo-banner">
          <img src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=1400" alt="Khuyến mãi" />
          <div className="promo-banner__content">
            <h2>Ưu đãi đặc biệt cuối tuần</h2>
            <p>Giảm đến 50% cho hàng ngàn sản phẩm công nghệ</p>
            <Link to="/products" className="btn btn-accent btn-lg">Khám phá ngay</Link>
          </div>
        </div>
      </section>

      {/* ── Hot Products ── */}
      <section className="section-hot">
        <div className="section-header">
          <div className="section-header__left">
            <h2 className="section-title section-title--red">Sản phẩm bán chạy</h2>
          </div>
          <Link to="/products" className="section-link">Xem tất cả →</Link>
        </div>
        <div className="products-grid">
          {loading ? (
            <div className="loading-grid">
              {[...Array(8)].map((_, i) => <div key={i} className="product-skeleton" />)}
            </div>
          ) : (
            hot.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </div>
      </section>

      {/* ── Brand Logos ── */}
      <section className="section-brands">
        <h2 className="section-title">Thương hiệu nổi bật</h2>
        <div className="brands-grid">
          {['Apple', 'Samsung', 'ASUS', 'MSI', 'Logitech', 'Razer', 'Corsair', 'Dell', 'Xiaomi', 'Google'].map((brand) => (
            <Link key={brand} to={`/brands/${brand.toLowerCase()}`} className="brand-item">
              <span>{brand}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── App Download CTA ── */}
      <section className="section-app-cta">
        <div className="app-cta">
          <div className="app-cta__content">
            <h2>Tải ứng dụng HenzoStore</h2>
            <p>Nhận nhiều ưu đãi hơn khi mua sắm qua app</p>
            <div className="app-cta__buttons">
              <button className="btn btn-dark">App Store</button>
              <button className="btn btn-dark">Google Play</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
