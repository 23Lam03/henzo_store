import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import './ShopPage.css';

const SHOPS = [
  {
    slug: 'apple-store-vietnam',
    name: 'Apple Store Vietnam',
    tagline: 'Chuyên iPhone, iPad, MacBook chính hãng',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    banner: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800',
    rating: 4.9,
    reviews: 2341,
    products: 156,
    location: 'TP. Hồ Chí Minh',
    joinedYear: 2015,
    verified: true,
  },
  {
    slug: 'samsung-center-hcm',
    name: 'Samsung Center HCM',
    tagline: 'Điện thoại, TV, thiết bị gia dụng Samsung',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    banner: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
    rating: 4.8,
    reviews: 1876,
    products: 203,
    location: 'TP. Hồ Chí Minh',
    joinedYear: 2016,
    verified: true,
  },
  {
    slug: 'techzone-store',
    name: 'TechZone Store',
    tagline: 'Laptop, PC gaming, linh kiện máy tính',
    avatar: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400',
    banner: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800',
    rating: 4.7,
    reviews: 956,
    products: 312,
    location: 'Hà Nội',
    joinedYear: 2018,
    verified: false,
  },
  {
    slug: 'gaming-gear-vn',
    name: 'Gaming Gear VN',
    tagline: 'Chuột, bàn phím, tai nghe gaming',
    avatar: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    banner: 'https://images.unsplash.com/photo-1593640408182-31c228a50f4c?w=800',
    rating: 4.6,
    reviews: 645,
    products: 189,
    location: 'TP. Hồ Chí Minh',
    joinedYear: 2019,
    verified: false,
  },
  {
    slug: 'camera-pro-shop',
    name: 'Camera Pro Shop',
    tagline: 'Máy ảnh, ống kính, phụ kiện nhiếp ảnh',
    avatar: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
    banner: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
    rating: 4.9,
    reviews: 421,
    products: 87,
    location: 'Hà Nội',
    joinedYear: 2017,
    verified: true,
  },
  {
    slug: 'accessory-world',
    name: 'Accessory World',
    tagline: 'Phụ kiện, case, sạc, cáp chính hãng',
    avatar: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400',
    banner: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800',
    rating: 4.5,
    reviews: 1123,
    products: 445,
    location: 'Đà Nẵng',
    joinedYear: 2020,
    verified: false,
  },
];

export const ShopPage = () => {
  return (
    <div className="shop-page container">
      <div className="page-header">
        <h1 className="page-header__title">Cửa hàng</h1>
        <p className="page-header__subtitle">Khám phá các cửa hàng uy tín trên HenzoStore</p>
      </div>

      <div className="shops-grid">
        {SHOPS.map(shop => (
          <Link
            key={shop.slug}
            to={`${ROUTES.SHOP_DETAIL.replace(':slug', shop.slug)}`}
            className="shop-card"
          >
            <div className="shop-card__banner" style={{ backgroundImage: `url(${shop.banner})` }}>
              <div className="shop-card__overlay" />
              <div className="shop-card__avatar">
                <img src={shop.avatar} alt={shop.name} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              </div>
              {shop.verified && (
                <span className="shop-card__verified">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Đã xác minh
                </span>
              )}
            </div>
            <div className="shop-card__body">
              <div className="shop-card__header">
                <h3 className="shop-card__name">{shop.name}</h3>
                <span className="shop-card__rating">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--color-warning)" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  {shop.rating}
                  <span>({shop.reviews.toLocaleString()})</span>
                </span>
              </div>
              <p className="shop-card__tagline">{shop.tagline}</p>
              <div className="shop-card__meta">
                <span>📦 {shop.products} sản phẩm</span>
                <span>📍 {shop.location}</span>
                <span>📅 Tham gia {shop.joinedYear}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
