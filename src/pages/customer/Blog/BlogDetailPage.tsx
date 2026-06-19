import { useParams, Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import './BlogDetailPage.css';

const BLOG_POSTS: Record<string, {
  title: string; author: string; date: string; category: string;
  cover: string; content: string; tags: string[]; related: string[];
}> = {
  'top-dien-thoai-2025': {
    title: 'Top 10 Điện thoại tốt nhất 2025 nên mua ngay',
    author: 'Minh Trần', date: '2025-03-15', category: 'Điện thoại',
    cover: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200',
    tags: ['smartphone', 'iPhone', 'Samsung', 'review'],
    related: ['macbook-air-m3-danh-gia', 'so-sanh-airpods-pro-2'],
    content: `Năm 2025 chứng kiến sự cạnh tranh khốc liệt giữa các ông lớn công nghệ. Dưới đây là top 10 smartphone đáng mua nhất.

**1. iPhone 16 Pro Max**
Apple tiếp tục dẫn đầu với chip A19 Pro, màn hình OLED 6.9 inch 120Hz và camera 48MP. Thời lượng pin lên đến 27 giờ sử dụng liên tục.

**2. Samsung Galaxy S25 Ultra**
Camera 200MP, bút S Pen tích hợp và AI Galaxy AI là những điểm nhấn nổi bật. Màn hình Dynamic AMOLED 2X 6.8 inch sáng nhất từ trước đến nay.

**3. Xiaomi 15 Ultra**
Giá cả hợp lý hơn với camera Leica 1 inch, Snapdragon 8 Elite và sạc nhanh 120W.

**4. Google Pixel 10 Pro**
AI Gemini tích hợp sâu, khả năng chụp ảnh computational photography xuất sắc, Android thuần.

**5. OPPO Find X8 Pro**
Thiết kế sang trọng, Hasselblad camera, Dimensity 9400 mạnh mẽ.

Các vị trí còn lại thuộc về Vivo X200 Pro, OnePlus 13, Sony Xperia 1 VI, Honor Magic 7 Pro và ASUS ROG Phone 9.`,
  },
};

const ALL_POSTS = [
  { slug: 'macbook-air-m3-danh-gia', title: 'MacBook Air M3: Đánh giá chi tiết sau 1 tháng sử dụng', cover: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400' },
  { slug: 'so-sanh-airpods-pro-2', title: 'So sánh AirPods Pro 2 vs Sony WF-1000XM5', cover: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
  { slug: 'build-pc-gaming-30-trieu', title: 'Build PC Gaming 30 triệu', cover: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400' },
];

export const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? BLOG_POSTS[slug] : null;

  if (!post) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '80px 0' }}>
        <h2>Bài viết không tồn tại</h2>
        <Link to={ROUTES.BLOGS} className="btn btn-primary" style={{ marginTop: '24px' }}>Quay lại blog</Link>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <div className="blog-detail-hero" style={{ backgroundImage: `url(${post.cover})` }}>
        <div className="blog-detail-hero__overlay" />
        <div className="container blog-detail-hero__content">
          <Link to={ROUTES.BLOGS} className="blog-detail-hero__back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Blog
          </Link>
          <span className="blog-detail-hero__category">{post.category}</span>
          <h1 className="blog-detail-hero__title">{post.title}</h1>
          <div className="blog-detail-hero__meta">
            <span>👤 {post.author}</span>
            <span>📅 {new Date(post.date).toLocaleDateString('vi-VN')}</span>
          </div>
        </div>
      </div>

      <div className="container blog-detail-layout">
        <article className="blog-detail-content">
          <div className="blog-detail-tags">
            {post.tags.map(tag => (
              <span key={tag} className="blog-detail-tag">#{tag}</span>
            ))}
          </div>
          {post.content.split('\n\n').map((para, i) => (
            para.startsWith('**') ? (
              <h2 key={i} className="blog-detail-content__heading">{para.replace(/\*\*/g, '')}</h2>
            ) : para.startsWith('1.') || para.startsWith('2.') || para.startsWith('3.') ? (
              <p key={i} className="blog-detail-content__paragraph" style={{ paddingLeft: '16px', borderLeft: '3px solid var(--color-primary)' }}>{para}</p>
            ) : (
              <p key={i} className="blog-detail-content__paragraph">{para}</p>
            )
          ))}
        </article>

        <aside className="blog-detail-sidebar">
          <div className="card blog-detail-author">
            <h3 className="blog-detail-author__title">Về tác giả</h3>
            <div className="blog-detail-author__info">
              <div className="blog-detail-author__avatar">{post.author[0]}</div>
              <div>
                <p className="blog-detail-author__name">{post.author}</p>
                <p className="blog-detail-author__role">Chuyên gia công nghệ</p>
              </div>
            </div>
          </div>

          <div className="card blog-detail-related">
            <h3 className="blog-detail-related__title">Bài viết liên quan</h3>
            <div className="blog-detail-related__list">
              {ALL_POSTS.filter(p => post.related.includes(p.slug)).map(p => (
                <Link key={p.slug} to={`${ROUTES.BLOG_DETAIL.replace(':slug', p.slug)}`} className="blog-related-item">
                  <div className="blog-related-item__thumb" style={{ backgroundImage: `url(${p.cover})` }} />
                  <span className="blog-related-item__title">{p.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
