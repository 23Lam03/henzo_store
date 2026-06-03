import { Outlet, Link } from 'react-router-dom';
import './AuthLayout.css';

const IconLogo = () => (
  <svg width="40" height="40" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="10" fill="url(#logoGradAuth)"/>
    <path d="M10 26L18 10L26 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 20H23" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <defs>
      <linearGradient id="logoGradAuth" x1="0" y1="0" x2="36" y2="36">
        <stop offset="0%" stopColor="#4F46E5"/>
        <stop offset="100%" stopColor="#6366F1"/>
      </linearGradient>
    </defs>
  </svg>
);

export const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__left">
        <div className="auth-layout__brand">
          <Link to="/" className="auth-layout__logo">
            <IconLogo />
            <span className="auth-layout__logo-text">Henzo Store</span>
          </Link>
        </div>
        <div className="auth-layout__content">
          <h1 className="auth-layout__title">Chào mừng bạn quay trở lại</h1>
          <p className="auth-layout__subtitle">
            Đăng nhập để trải nghiệm mua sắm công nghệ hàng đầu với hàng ngàn sản phẩm chính hãng, khuyến mãi hấp dẫn và dịch vụ hậu mãi tận tâm.
          </p>
          <div className="auth-layout__features">
            {[
              { icon: '🛡️', text: '100% sản phẩm chính hãng' },
              { icon: '🚚', text: 'Giao hàng nhanh toàn quốc' },
              { icon: '💰', text: 'Đổi trả trong 30 ngày' },
              { icon: '📞', text: 'Hỗ trợ 24/7' },
            ].map((f, i) => (
              <div key={i} className="auth-layout__feature">
                <span className="auth-layout__feature-icon">{f.icon}</span>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="auth-layout__footer">
          &copy; {new Date().getFullYear()} Henzo Store. Mọi quyền được bảo lưu.
        </p>
      </div>
      <div className="auth-layout__right">
        <div className="auth-layout__form-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
