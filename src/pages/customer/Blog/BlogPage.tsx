import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import './BlogPage.css';

const BLOG_POSTS = [
  {
    id: '1',
    slug: 'top-dien-thoai-2025',
    title: 'Top 10 Điện thoại tốt nhất 2025 nên mua ngay',
    excerpt: 'Danh sách những chiếc smartphone đáng mua nhất năm 2025 với giá từ 10-30 triệu, từ iPhone 16 đến Samsung S25 Ultra.',
    cover: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
    author: 'Minh Trần',
    date: '2025-03-15',
    category: 'Điện thoại',
    views: 12450,
  },
  {
    id: '2',
    slug: 'macbook-air-m3-danh-gia',
    title: 'MacBook Air M3: Đánh giá chi tiết sau 1 tháng sử dụng',
    excerpt: 'MacBook Air M3 có gì mới? Hiệu năng, thời lượng pin, màn hình và trải nghiệm thực tế - tất cả trong bài đánh giá này.',
    cover: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    author: 'Lan Phạm',
    date: '2025-03-10',
    category: 'Laptop',
    views: 8920,
  },
  {
    id: '3',
    slug: 'huong-dan-chon-màn-hình-gaming',
    title: 'Hướng dẫn chọn màn hình gaming phù hợp với nhu cầu',
    excerpt: 'OLED hay Mini LED? 144Hz hay 240Hz? Kích thước nào phù hợp? Bài viết giúp bạn chọn màn hình gaming hoàn hảo.',
    cover: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800',
    author: 'Hoàng Lê',
    date: '2025-03-05',
    category: 'Màn hình',
    views: 6730,
  },
  {
    id: '4',
    slug: 'so-sanh-airpods-pro-2',
    title: 'So sánh AirPods Pro 2 vs Sony WF-1000XM5: Tai nghe nào tốt hơn?',
    excerpt: 'Cuộc đọ sức giữa hai tai nghe ANC hàng đầu: AirPods Pro 2 của Apple và WF-1000XM5 của Sony. Đâu mới là lựa chọn tốt nhất?',
    cover: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    author: 'Thu Hà',
    date: '2025-02-28',
    category: 'Tai nghe',
    views: 9870,
  },
  {
    id: '5',
    slug: 'build-pc-gaming-30-trieu',
    title: 'Build PC Gaming 30 triệu: Cấu hình chơi game 4K mượt mà',
    excerpt: 'Hướng dẫn build PC gaming 30 triệu với RTX 4070, Ryzen 5 7600X, 32GB RAM - cấu hình chơi mượt mọi game AAA ở 4K.',
    cover: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800',
    author: 'Nam Lê',
    date: '2025-02-20',
    category: 'PC Gaming',
    views: 15420,
  },
  {
    id: '6',
    slug: 'ban-phim-co-tot-hon-khong-day',
    title: 'Bàn phím cơ có thực sự tốt hơn bàn phím thường?',
    excerpt: 'Tại sao game thủ và dân văn phòng đều chuyển sang dùng bàn phím cơ? Ưu nhược điểm của từng loại switch trên bàn phím cơ.',
    cover: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800',
    author: 'Minh Trần',
    date: '2025-02-15',
    category: 'Bàn phím',
    views: 5420,
  },
];

const CATEGORIES = ['Tất cả', 'Điện thoại', 'Laptop', 'PC Gaming', 'Màn hình', 'Tai nghe', 'Bàn phím', 'Chuột'];

export const BlogPage = () => {
  return (
    <div className="blog-page container">
      <div className="page-header">
        <h1 className="page-header__title">Blog Công Nghệ</h1>
        <p className="page-header__subtitle">Tin tức, đánh giá và hướng dẫn công nghệ mới nhất</p>
      </div>

      <div className="blog-categories">
        {CATEGORIES.map(cat => (
          <button key={cat} className={`blog-category-btn ${cat === 'Tất cả' ? 'blog-category-btn--active' : ''}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="blog-featured">
        <Link to={`${ROUTES.BLOG_DETAIL.replace(':slug', BLOG_POSTS[0].slug)}`} className="blog-featured-card">
          <div className="blog-featured-card__image" style={{ backgroundImage: `url(${BLOG_POSTS[0].cover})` }} />
          <div className="blog-featured-card__content">
            <span className="blog-featured-card__category">{BLOG_POSTS[0].category}</span>
            <h2 className="blog-featured-card__title">{BLOG_POSTS[0].title}</h2>
            <p className="blog-featured-card__excerpt">{BLOG_POSTS[0].excerpt}</p>
            <div className="blog-featured-card__meta">
              <span>{BLOG_POSTS[0].author}</span>
              <span>•</span>
              <span>{new Date(BLOG_POSTS[0].date).toLocaleDateString('vi-VN')}</span>
              <span>•</span>
              <span>{BLOG_POSTS[0].views.toLocaleString()} lượt xem</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="blog-grid">
        {BLOG_POSTS.slice(1).map(post => (
          <Link
            key={post.id}
            to={`${ROUTES.BLOG_DETAIL.replace(':slug', post.slug)}`}
            className="blog-card card"
          >
            <div className="blog-card__image" style={{ backgroundImage: `url(${post.cover})` }}>
              <span className="blog-card__category">{post.category}</span>
            </div>
            <div className="blog-card__body">
              <h3 className="blog-card__title">{post.title}</h3>
              <p className="blog-card__excerpt">{post.excerpt}</p>
              <div className="blog-card__meta">
                <span>{post.author}</span>
                <span>•</span>
                <span>{new Date(post.date).toLocaleDateString('vi-VN')}</span>
                <span>•</span>
                <span>{post.views.toLocaleString()} lượt xem</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
