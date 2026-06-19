import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { ProductGrid } from '../../../components/product/ProductGrid';
import { mockApi } from '../../../services';
import type { Product } from '../../../types';
import './ShopDetailPage.css';

const SHOP_DATA: Record<string, {
  name: string; tagline: string; avatar: string; banner: string;
  rating: number; reviews: number; products: number; location: string;
  joinedYear: number; verified: boolean; description: string;
  responseRate: number; responseTime: string; followers: number;
}> = {
  'apple-store-vietnam': {
    name: 'Apple Store Vietnam', tagline: 'Chuyên iPhone, iPad, MacBook chính hãng VN/A',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    banner: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200',
    rating: 4.9, reviews: 2341, products: 156, location: 'TP. Hồ Chí Minh',
    joinedYear: 2015, verified: true, responseRate: 98, responseTime: 'Trong vài phút',
    followers: 12450,
    description: 'Apple Store Vietnam là cửa hàng ủy quyền chính thức của Apple tại Việt Nam. Chúng tôi chuyên cung cấp các sản phẩm Apple chính hãng VN/A với chế độ bảo hành đầy đủ và hỗ trợ khách hàng tận tâm.',
  },
};

export const ShopDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'reviews' | 'about'>('products');

  const shop = slug ? SHOP_DATA[slug] : null;

  const loadProducts = () => {
    if (products.length === 0) {
      setLoading(true);
      mockApi.getProducts({ page: 1, pageSize: 8 }).then(result => {
        setProducts(result.products);
        setLoading(false);
      });
    }
  };

  if (!shop) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
        <h2>Cửa hàng không tồn tại</h2>
        <Link to={ROUTES.SHOPS} className="btn btn-primary" style={{ marginTop: '24px' }}>Quay lại cửa hàng</Link>
      </div>
    );
  }

  return (
    <div className="shop-detail-page">
      <div className="shop-detail-hero" style={{ backgroundImage: `url(${shop.banner})` }}>
        <div className="shop-detail-hero__overlay" />
        <div className="container shop-detail-hero__content">
          <div className="shop-detail-hero__avatar">
            <img src={shop.avatar} alt={shop.name} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          </div>
          <div className="shop-detail-hero__info">
            <div className="shop-detail-hero__name-row">
              <h1 className="shop-detail-hero__name">{shop.name}</h1>
              {shop.verified && (
                <span className="shop-detail-hero__verified">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Đã xác minh
                </span>
              )}
            </div>
            <p className="shop-detail-hero__tagline">{shop.tagline}</p>
            <div className="shop-detail-hero__stats">
              <span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-warning)" stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                {shop.rating} ({shop.reviews.toLocaleString()} đánh giá)
              </span>
              <span>📦 {shop.products} sản phẩm</span>
              <span>📍 {shop.location}</span>
              <span>👥 {shop.followers.toLocaleString()} theo dõi</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="shop-detail-tabs">
          {(['products', 'reviews', 'about'] as const).map(tab => (
            <button
              key={tab}
              className={`shop-detail-tab ${activeTab === tab ? 'shop-detail-tab--active' : ''}`}
              onClick={() => { setActiveTab(tab); if (tab === 'products') loadProducts(); }}
            >
              {tab === 'products' ? 'Sản phẩm' : tab === 'reviews' ? 'Đánh giá' : 'Giới thiệu'}
            </button>
          ))}
        </div>

        {activeTab === 'products' && (
          <div className="shop-detail-products">
            <ProductGrid products={products} viewMode="grid" loading={loading} />
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="shop-detail-reviews">
            <div className="shop-reviews-summary card">
              <div className="shop-reviews-summary__score">
                <span className="shop-reviews-summary__score-value">{shop.rating}</span>
                <span className="shop-reviews-summary__score-max">/5</span>
              </div>
              <div className="shop-reviews-summary__info">
                <p className="shop-reviews-summary__count">Dựa trên {shop.reviews.toLocaleString()} đánh giá</p>
                <div className="shop-reviews-summary__bars">
                  {[5, 4, 3, 2, 1].map(star => (
                    <div key={star} className="shop-reviews-summary__bar-row">
                      <span>{star} ★</span>
                      <div className="shop-reviews-summary__bar">
                        <div className="shop-reviews-summary__bar-fill" style={{ width: star === 5 ? '85%' : star === 4 ? '10%' : star === 3 ? '3%' : '1%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="shop-detail-empty">Chưa có đánh giá nào được hiển thị.</p>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="shop-detail-about">
            <div className="card shop-about-card">
              <h3 className="shop-about-card__title">Giới thiệu cửa hàng</h3>
              <p className="shop-about-card__desc">{shop.description}</p>
              <div className="shop-about-card__meta">
                <div className="shop-about-card__meta-item">
                  <span className="shop-about-card__meta-label">Tham gia</span>
                  <span className="shop-about-card__meta-value">{shop.joinedYear}</span>
                </div>
                <div className="shop-about-card__meta-item">
                  <span className="shop-about-card__meta-label">Tỷ lệ phản hồi</span>
                  <span className="shop-about-card__meta-value">{shop.responseRate}%</span>
                </div>
                <div className="shop-about-card__meta-item">
                  <span className="shop-about-card__meta-label">Thời gian phản hồi</span>
                  <span className="shop-about-card__meta-value">{shop.responseTime}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
