import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import './CategoriesPage.css';

const CATEGORIES = [
  {
    slug: 'dien-thoai',
    name: 'Điện thoại',
    count: 245,
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    banner: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
    description: 'iPhone, Samsung, Xiaomi, OPPO...',
  },
  {
    slug: 'laptop',
    name: 'Laptop',
    count: 189,
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
    banner: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
    description: 'MacBook, gaming laptop, ultrabook...',
  },
  {
    slug: 'pc-gaming',
    name: 'PC Gaming',
    count: 76,
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    banner: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800',
    description: 'PC build, case, PSU, cooling...',
  },
  {
    slug: 'man-hinh',
    name: 'Màn hình',
    count: 134,
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    banner: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800',
    description: 'OLED, Gaming 360Hz, 4K, Ultrawide...',
  },
  {
    slug: 'chuot',
    name: 'Chuột',
    count: 98,
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 3v12"/><circle cx="18" cy="9" r="3"/>
        <path d="M6 9a6 6 0 1 0 12 0 6 6 0 0 0-12 0z"/>
      </svg>
    ),
    banner: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800',
    description: 'Gaming mouse, wireless, ergonomic...',
  },
  {
    slug: 'ban-phim',
    name: 'Bàn phím',
    count: 87,
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"/>
      </svg>
    ),
    banner: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800',
    description: 'Mechanical keyboard, wireless, hot-swap...',
  },
  {
    slug: 'tai-nghe',
    name: 'Tai nghe',
    count: 112,
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
      </svg>
    ),
    banner: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    description: 'ANC, gaming headset, TWS, studio...',
  },
  {
    slug: 'camera',
    name: 'Camera',
    count: 65,
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
    banner: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
    description: 'DSLR, mirrorless, webcam, action cam...',
  },
];

export const CategoriesPage = () => {
  return (
    <div className="categories-page container">
      <div className="page-header">
        <h1 className="page-header__title">Danh mục sản phẩm</h1>
        <p className="page-header__subtitle">Khám phá các danh mục công nghệ hàng đầu</p>
      </div>

      <div className="categories-grid">
        {CATEGORIES.map(cat => (
          <Link
            key={cat.slug}
            to={`${ROUTES.CATEGORY_DETAIL.replace(':slug', cat.slug)}`}
            className="category-card"
          >
            <div className="category-card__image" style={{ backgroundImage: `url(${cat.banner})` }}>
              <div className="category-card__overlay">
                <div className="category-card__icon">{cat.icon}</div>
              </div>
            </div>
            <div className="category-card__body">
              <h3 className="category-card__name">{cat.name}</h3>
              <p className="category-card__desc">{cat.description}</p>
              <span className="category-card__count">{cat.count} sản phẩm</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
