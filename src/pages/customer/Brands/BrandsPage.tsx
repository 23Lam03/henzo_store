import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import './BrandsPage.css';

const BRANDS = [
  {
    slug: 'apple',
    name: 'Apple',
    tagline: 'Think Different',
    count: 156,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    banner: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800',
    color: '#1d1d1f',
  },
  {
    slug: 'samsung',
    name: 'Samsung',
    tagline: 'Do What You Can\'t',
    count: 203,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    banner: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
    color: '#1428A0',
  },
  {
    slug: 'asus',
    name: 'ASUS',
    tagline: 'Inspiring Innovation',
    count: 178,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Asus_logo.svg',
    banner: 'https://images.unsplash.com/photo-1601807091851-58c3b8e5e7e5?w=800',
    color: '#0057B8',
  },
  {
    slug: 'msi',
    name: 'MSI',
    tagline: 'True Gaming',
    count: 94,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/MSI_Logo.svg',
    banner: 'https://images.unsplash.com/photo-1612831819720-28dc9953b6ba?w=800',
    color: '#E3001B',
  },
  {
    slug: 'logitech',
    name: 'Logitech',
    tagline: 'All Ways Connected',
    count: 312,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Logitech_Logo.svg',
    banner: 'https://images.unsplash.com/photo-1563297007-0686b7003af7?w=800',
    color: '#00B8FC',
  },
  {
    slug: 'sony',
    name: 'Sony',
    tagline: 'Be Moved',
    count: 87,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg',
    banner: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    color: '#0066CC',
  },
  {
    slug: 'razer',
    name: 'Razer',
    tagline: 'For Gamers. By Gamers.',
    count: 145,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Razer_logo.svg',
    banner: 'https://images.unsplash.com/photo-1593640408182-31c228a50f4c?w=800',
    color: '#00FF00',
  },
  {
    slug: 'xiaomi',
    name: 'Xiaomi',
    tagline: 'Innovation For Everyone',
    count: 231,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg',
    banner: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800',
    color: '#FF6900',
  },
  {
    slug: 'oppo',
    name: 'OPPO',
    tagline: 'Camera. Revolution',
    count: 98,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/OPPO_LOGO_2019.svg',
    banner: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
    color: '#00A056',
  },
  {
    slug: 'acer',
    name: 'Acer',
    tagline: 'Explore Beyond Limits',
    count: 112,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Acer_Logo.svg',
    banner: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
    color: '#004B8D',
  },
  {
    slug: 'huawei',
    name: 'Huawei',
    tagline: 'Building a Fully Connected World',
    count: 76,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Huawei_Logo.svg',
    banner: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    color: '#CF0A2C',
  },
  {
    slug: 'corsair',
    name: 'Corsair',
    tagline: 'No Compromise',
    count: 89,
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Corsair_Logo_2022.svg',
    banner: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800',
    color: '#FFD200',
  },
];

export const BrandsPage = () => {
  return (
    <div className="brands-page container">
      <div className="page-header">
        <h1 className="page-header__title">Thương hiệu nổi bật</h1>
        <p className="page-header__subtitle">Khám phá sản phẩm từ các thương hiệu công nghệ hàng đầu thế giới</p>
      </div>

      <div className="brands-grid">
        {BRANDS.map(brand => (
          <Link
            key={brand.slug}
            to={`${ROUTES.BRAND_DETAIL.replace(':slug', brand.slug)}`}
            className="brand-card"
          >
            <div className="brand-card__banner" style={{ backgroundImage: `url(${brand.banner})` }}>
              <div className="brand-card__overlay" style={{ '--brand-color': brand.color } as React.CSSProperties} />
              <div className="brand-card__logo-area">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="brand-card__logo"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
            <div className="brand-card__body">
              <h3 className="brand-card__name">{brand.name}</h3>
              <p className="brand-card__tagline">{brand.tagline}</p>
              <span className="brand-card__count">{brand.count} sản phẩm</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
