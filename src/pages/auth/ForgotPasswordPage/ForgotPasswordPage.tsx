import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import './ForgotPasswordPage.css';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError('Vui lòng nhập email.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Email không hợp lệ.'); return; }
    setLoading(true);
    setError('');
    await new Promise(r => setTimeout(r, 1500));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="forgot-page">
      {sent ? (
        <div className="forgot-page__success">
          <div className="forgot-page__icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h2 className="forgot-page__title">Đã gửi liên kết đặt lại!</h2>
          <p className="forgot-page__text">
            Chúng tôi đã gửi liên kết đặt lại mật khẩu đến <strong>{email}</strong>. Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.
          </p>
          <Link to={ROUTES.LOGIN} className="btn btn-primary btn-full">Quay lại đăng nhập</Link>
        </div>
      ) : (
        <>
          <div className="forgot-page__header">
            <h2 className="forgot-page__title">Quên mật khẩu?</h2>
            <p className="forgot-page__subtitle">
              Nhập email của bạn và chúng tôi sẽ gửi liên kết đặt lại mật khẩu.
            </p>
          </div>

          {error && <div className="login-page__error">{error}</div>}

          <form className="forgot-page__form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Email</label>
              <input
                type="email"
                className={`input ${error ? 'input-error' : ''}`}
                placeholder="Nhập email đã đăng ký"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
              {loading ? <span className="spinner" /> : null}
              {loading ? 'Đang gửi...' : 'Gửi liên kết'}
            </button>
          </form>

          <p className="forgot-page__footer">
            Nhớ mật khẩu rồi? <Link to={ROUTES.LOGIN} className="forgot-page__link">Đăng nhập ngay</Link>
          </p>
        </>
      )}
    </div>
  );
};
